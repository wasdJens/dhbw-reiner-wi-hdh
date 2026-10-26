import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingsService],
  // BeersModule nutzt den Service; RatingsService braucht keine Biere
  exports: [RatingsService],
})
export class RatingsModule {}
