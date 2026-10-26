import { Module } from '@nestjs/common';
import { HttpController } from './http.controller';
import { JsonController } from './json.controller';
import { StartController } from './start.controller';

@Module({
  controllers: [StartController, HttpController, JsonController],
})
export class AppModule {}
