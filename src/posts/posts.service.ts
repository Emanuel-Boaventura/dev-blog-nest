import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  findAll() {
    return this.repo.find();
  }

  create(post: Partial<Post>, user: User) {
    const newPost = this.repo.create({
      ...post,
      user_id: user.id,
    });

    return this.repo.save(newPost);
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!post) throw new NotFoundException('Post não encontrado');

    return post;
  }

  async update(id: number, attrs: Partial<Post>) {
    const newPost = await this.findOne(id);

    if (!newPost)
      throw new NotFoundException('Não foi possível atualizar o post.');

    Object.assign(newPost, attrs);
    return this.repo.save(newPost);
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    if (!post) throw new NotFoundException('Não foi possível excluir o post.');

    return this.repo.remove(post);
  }
}
