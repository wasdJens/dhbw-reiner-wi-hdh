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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ZodResponse } from 'nestjs-zod';
import { AuthGuard, type AuthRequest } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ErrorDto } from '../error.dto';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { RatingDto } from '../ratings/dto/rating.dto';
import { BeersService } from './beers.service';
import { BeerQueryDto } from './dto/beer-query.dto';
import { BeerDto, BeerSchema } from './dto/beer.dto';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

@ApiTags('beers')
@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  // Ohne @ZodResponse: Mit @Res() sendet die Methode selbst
  @ApiOkResponse({ type: [BeerDto.Output] })
  @ApiBadRequestResponse({ type: ErrorDto })
  async findAll(@Query() query: BeerQueryDto, @Res() res: Response) {
    const beers = await this.beersService.findAll(query);
    res.format({
      // parse entfernt die Brauerei: JSON bleibt wie BeerDto
      json: () => res.json(BeerSchema.array().parse(beers)),
      html: () => res.render('beers', { beers }),
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: BeerDto.Output })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    // findOne wirft die 404, bevor eine Seite entsteht
    const beer = await this.beersService.findOne(id);
    const ratings = await this.beersService.findRatings(id);
    res.format({
      json: () => res.json(beer),
      html: () => res.render('beer', { beer, ratings }),
    });
  }

  // Nur admin (R6): ohne Token 401, mit anderer Rolle 403
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ZodResponse({ status: 201, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  create(@Body() dto: CreateBeerDto) {
    return this.beersService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ZodResponse({ status: 200, type: BeerDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBeerDto) {
    return this.beersService.update(id, dto);
  }

  // Bewertungen hängen an einem Bier: Endpunkt im BeersModule
  // Jeder angemeldete User (R6): AuthGuard ohne Rolle
  @Post(':id/ratings')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ZodResponse({ status: 201, type: RatingDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  rate(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthRequest,
    @Body() dto: CreateRatingDto,
  ) {
    // userId aus dem Payload des Tokens, nicht aus dem Body
    return this.beersService.rate(id, request.user.sub, dto);
  }

  @Get(':id/ratings')
  @ZodResponse({ status: 200, type: [RatingDto] })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  findRatings(@Param('id', ParseIntPipe) id: number) {
    return this.beersService.findRatings(id);
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
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.beersService.remove(id);
  }
}
