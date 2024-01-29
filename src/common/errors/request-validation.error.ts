import { ValidationError } from '@nestjs/common';
import { CustomHttpError } from './custom.error';

export class RequestValidationError extends CustomHttpError {
  statusCode = 400;

  constructor(public errors: ValidationError[] | string[]) {
    super('Invalid request parameters', 400);
  }

  serializeErrors() {
    return {
      error: this.errors.map((error) => ({ message: error as any })),
      internalCode: '3200',
    };
  }
}
