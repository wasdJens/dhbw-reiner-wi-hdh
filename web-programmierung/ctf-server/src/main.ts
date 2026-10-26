import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // JSON und JSON Merge Patch (RFC 7396, für PATCH) lesen
  app.useBodyParser('json', {
    type: ['application/json', 'application/merge-patch+json'],
  });
  // Keine automatischen ETags: Level 8 und 9 setzen ihr ETag selbst
  app.set('etag', false);
  // Kein Header X-Powered-By, der Server bleibt eine Blackbox
  app.disable('x-powered-by');

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
