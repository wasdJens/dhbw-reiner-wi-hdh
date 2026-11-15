import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NextFunction, Request, Response } from 'express';
import { setTimeout } from 'node:timers/promises';

// Verzögert jede Antwort um ERP_DELAY_MS Millisekunden (Standard 0)
@Injectable()
export class DelayMiddleware implements NestMiddleware {
  private readonly delayMs: number;

  constructor(config: ConfigService) {
    this.delayMs = Number(config.get('ERP_DELAY_MS', '0'));
  }

  async use(req: Request, res: Response, next: NextFunction) {
    await setTimeout(this.delayMs);
    next();
  }
}
