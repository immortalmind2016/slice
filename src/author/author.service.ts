import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authRepository: Repository<Author>,
  ) {}
  async getRandomAuthor() {
    return this.authRepository
      .createQueryBuilder('author')
      .orderBy('RANDOM()')
      .getOne();
  }
}
