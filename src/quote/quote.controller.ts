import { Controller, Get } from '@nestjs/common';
import { sleep } from '../common/utils';
import { Auth } from '../decorators/auth.decorator';
import { QuoteService } from './quote.service';

@Controller('quotes')
export class QuoteController {
  constructor(readonly quoteService: QuoteService) {}
  @Auth()
  @Get('/')
  async getRandomAuthor() {
    await sleep(5);
    return this.quoteService.getRandomAuthor();
  }
}
