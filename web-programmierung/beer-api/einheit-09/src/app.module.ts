import { BadRequestException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, createZodValidationPipe } from 'nestjs-zod';
import type { ZodError } from 'zod';
import { AppController } from './app.controller';
import { BreweriesModule } from './breweries/breweries.module';
import { BeersModule } from './beers/beers.module';

// Validierungsfehler im Format aller anderen Fehler
const ValidationPipe = createZodValidationPipe({
  createValidationException: (error) =>
    new BadRequestException(
      (error as ZodError).issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`,
      ),
    ),
});

@Module({
  imports: [BreweriesModule, BeersModule],
  controllers: [AppController],
  providers: [
    // Prüft Body, Query und Pfadparameter gegen die Zod-Schemas der DTOs
    { provide: APP_PIPE, useClass: ValidationPipe },
    // Prüft Antworten gegen Zod-Schemas, wenn ein Endpunkt eines angibt
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
