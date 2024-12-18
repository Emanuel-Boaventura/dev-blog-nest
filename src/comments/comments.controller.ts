import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { ApiRequest } from 'src/utils/types';
import { CommentsService } from './comments.service';
import { CommentDto } from './dtos/comment.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@UseGuards(AuthGuard)
@Serialize(CommentDto)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/post/:id')
  findAllPostComments(@Param('id') id: string) {
    return this.commentsService.findAllPostComments(parseInt(id));
  }

  @Post('/:id')
  createComment(
    @Param('id') id: string,
    @Req() req: ApiRequest,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.create(parseInt(id), body, req.user);
  }

  @Get('/:id')
  findComment(@Param('id') id: string) {
    return this.commentsService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateComment(
    @Req() req: ApiRequest,
    @Param('id') id: string,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentsService.update(parseInt(id), body, req.user);
  }

  @Delete('/:id')
  removeComment(@Req() req: ApiRequest, @Param('id') id: string) {
    return this.commentsService.remove(parseInt(id), req.user);
  }
}
