import { Module } from '@nestjs/common';

import { QuoteModule } from './quote/quote.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [QuoteModule, UserModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
