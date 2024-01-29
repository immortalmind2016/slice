import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';
import { UserService } from '../user.service';
import { getTestApp, signin } from '../../common/test/setup';

const user = {
  email: 'test4@gmail.com',
  password: '1234567891',
  fullname: '1234',
};

describe('User API', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeEach(async () => {
    const result = await getTestApp();
    app = result.app;
    module = result.module;
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

  it('should fail create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({})
      .expect(400);
    expect(response.body.success).to.be.false;
    expect(response.body.error).to.be.not.undefined;
  });

  it('should fail login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user)
      .expect(400);
    expect(response.body.success).to.be.false;
    expect(response.body.error).to.be.not.undefined;
  });

  it('login user', async () => {
    const service = module.get<UserService>(UserService);

    await service.create(user);

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user)
      .expect(201);
    expect(response.body.success).to.be.true;
    expect(response.body.data.id).to.be.a('number');
  });

  it('gets my profile data', async () => {
    const cookie = await signin(request(app.getHttpServer()));
    const response = await request(app.getHttpServer())
      .get('/users/profile')
      .set('Cookie', cookie)
      .expect(200);
    expect(response.body.success).to.be.true;
    expect(response.body.data.id).to.be.a('number');
  });

  afterEach(async () => {
    await app.close();
  });
});
