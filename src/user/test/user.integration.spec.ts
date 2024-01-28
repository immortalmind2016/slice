import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';
import { AppModule } from '../../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { setupDataSource } from '../../common/test/mock-db';

const user = {
  email: 'test4@gmail.com',
  password: '1234567891',
  fullname: '1234',
};

describe('User API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const dataSource = await setupDataSource();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          name: 'default',
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('creates user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send(user)
      .expect(201);
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.have.property('id').that.is.a('number');
  });

  afterEach(async () => {
    await app.close();
  });
});
