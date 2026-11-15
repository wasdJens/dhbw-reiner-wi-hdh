import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { AbteilungenController } from './abteilungen/abteilungen.controller';
import { AbteilungenModule } from './abteilungen/abteilungen.module';
import { ArtikelController } from './artikel/artikel.controller';
import { ArtikelModule } from './artikel/artikel.module';
import { ApiKeyGuard } from './auth/api-key.guard';
import { DatenModule } from './daten/daten.module';
import { DelayMiddleware } from './delay.middleware';
import { ErrorFilter } from './error.filter';
import { FeiertageController } from './feiertage/feiertage.controller';
import { FeiertageModule } from './feiertage/feiertage.module';
import { InventarController } from './inventar/inventar.controller';
import { InventarModule } from './inventar/inventar.module';
import { PersonenController } from './personen/personen.controller';
import { PersonenModule } from './personen/personen.module';
import { RaeumeController } from './raeume/raeume.controller';
import { RaeumeModule } from './raeume/raeume.module';
import { StandorteController } from './standorte/standorte.controller';
import { StandorteModule } from './standorte/standorte.module';
import { SystemController } from './system/system.controller';
import { SystemModule } from './system/system.module';
import { ValidationPipe } from './validation.pipe';

@Module({
  imports: [
    // Liest .env; ConfigService in jedem Module, ohne Import
    ConfigModule.forRoot({ isGlobal: true }),
    DatenModule,
    PersonenModule,
    AbteilungenModule,
    StandorteModule,
    RaeumeModule,
    InventarModule,
    ArtikelModule,
    FeiertageModule,
    SystemModule,
  ],
  providers: [
    // Prüft den API-Key vor jedem Controller; Swagger UI ist kein Controller
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    // Fehler im Format { fehler, code }
    { provide: APP_FILTER, useClass: ErrorFilter },
    // Prüft Query-Parameter und Body gegen die Zod-DTOs; Fehler mit code ANFRAGE_400
    { provide: APP_PIPE, useClass: ValidationPipe },
    // Prüft Antworten gegen die Zod-Schemas der Endpunkte
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule implements NestModule {
  // STAMMDATEN_DELAY_MS gilt für alle Endpunkte, auch für Fehler; nicht für Swagger UI
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DelayMiddleware)
      .forRoutes(
        PersonenController,
        AbteilungenController,
        StandorteController,
        RaeumeController,
        InventarController,
        ArtikelController,
        FeiertageController,
        SystemController,
      );
  }
}
