import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      relations: { posts: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user.posts;
  }

  async showUserComments(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user.comments;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs);
    return this.repo.save(user);
  }
}
