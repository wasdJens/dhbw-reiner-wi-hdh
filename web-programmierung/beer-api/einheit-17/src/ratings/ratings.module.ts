import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsGateway } from './ratings.gateway';
import { RatingCreatedListener } from './rating-created.listener';
import { MyRatingsController } from './my-ratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [MyRatingsController],
  providers: [RatingsService, RatingsGateway, RatingCreatedListener],
  // BeersModule nutzt den Service; RatingsService braucht keine Biere
  exports: [RatingsService],
})
export class RatingsModule {}
