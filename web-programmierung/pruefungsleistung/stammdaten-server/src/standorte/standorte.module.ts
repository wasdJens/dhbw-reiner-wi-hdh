import { Module } from '@nestjs/common';
import { StandorteController } from './standorte.controller';

@Module({ controllers: [StandorteController] })
export class StandorteModule {}
