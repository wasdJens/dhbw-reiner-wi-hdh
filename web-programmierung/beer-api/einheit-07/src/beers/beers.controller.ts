import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import type { Beer } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

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
  create(@Body() dto: CreateBeerDto): Beer {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBeerDto): Beer {
    const beer = this.beersService.update(Number(id), dto);
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.beersService.remove(Number(id));
  }
}
