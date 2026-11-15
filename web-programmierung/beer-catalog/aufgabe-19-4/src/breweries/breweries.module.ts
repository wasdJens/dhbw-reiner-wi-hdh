import { Module } from '@nestjs/common';
import { ErpModule } from '../erp/erp.module';
import { BreweriesController } from './breweries.controller';
import { BreweriesService } from './breweries.service';

@Module({
  // Der Import liest die Brauereien über ErpClient
  imports: [ErpModule],
  controllers: [BreweriesController],
  providers: [BreweriesService],
  // Der Import der Biere sucht die Brauerei mit findByErpNumber
  exports: [BreweriesService],
})
export class BreweriesModule {}
