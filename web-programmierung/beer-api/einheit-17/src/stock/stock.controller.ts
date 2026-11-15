import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { ErrorDto } from '../error.dto';
import { StockDto } from './dto/stock.dto';
import { StockService } from './stock.service';

// Bestand eines Biers aus dem Brauerei-ERP; ohne Anmeldung (Story 17)
@ApiTags('beers')
@Controller('beers/:id/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ZodResponse({ status: 200, type: StockDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiBadGatewayResponse({ type: ErrorDto })
  @ApiServiceUnavailableResponse({ type: ErrorDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findOne(id);
  }
}
