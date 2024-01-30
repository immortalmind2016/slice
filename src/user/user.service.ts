import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(input.password, salt);

    const user = await this.userRepository.create({
      ...input,
      password: hash,
    });
    return this.userRepository.save(user);
  }

  async login(input: LoginUserDto) {
    const { email, password } = input;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Wrong credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Wrong credentials');
    }

    return user;
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
