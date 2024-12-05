import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? null : obj.id))
  id: number;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? null : obj.description))
  description: string;

  @Expose()
  post_id: number;

  @Expose()
  @Transform(({ obj }) => (obj.deleted_at ? null : obj.user_id))
  user_id: number;

  @Expose()
  deleted_at: number | null;

  @Expose()
  deleted_by_owner: boolean | null;
}
