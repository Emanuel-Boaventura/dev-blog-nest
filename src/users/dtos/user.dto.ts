import { Expose, Type } from 'class-transformer';
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
}
