import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
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
}
