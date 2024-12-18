import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiRequest } from 'src/utils/types';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.create(body.name, body.email);
  }

  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.name, body.email);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfileData(@Req() req: ApiRequest) {
    return req.user;
  }
}
