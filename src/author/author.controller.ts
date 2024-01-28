import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { sleep } from '../common/utils';

@Controller('authors')
export class AuthorController {
  constructor(readonly authService: AuthorService) {}
  @Get('/')
  async getRandomAuthor() {
    await sleep(5);
    return this.authService.getRandomAuthor();
  }
}
