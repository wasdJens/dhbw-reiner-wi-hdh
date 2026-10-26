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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ErrorDto } from '../error.dto';
import { BreweriesService } from './breweries.service';
import { BreweryQueryDto } from './dto/brewery-query.dto';
import { BreweryDto } from './dto/brewery.dto';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { UpdateBreweryDto } from './dto/update-brewery.dto';

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

  // Nur admin (R6): ohne Token 401, mit anderer Rolle 403
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ZodResponse({ status: 201, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  create(@Body() dto: CreateBreweryDto) {
    return this.breweriesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ZodResponse({ status: 200, type: BreweryDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBreweryDto) {
    return this.breweriesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiConflictResponse({ type: ErrorDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // return: NestJS wartet auf das Promise und sendet die 404 des Service
    return this.breweriesService.remove(id);
  }
}
