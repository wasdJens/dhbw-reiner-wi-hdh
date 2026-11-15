import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

// Name des Security Scheme in der OpenAPI-Beschreibung
export const API_KEY_SCHEME = 'api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: string;

  constructor(config: ConfigService) {
    // Ohne ERP_API_KEY in .env startet der Server nicht
    this.apiKey = config.getOrThrow<string>('ERP_API_KEY');
  }

  // Läuft vor jedem Controller; eine Exception beendet die Anfrage
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (request.headers['x-api-key'] !== this.apiKey) {
      throw new UnauthorizedException({
        fehler: 'API-Key fehlt oder ist ungültig',
        code: 'AUTH_401',
      });
    }
    return true;
  }
}
