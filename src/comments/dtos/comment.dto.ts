import { Expose } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  post_id: number;

  @Expose()
  user_id: number;
}
