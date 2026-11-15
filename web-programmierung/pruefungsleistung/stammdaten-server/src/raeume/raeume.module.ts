import { Module } from '@nestjs/common';
import { RaeumeController } from './raeume.controller';

@Module({ controllers: [RaeumeController] })
export class RaeumeModule {}
