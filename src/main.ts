import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/exception.filter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeormStore } from 'connect-typeorm';
import { Session as SessionEntity } from './user/entities/session.entitiy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Slice app')
    .setDescription('The Slice App API description')
    .setVersion('1.0')
    .addTag('slice app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const sessionRepository = app.get(getRepositoryToken(SessionEntity));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400,
      }).connect(sessionRepository as any),
      saveUninitialized: false,
      ...(process.env.NODE_ENV == 'production' && {
        cookie: {
          secure: true,
        },
      }),
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
