import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BreweriesModule } from '../breweries/breweries.module';
import { DelayMiddleware } from '../delay.middleware';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { StockV1Controller } from './stock-v1.controller';
import { StockV2Controller } from './stock-v2.controller';

@Module({
  imports: [BreweriesModule],
  controllers: [ArticlesController, StockV1Controller, StockV2Controller],
  providers: [ArticlesService],
})
export class ArticlesModule implements NestModule {
  // ERP_DELAY_MS gilt für alle Endpunkte dieses Module, auch für Fehler
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DelayMiddleware)
      .forRoutes(ArticlesController, StockV1Controller, StockV2Controller);
  }
}
