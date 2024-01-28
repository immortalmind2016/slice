import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { MockUserRepository } from '../../common/test/mock-classes';

const user = {
  email: 'test@gmail.com',
  password: '1234567891',
  fullname: '1234',
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).to.not.undefined;
  });
  it('tests create user', async () => {
    const sandbox = sinon.createSandbox();
    sandbox
      .stub(MockUserRepository.prototype, 'create')
      .returns({ id: 1, ...user });

    sandbox
      .stub(MockUserRepository.prototype, 'save')
      .returns(Promise.resolve({ id: 1, ...user }));

    const result = await controller.create(user);

    expect(result).to.be.deep.equal({ id: 1, ...user });
  });

  it('login user', async () => {
    const sandbox = sinon.createSandbox();

    sandbox
      .stub(MockUserRepository.prototype, 'findOne')
      .returns(Promise.resolve({ id: 1, ...user }));

    const result = await controller.create(user);

    expect(result).to.be.deep.equal({ id: 1, ...user });
  });
});
