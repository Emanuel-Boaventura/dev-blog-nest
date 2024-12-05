import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/comments/dtos/comment.dto';
import { PostDto } from 'src/posts/dtos/post.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => PostDto)
  posts: PostDto[];

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];

  @Expose()
  created_at: Date;
}
