import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/comments/dtos/comment.dto';

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image_url: number;

  @Expose()
  user_id: number;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
