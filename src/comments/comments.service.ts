import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async update(id: number, attrs: Partial<CommentDto>, user: User) {
    const comment = await this.findOne(id);

    if (user.id !== comment.user_id)
      throw new UnauthorizedException('Usuário não autorizado');

    Object.assign(comment, attrs);
    return this.repo.save(comment);
  }

  async remove(id: number, user: User) {
    const comment = await this.repo.findOne({
      where: { id },
      relations: { post: true },
    });

    const isPostOwner = user.id === comment.post.user_id;
    const isCommentOwner = user.id === comment.user_id;

    if (!isPostOwner && !isCommentOwner)
      throw new UnauthorizedException('Usuário não autorizado');

    return this.repo.remove(comment);
  }
}
