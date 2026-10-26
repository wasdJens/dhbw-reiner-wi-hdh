import { Module } from '@nestjs/common';
import { BreweriesModule } from '../breweries/breweries.module';
import { RatingsModule } from '../ratings/ratings.module';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { BreweryBeersController } from './brewery-beers.controller';

@Module({
  // Biere brauchen Brauereien (R2) und Bewertungen (R5), nicht umgekehrt
  imports: [BreweriesModule, RatingsModule],
  controllers: [BeersController, BreweryBeersController],
  providers: [BeersService],
})
export class BeersModule {}
