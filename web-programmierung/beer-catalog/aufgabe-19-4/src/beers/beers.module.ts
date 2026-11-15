import { Module } from '@nestjs/common';
import { BreweriesModule } from '../breweries/breweries.module';
import { ErpModule } from '../erp/erp.module';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';

@Module({
  // Der Import liest die Artikel über ErpClient und sucht ihre Brauerei
  imports: [ErpModule, BreweriesModule],
  controllers: [BeersController],
  providers: [BeersService],
  // Bestellungen suchen das Bier mit findOne
  exports: [BeersService],
})
export class BeersModule {}
