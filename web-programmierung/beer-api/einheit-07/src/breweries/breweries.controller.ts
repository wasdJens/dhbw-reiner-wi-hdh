import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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
  findOne(@Param('id') id: string): Brewery {
    // Pfadparameter kommen immer als String an
    const brewery = this.breweriesService.findOne(Number(id));
    if (!brewery) {
      throw new NotFoundException(`Brewery ${id} not found`);
    }
    return brewery;
  }

  @Post()
  create(@Body() dto: CreateBreweryDto): Brewery {
    return this.breweriesService.create(dto);
  }
}
