import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { ErrorSchema } from './error.dto';

// Sendet jeden Fehler als { fehler, code }
@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    // Exceptions des ERP tragen fehler und code schon im Body
    const body = ErrorSchema.safeParse(exception.getResponse());
    response
      .status(status)
      .json(
        body.success
          ? body.data
          : { fehler: exception.message, code: `HTTP_${status}` },
      );
  }
}
