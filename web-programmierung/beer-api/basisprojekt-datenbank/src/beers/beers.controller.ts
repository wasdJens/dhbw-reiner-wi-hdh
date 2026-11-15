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
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { RatingDto } from '../ratings/dto/rating.dto';
import { BeersService } from './beers.service';
import { BeerQueryDto } from './dto/beer-query.dto';
import { BeerDto } from './dto/beer.dto';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@ApiTags('beers')
@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ZodResponse({ status: 200, type: [BeerDto] })
  @ApiBadRequestResponse({ type: ErrorDto })
  findAll(@Query() query: BeerQueryDto) {
    return this.beersService.findAll(query);
  }

  @Get(':id')
  @ZodResponse({ status: 200, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beersService.findOne(id);
  }

  @Post()
  @ZodResponse({ status: 201, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  create(@Body() dto: CreateBeerDto) {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  @ZodResponse({ status: 200, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBeerDto) {
    return this.beersService.update(id, dto);
  }

  // Bewertungen hängen an einem Bier: Endpunkt im BeersModule
  @Post(':id/ratings')
  @ZodResponse({ status: 201, type: RatingDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  rate(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRatingDto) {
    return this.beersService.rate(id, dto);
  }

  @Get(':id/ratings')
  @ZodResponse({ status: 200, type: [RatingDto] })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findRatings(@Param('id', ParseIntPipe) id: number) {
    return this.beersService.findRatings(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.beersService.remove(id);
  }
}
