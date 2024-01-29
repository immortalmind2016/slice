import { HttpException } from '@nestjs/common';

export abstract class CustomHttpError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }

  abstract serializeErrors(): {
    error: {
      message: string;
      field?: string;
    }[];
    internalCode: string;
  };
}
