import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { AuthorController } from '../author.controller';
import { expect } from 'chai';

describe('AppController', () => {
  let authorController: AuthorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: {
            getRandomAuthor: () => ({ id: 1 }),
          },
        },
      ],
    }).compile();

    authorController = app.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(authorController).to.not.undefined;
  });
  it('get random author', async () => {
    const author = await authorController.getRandomAuthor();

    expect(author).to.not.undefined;
  });
});
