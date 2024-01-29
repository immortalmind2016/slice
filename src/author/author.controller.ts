import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { sleep } from '../common/utils';
import { Auth } from '../decorators/auth.decorator';

@Controller('authors')
export class AuthorController {
  constructor(readonly authService: AuthorService) {}
  @Auth()
  @Get('/')
  async getRandomAuthor() {
    console.log('REANNNDOM');
    await sleep(5);
    const data = await this.authService.getRandomAuthor();
    console.log('return', data);
    return this.authService.getRandomAuthor();
  }
}
