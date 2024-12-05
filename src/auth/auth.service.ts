import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string) {
    const user = this.repo.create({ name, email });

    return this.repo.save(user);
  }

  async signIn(name: string, email: string) {
    const user = await this.repo.findOne({ where: { email, name } });

    if (!user)
      throw new NotFoundException(
        'Não foi encontrado um usuário com essas credenciais.',
      );

    return user;
  }

  validateToken(token: string) {
    const id = token.split('-')[0];

    return this.repo.findOne({ where: { id: parseInt(id) } });
  }
}
