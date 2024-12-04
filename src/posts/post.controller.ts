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
import { CreatePostDto } from './dtos/create-post.dto';
import { PostDto } from './dtos/post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@UseGuards(AuthGuard)
@Serialize(PostDto)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  createPost(@Req() req, @Body() body: CreatePostDto) {
    return this.postsService.create(body, req.user);
  }

  @Get('/:id')
  findPost(@Param('id') id: string) {
    return this.postsService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removePost(@Param('id') id: string) {
    return this.postsService.remove(parseInt(id));
  }
}
