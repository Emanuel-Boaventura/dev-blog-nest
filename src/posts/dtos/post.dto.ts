import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/comments/dtos/comment.dto';
import { UserDto } from 'src/users/dtos/user.dto';

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
  created_at: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto[];

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
