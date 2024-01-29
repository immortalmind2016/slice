import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { expect } from 'chai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockAuthorRepository } from '../../common/test/mock-classes';
import { Author } from '../entities/author.entity';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ConfigService,
        {
          provide: getRepositoryToken(Author),
          useClass: MockAuthorRepository,
        },
        AuthorService,
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).to.not.undefined;
  });
});
