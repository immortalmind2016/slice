import { CustomHttpError } from './custom.error';

export class SomethingWentWrongError extends CustomHttpError {
  constructor(public message: string, public internalCode: string) {
    super(message, 400);
  }
  serializeErrors() {
    return {
      error: [{ message: this.message }],
      internalCode: this.internalCode,
    };
  }
}
