import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
  ) {}
  async getRandomAuthor() {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .orderBy('RANDOM()')
      .getOne();
  }
}
