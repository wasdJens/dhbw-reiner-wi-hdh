import { Module } from '@nestjs/common';
import { BreweriesModule } from '../breweries/breweries.module';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { BreweryBeersController } from './brewery-beers.controller';

@Module({
  // Biere brauchen Brauereien (R2), nicht umgekehrt
  imports: [BreweriesModule],
  controllers: [BeersController, BreweryBeersController],
  providers: [BeersService],
})
export class BeersModule {}
