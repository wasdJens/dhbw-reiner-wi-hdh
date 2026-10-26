import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { BreweriesController } from './breweries/breweries.controller';
import { BeersController } from './beers/beers.controller';

@Module({
  imports: [],
  controllers: [AppController, BreweriesController, BeersController],
  providers: [
    // Prüft Body, Query und Pfadparameter gegen die Zod-Schemas der DTOs
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    // Prüft Antworten gegen Zod-Schemas, wenn ein Endpunkt eines angibt
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
