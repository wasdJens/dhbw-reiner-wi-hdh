import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBeerDto } from '../create-beer.dto';
import { BeerDto } from '../beer.dto';
import { Beer } from '../beer.entity';

@Controller({
  path: 'beers',
  version: '1',
})
export class BeersController {
  @Get()
  getBeers() {
    return ['Wildbräu Helles'];
  }

  @Post()
  createBeer(@Body() createBeerDto: CreateBeerDto) {
    return { name: createBeerDto.name, price: createBeerDto.price };
  }

  @Get('single')
  getBeer(): BeerDto {
    const beer: Beer = {
      name: 'Wildbräu Helles',
      secretRecipe: 'Wasser, Hopfen, Gerste',
    };

    return new BeerDto(beer);
  }
}
