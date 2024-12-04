import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CommentDto } from './dtos/post.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@UseGuards(AuthGuard)
@Serialize(CommentDto)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Post()
  createComment(@Body() body: CreateCommentDto) {
    return this.commentsService.create(body);
  }

  @Get('/:id')
  findComment(@Param('id') id: string) {
    return this.commentsService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateComment(@Param('id') id: string, @Body() body: UpdateCommentDto) {
    return this.commentsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeComment(@Param('id') id: string) {
    return this.commentsService.remove(parseInt(id));
  }
}
