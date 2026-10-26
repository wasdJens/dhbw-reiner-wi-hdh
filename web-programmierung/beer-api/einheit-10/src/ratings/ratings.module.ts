import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Module({
  providers: [RatingsService],
  // BeersModule nutzt den Service; Bewertungen brauchen keine Biere
  exports: [RatingsService],
})
export class RatingsModule {}
