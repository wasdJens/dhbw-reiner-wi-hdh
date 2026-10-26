import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BreweriesService } from './breweries.service';
import type { Brewery } from './breweries.service';
import { CreateBreweryDto } from './dto/create-brewery.dto';

@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Get()
  findAll(): Brewery[] {
    return this.breweriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Brewery {
    // Keine ganze Zahl: ParseIntPipe antwortet mit 400
    return this.breweriesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBreweryDto): Brewery {
    return this.breweriesService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Brewery {
    return this.breweriesService.remove(id);
  }
}
