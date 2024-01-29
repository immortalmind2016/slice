import { Controller, Get, Query } from '@nestjs/common';
import { sleep } from '../common/utils';
import { Auth } from '../decorators/auth.decorator';
import { QuoteService } from './quote.service';
import { RequestValidationError } from 'src/common/errors/request-validation.error';

@Controller('quotes')
export class QuoteController {
  constructor(readonly quoteService: QuoteService) {}
  @Auth()
  @Get('/')
  async getRandomQuote(@Query('authorId') authorId: number) {
    if (!authorId) {
      throw new RequestValidationError(['authorId is required']);
    }
    await sleep(5);
    return this.quoteService.getRandomQuote(authorId);
  }
}
