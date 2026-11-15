import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { ImportReportDto } from '../import-report.dto';
import { BeersService } from './beers.service';
import { BeerDto } from './dto/beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@ApiTags('beers')
@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ZodResponse({ status: 200, type: [BeerDto] })
  findAll() {
    return this.beersService.findAll();
  }

  @Get(':id')
  @ZodResponse({ status: 200, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beersService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse({ status: 200, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBeerDto) {
    return this.beersService.update(id, dto);
  }

  // Übernimmt die Biere aus dem ERP; 200 wie beim Import der Brauereien
  @Post('import')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ status: 200, type: ImportReportDto })
  @ApiBadGatewayResponse({ type: ErrorDto })
  @ApiServiceUnavailableResponse({ type: ErrorDto })
  importFromErp() {
    return this.beersService.importFromErp();
  }
}
