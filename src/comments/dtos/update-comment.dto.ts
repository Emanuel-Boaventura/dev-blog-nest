import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  description: string;
}
