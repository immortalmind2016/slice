import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { expect } from 'chai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from '../../common/test/mock-classes';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).to.not.undefined;
  });
});
