import { AppModule } from '../../app.module';
import { setupDataSource } from './mock-db';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../../filters/exception.filter';
import * as session from 'express-session';

export const signin = async (request) => {
  const user = {
    email: 'test4@gmail.com',
    password: '1234567891',
    fullname: '1234',
  };

  const response = await request.post('/users/register').send(user).expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};

export const getTestApp = async () => {
  const dataSource = await setupDataSource();
  const module = await Test.createTestingModule({
    imports: [
      AppModule,
      TypeOrmModule.forRoot({
        name: 'default',
      }),
    ],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();
  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  return {
    app,
    module,
  };
};
