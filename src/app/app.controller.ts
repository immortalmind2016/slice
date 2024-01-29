import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  async publicInfo() {
    return {
      info: 'Some information about the <b>company</b>.',
    };
  }
}
