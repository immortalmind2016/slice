import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), UtilsModule],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
