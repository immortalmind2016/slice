import { Module } from '@nestjs/common';

import { QuoteModule } from './quote/quote.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Author } from './author/author.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    QuoteModule,
    UserModule,
    AuthorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Author],
        synchronize: true,
      }),
    }),
  ],

  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
