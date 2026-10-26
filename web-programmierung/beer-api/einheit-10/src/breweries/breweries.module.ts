import { Module } from '@nestjs/common';
import { BreweriesController } from './breweries.controller';
import { BreweriesService } from './breweries.service';

@Module({
  controllers: [BreweriesController],
  providers: [BreweriesService],
  // Andere Module dürfen BreweriesService injizieren
  exports: [BreweriesService],
})
export class BreweriesModule {}
