import { Module } from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
