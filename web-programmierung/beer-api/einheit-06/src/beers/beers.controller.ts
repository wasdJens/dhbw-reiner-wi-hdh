import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import type { Beer } from './beers.service';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  findAll(@Query('style') style?: string): Beer[] {
    return this.beersService.findAll(style);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Beer {
    const beer = this.beersService.findOne(Number(id));
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  @Post()
  create(@Body() data: Omit<Beer, 'id'>): Beer {
    return this.beersService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.beersService.remove(Number(id));
  }
}
