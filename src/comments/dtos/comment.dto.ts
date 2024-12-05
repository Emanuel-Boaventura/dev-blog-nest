import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class CommentDto {
  @Expose()
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
  @Transform(({ obj }) => (obj.deleted_at ? null : obj.user))
  @Type(() => UserDto)
  user: UserDto[];

  @Expose()
  created_at: Date;

  @Expose()
  deleted_by_owner: boolean | null;

  @Expose()
  deleted_at: number | null;
}
