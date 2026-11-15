import { Module } from '@nestjs/common';
import { FeiertageController } from './feiertage.controller';

@Module({ controllers: [FeiertageController] })
export class FeiertageModule {}
