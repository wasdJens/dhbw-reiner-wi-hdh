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
import { BreweriesService } from './breweries.service';
import { BreweryQueryDto } from './dto/brewery-query.dto';
import { BreweryDto } from './dto/brewery.dto';
import { CreateBreweryDto } from './dto/create-brewery.dto';

// Swagger UI fasst alle Endpunkte dieses Controllers unter "breweries" zusammen
@ApiTags('breweries')
@Controller('breweries')
export class BreweriesController {
  constructor(private readonly breweriesService: BreweriesService) {}

  @Get()
  @ZodResponse({ status: 200, type: [BreweryDto] })
  @ApiBadRequestResponse({ type: ErrorDto })
  findAll(@Query() query: BreweryQueryDto) {
    return this.breweriesService.findAll(query);
  }

  @Get(':id')
  @ZodResponse({ status: 200, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Keine ganze Zahl: ParseIntPipe antwortet mit 400
    return this.breweriesService.findOne(id);
  }

  @Post()
  @ZodResponse({ status: 201, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  create(@Body() dto: CreateBreweryDto) {
    return this.breweriesService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.breweriesService.remove(id);
  }
}
