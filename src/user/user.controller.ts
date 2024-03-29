import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
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
import { DatabaseError } from '../common/errors/database.errors';
import { SomethingWentWrongError } from '../common/errors/something-wrong.error';
import { Auth } from '../decorators/auth.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    readonly userService: UserService,
    readonly configService: ConfigService,
  ) {}
  @Post('register')
  async create(
    @Body() input: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    try {
      const user = await this.userService.create(input);
      session.token = jwt.sign({ user }, this.configService.get('JWT_SECRET'));
      return user;
    } catch (e) {
      if (e.code == '23505') {
        throw new DatabaseError(`${input.email} is already exist`, e.code);
      }
      this.logger.error(
        `Something went wrong while creating this user ${e.message}`,
      );
      throw new SomethingWentWrongError(
        'Something went wrong while creating this user',
        '4002',
      );
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
        throw new DatabaseError(`${e.message}`, '2400');
      }
      this.logger.error(
        `Something went wrong while authenticating this user ${e.message}`,
      );
      throw new SomethingWentWrongError(
        'Something went wrong while authenticating this user',
        '4001',
      );
    }
  }

  @Auth()
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
    await session.destroy();
    return { data: { message: 'session destroyed' } };
  }
}
