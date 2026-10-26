import { BadRequestException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, createZodValidationPipe } from 'nestjs-zod';
import type { ZodError } from 'zod';
import { AppController } from './app.controller';
import { BreweriesController } from './breweries/breweries.controller';
import { BeersController } from './beers/beers.controller';
import { BreweriesService } from './breweries/breweries.service';
import { BeersService } from './beers/beers.service';

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
  imports: [],
  controllers: [AppController, BreweriesController, BeersController],
  providers: [
    // Prüft Body, Query und Pfadparameter gegen die Zod-Schemas der DTOs
    { provide: APP_PIPE, useClass: ValidationPipe },
    // Prüft Antworten gegen Zod-Schemas, wenn ein Endpunkt eines angibt
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    BreweriesService,
    BeersService,
  ],
})
export class AppModule {}
