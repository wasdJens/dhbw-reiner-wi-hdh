import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreweriesController } from './breweries.controller';
import { BreweriesService } from './breweries.service';
import { Brewery } from './brewery.entity';

@Module({
  // Stellt das Repository für Brewery zur Injektion bereit
  imports: [TypeOrmModule.forFeature([Brewery])],
  controllers: [BreweriesController],
  providers: [BreweriesService],
  // Andere Module dürfen BreweriesService injizieren
  exports: [BreweriesService],
})
export class BreweriesModule {}
