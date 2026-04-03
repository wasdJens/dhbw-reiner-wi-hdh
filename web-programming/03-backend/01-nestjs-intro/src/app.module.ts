import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeersModule } from './beers/beers.module';

@Module({
  imports: [BeersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
