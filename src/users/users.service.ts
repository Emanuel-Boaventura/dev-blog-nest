import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async showUserPosts(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: { posts: { comments: true } },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const posts = user.posts.map(({ comments, ...post }) => ({
      ...post,
      comments_quantity: comments.length,
    }));

    return posts;
  }

  async showUserComments(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user.comments;
  }

  async update(id: number, attrs: Partial<UpdateUserDto>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs);

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
}
