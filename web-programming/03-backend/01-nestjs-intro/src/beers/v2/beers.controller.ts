import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBeerDto } from '../create-beer.dto';
import { BeersService } from '../beers.service';

@Controller({
  path: 'beers',
  version: '2',
})
export class BeersControllerV2 {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  getBeers() {
    return this.beersService.findAll();
  }

  @Post()
  createBeer(@Body() createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }
}
