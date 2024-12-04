import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  @Get('/:id/posts')
  showUserPosts(@Param('id') id: string) {
    return this.usersService.showUserPosts(parseInt(id));
  }

  @Get('/:id/comments')
  showUserComments(@Param('id') id: string) {
    return this.usersService.showUserComments(parseInt(id));
  }

  @Patch('/:id')
  updateUser(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    if (req.user.id !== parseInt(id))
      throw new UnauthorizedException('Usuário não autorizado');

    return this.usersService.update(parseInt(id), body);
  }
}
