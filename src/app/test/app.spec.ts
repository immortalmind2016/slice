import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';

import { getTestApp } from '../../common/test/setup';

describe('App API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const result = await getTestApp();
    app = result.app;
    await app.init();
  });

  it('gets public info', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);
    console.log('🚀 ~ it ~ response:', response.body);
    expect(response.body.data.info).to.be.equal(
      'Some information about the <b>company</b>.',
    );
    expect(response.body.success).to.be.true;
  });

  afterEach(async () => {
    await app.close();
  });
});
