import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BeersService } from './beers.service';
import type { Beer } from './beers.service';

// Biere einer Brauerei: im BeersModule, weil nur Beers von Breweries abhängt
@Controller('breweries/:breweryId/beers')
export class BreweryBeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  findAll(@Param('breweryId', ParseIntPipe) breweryId: number): Beer[] {
    return this.beersService.findByBrewery(breweryId);
  }
}
