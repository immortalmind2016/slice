import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  sleep = (seconds: number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('done');
      }, seconds * 1000);
    });
}
