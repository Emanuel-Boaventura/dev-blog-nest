import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.authService.create(body.name, body.email);
  }

  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.name, body.email);
  }
}
