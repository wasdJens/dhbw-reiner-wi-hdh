import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import type { Rating } from '../ratings/ratings.service';
import { BeersService } from './beers.service';
import type { BeerWithRating } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  findAll(@Query('style') style?: string): BeerWithRating[] {
    return this.beersService.findAll(style);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): BeerWithRating {
    return this.beersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBeerDto): BeerWithRating {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBeerDto,
  ): BeerWithRating {
    return this.beersService.update(id, dto);
  }

  // Bewertungen hängen an einem Bier: Endpunkt im BeersModule
  @Post(':id/ratings')
  rate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRatingDto,
  ): Rating {
    return this.beersService.rate(id, dto);
  }

  @Get(':id/ratings')
  findRatings(@Param('id', ParseIntPipe) id: number): Rating[] {
    return this.beersService.findRatings(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.beersService.remove(id);
  }
}
