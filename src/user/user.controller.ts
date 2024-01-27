import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}
  @Post('')
  async create(@Body() input: CreateUserDto) {
    try {
      const user = await this.userService.create(input);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  @Post('/login')
  async login(
    @Body() input: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    try {
      const user = await this.userService.login(input);
      session.user = user;
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/')
  async me(@Session() session: Record<string, any>) {
    return this.userService.findById(session.user?.id);
  }
}
