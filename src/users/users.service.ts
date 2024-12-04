import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: { posts: true },
    });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs);
    return this.repo.save(user);
  }
}
