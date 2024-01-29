import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockAuthorRepository } from '../../common/test/mock-classes';
import { Quote } from '../entities/quote.entity';
import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ConfigService,
        {
          provide: getRepositoryToken(Quote),
          useClass: MockAuthorRepository,
        },
        QuoteService,
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).to.not.undefined;
  });
});
