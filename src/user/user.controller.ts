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
import { DatabaseError } from 'src/common/errors/database.errors';
import { SomethingWentWrongError } from 'src/common/errors/something-wrong.error';

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
      const user = await this.userService.create(input);
      return user;
    } catch (e) {
      if (e.code == '23505')
        throw new DatabaseError(`${input.email} is already exist`, e.code);
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
      if (e.message.includes('Wrong')) {
        throw new DatabaseError(`${input.email} is already exist`, '2400');
      }
      throw new SomethingWentWrongError(
        'Something went wrong while authenticate this user',
        '4001',
      );
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
