import { Module } from '@nestjs/common';
import { InventarController } from './inventar.controller';

@Module({ controllers: [InventarController] })
export class InventarModule {}
