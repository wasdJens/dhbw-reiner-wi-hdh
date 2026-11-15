import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DelayMiddleware } from '../delay.middleware';
import { BreweriesController } from './breweries.controller';
import { BreweriesService } from './breweries.service';

@Module({
  controllers: [BreweriesController],
  providers: [BreweriesService],
  // ArticlesService prüft den Filter brauerei_nr
  exports: [BreweriesService],
})
export class BreweriesModule implements NestModule {
  // ERP_DELAY_MS gilt für alle Endpunkte dieses Module, auch für Fehler
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes(BreweriesController);
  }
}
