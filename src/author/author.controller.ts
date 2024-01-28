import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { UtilsService } from '@app/utils';

@Controller('authors')
export class AuthorController {
  constructor(
    readonly authService: AuthorService,
    readonly utilsService: UtilsService,
  ) {}
  @Get('/')
  async getRandomAuthor() {
    await this.utilsService.sleep(5);
    return this.authService.getRandomAuthor();
  }
}
