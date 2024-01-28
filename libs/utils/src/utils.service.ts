import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  sleep = (seconds: number) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, seconds * 1000);
    });
}
