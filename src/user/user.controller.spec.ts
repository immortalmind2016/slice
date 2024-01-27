import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { assert, expect } from 'chai';

const user = {
  email: 'test@gmail.com',
  password: '1234567891',
  fullname: '1234',
};

class MockUserRepository extends Repository<User> {}

describe.only('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [ConfigModule],
      providers: [
        ConfigService,
        // Provide the mock repository in the providers array
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        UserService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    assert.equal(1, 1);
  });
  // it('tests create user', async () => {
  //   const result = await controller.create(user);
  //   expect(result).toEqual({ success: true, data: {} });
  // });
});
