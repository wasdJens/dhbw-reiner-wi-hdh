import { Module } from '@nestjs/common';
import { BeersController } from './v1/beers.controller';
import { BeersService } from './beers.service';
import { BeersControllerV2 } from './v2/beers.controller';

@Module({
  controllers: [BeersController, BeersControllerV2],
  providers: [BeersService],
})
export class BeersModule {}
