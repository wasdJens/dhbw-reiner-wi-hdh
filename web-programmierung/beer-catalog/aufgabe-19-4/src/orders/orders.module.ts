import { Module } from '@nestjs/common';
import { BeersModule } from '../beers/beers.module';
import { ErpModule } from '../erp/erp.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  // Die Regel fragt den Bestand über ErpClient und sucht das Bier
  imports: [ErpModule, BeersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
