import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  findAllPostComments(postId: number) {
    return this.repo.find({
      where: { post_id: postId },
      relations: { user: true },
      withDeleted: true,
    });
  }

  create(postId: number, comment: CreateCommentDto, user: User) {
    const newComment = this.repo.create({
      ...comment,
      post_id: postId,
      user_id: user.id,
    });

    return this.repo.save(newComment);
  }

  async findOne(id: number) {
    const comment = await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!comment) throw new NotFoundException('Comentário não encontrado');

    return comment;
  }

  async update(id: number, attrs: Partial<UpdateCommentDto>, user: User) {
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

    if (!comment) throw new NotFoundException('Comentário não encontrado');

    const isPostOwner = user.id === comment.post.user_id;
    const isCommentOwner = user.id === comment.user_id;

    if (!isPostOwner && !isCommentOwner)
      throw new UnauthorizedException('Usuário não autorizado');

    comment.deleted_by_owner = isCommentOwner;
    await this.repo.save(comment);

    return this.repo.softDelete({ id: comment.id });
  }
}
