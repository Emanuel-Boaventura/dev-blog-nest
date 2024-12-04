import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  findAll() {
    return this.repo.find();
  }

  create(postId: number, comment: Partial<CommentDto>, user: User) {
    const newComment = this.repo.create({
      ...comment,
      post_id: postId,
      user_id: user.id,
    });

    return this.repo.save(newComment);
  }

  async findOne(id: number) {
    const comment = await this.repo.findOneBy({ id });

    if (!comment) throw new NotFoundException('Comentário não encontrado');

    return comment;
  }

  async update(id: number, attrs: Partial<CommentDto>) {
    const newComment = await this.findOne(id);

    if (!newComment)
      throw new NotFoundException('Não foi possível atualizar o comentário.');

    Object.assign(newComment, attrs);
    return this.repo.save(newComment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);

    if (!comment)
      throw new NotFoundException('Não foi possível excluir o comentário.');

    return this.repo.remove(comment);
  }
}
