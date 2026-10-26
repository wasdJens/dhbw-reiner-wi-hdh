import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthRequest } from './auth.guard';
import { Roles } from './roles.decorator';

// Läuft nach dem AuthGuard: request.user ist gesetzt
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Rollen aus @Roles; ohne Decorator ist alles erlaubt
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthRequest>();
    // false: NestJS antwortet mit 403
    return roles.some((role) => request.user.roles.includes(role));
  }
}
