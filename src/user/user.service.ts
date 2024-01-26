import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(input.password, salt);

    return this.userRepository.insert({
      ...input,
      password: hash,
    });
  }
}
