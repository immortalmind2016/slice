import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpError } from '../common/errors/custom.error';
import { RequestValidationError } from '../common/errors/request-validation.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //handle class-validator errors
    if (typeof exception.response.message == 'object') {
      const requestValidation = new RequestValidationError(
        exception.response.message,
      );
      exception = requestValidation;
    }

    if (exception instanceof CustomHttpError) {
      const formattedError = exception.serializeErrors();
      return response.status(exception.getStatus()).json(formattedError);
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      internalCode: status,
      error: [{ message: exception.message || 'Internal Server Error' }],
    });
  }
}
