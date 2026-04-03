import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessKey = 'ABC123';

    const request = context.switchToHttp().getRequest<Request>();
    const providedKey = request.headers['x-access-key'];

    if (!providedKey) {
      throw new UnauthorizedException('Access Key is missing');
    }

    if (providedKey !== accessKey) {
      throw new ForbiddenException('Invalid Access Key');
    } else {
      return true;
    }
  }
}
