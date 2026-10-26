import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

// Inhalt des Tokens: sub ist die id des Users
export type JwtPayload = { sub: number; name: string };

// Anfrage nach dem Guard: request.user enthält den Payload
export type AuthRequest = Request & { user: JwtPayload };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // Läuft vor dem Controller; eine Exception beendet die Anfrage
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    // Header "Authorization: Bearer <token>"
    const header = request.headers.authorization ?? '';
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }
    try {
      // Prüft Signatur und Ablauf (exp)
      request.user = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
