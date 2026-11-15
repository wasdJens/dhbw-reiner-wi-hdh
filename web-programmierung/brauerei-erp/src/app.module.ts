import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { ArticlesModule } from './articles/articles.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { BreweriesModule } from './breweries/breweries.module';
import { ErrorFilter } from './error.filter';
import { ValidationPipe } from './validation.pipe';

@Module({
  imports: [
    // Liest .env; ConfigService in jedem Module, ohne Import
    ConfigModule.forRoot({ isGlobal: true }),
    ArticlesModule,
    BreweriesModule,
  ],
  providers: [
    // Prüft den API-Key vor jedem Controller; Swagger UI ist kein Controller
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    // Fehler im Format des ERP: { fehler, code }
    { provide: APP_FILTER, useClass: ErrorFilter },
    // Prüft Query-Parameter gegen die Zod-DTOs; Fehler mit code ANFRAGE_400
    { provide: APP_PIPE, useClass: ValidationPipe },
    // Prüft Antworten gegen die Zod-Schemas der Endpunkte
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
