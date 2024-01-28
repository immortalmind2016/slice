import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
  constructor(readonly authService: AuthorService) {}
  @Get('/')
  getRandomAuthor() {
    return this.authService.getRandomAuthor();
  }
}
