import { Module } from '@nestjs/common';
import { BeersModule } from '../beers/beers.module';
import { ErpClient } from './erp.client';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  // Bestand braucht Biere, Biere brauchen keinen Bestand
  imports: [BeersModule],
  controllers: [StockController],
  providers: [StockService, ErpClient],
})
export class StockModule {}
