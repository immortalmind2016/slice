import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { expect } from 'chai';

describe('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).to.not.undefined;
  });
});
