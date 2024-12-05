import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(name: string, email: string) {
    const user = this.repo.create({ name, email });

    try {
      return await this.repo.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UNIQUE constraint failed')
      ) {
        throw new ConflictException('Email já cadastrado');
      }
      throw error;
    }
  }

  async signIn(name: string, email: string) {
    const user = await this.repo.findOne({ where: { email, name } });

    if (!user)
      throw new NotFoundException(
        'Não foi encontrado um usuário com essas credenciais.',
      );

    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }

  validateToken(token: string) {
    const id = token.split('-')[0];

    return this.repo.findOne({ where: { id: parseInt(id) } });
  }
}
