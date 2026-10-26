import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsGateway } from './ratings.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingsService, RatingsGateway],
  // BeersModule nutzt den Service; RatingsService braucht keine Biere
  exports: [RatingsService],
})
export class RatingsModule {}
