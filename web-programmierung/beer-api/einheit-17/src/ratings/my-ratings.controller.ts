import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';
import { AuthGuard, type AuthRequest } from '../auth/auth.guard';
import { ErrorDto } from '../error.dto';
import { MyRatingDto } from './dto/my-rating.dto';
import { RatingsService } from './ratings.service';

// Bewertungen des angemeldeten Users: verschachtelte Ressource wie
// BreweryBeersController, im RatingsModule, weil nur Bewertungen gebraucht werden
@ApiTags('users')
@Controller('users/me/ratings')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MyRatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ZodResponse({ status: 200, type: [MyRatingDto] })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  findAll(@Req() request: AuthRequest) {
    // userId aus dem Token: Jeder sieht nur seine eigenen Bewertungen
    return this.ratingsService.findByUser(request.user.sub);
  }

  // Nur die eigene Bewertung: beerId aus dem Pfad, userId aus dem Token
  @Delete(':beerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  remove(
    @Param('beerId', ParseIntPipe) beerId: number,
    @Req() request: AuthRequest,
  ): Promise<void> {
    return this.ratingsService.removeOwn(beerId, request.user.sub);
  }
}
