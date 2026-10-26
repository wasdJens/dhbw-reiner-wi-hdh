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
  findOne(@Param('id', ParseIntPipe) id: number): Beer {
    return this.beersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBeerDto): Beer {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBeerDto,
  ): Beer {
    return this.beersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.beersService.remove(id);
  }
}
