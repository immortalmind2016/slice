import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    readonly userService: UserService,
    readonly configService: ConfigService,
  ) {}
  @Post('register')
  async create(@Body() input: CreateUserDto) {
    try {
      await this.userService.create(input);
      return {};
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
      session.token = jwt.sign({ user }, this.configService.get('JWT_SECRET'));
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async me(@Session() session: Record<string, any>) {
    const payload: any = jwt.verify(
      session.token,
      this.configService.get('JWT_SECRET'),
    );
    return this.userService.findById(payload.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/logout')
  async logout(@Session() session: Record<string, any>) {
    delete session.token;
    return {};
  }
}
