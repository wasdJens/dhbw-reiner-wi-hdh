import { Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beer } from './entities/beer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beer])],
  controllers: [BeersController],
  providers: [BeersService],
})
export class BeersModule {}
