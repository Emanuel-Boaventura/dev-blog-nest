import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
