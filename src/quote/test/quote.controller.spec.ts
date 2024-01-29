import { Test, TestingModule } from '@nestjs/testing';

import { expect } from 'chai';
import { QuoteController } from '../quote.controller';
import { QuoteService } from '../quote.service';

describe('QuoteController', () => {
  let quoteController: QuoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: {
            getRandomAuthor: () => ({ id: 1 }),
          },
        },
      ],
    }).compile();

    quoteController = app.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(quoteController).to.not.undefined;
  });
  it('get random quote', async () => {
    const quote = await quoteController.getRandomAuthor();

    expect(quote).to.not.undefined;
  });
});
