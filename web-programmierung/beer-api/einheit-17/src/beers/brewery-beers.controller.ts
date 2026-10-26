import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { BeersService } from './beers.service';
import { BeerDto } from './dto/beer.dto';

// Biere einer Brauerei: im BeersModule, weil nur Beers von Breweries abhängt
@ApiTags('beers')
@Controller('breweries/:breweryId/beers')
export class BreweryBeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ZodResponse({ status: 200, type: [BeerDto] })
  @ApiBadRequestResponse({ type: ErrorDto })
  findAll(@Param('breweryId', ParseIntPipe) breweryId: number) {
    return this.beersService.findByBrewery(breweryId);
  }
}
