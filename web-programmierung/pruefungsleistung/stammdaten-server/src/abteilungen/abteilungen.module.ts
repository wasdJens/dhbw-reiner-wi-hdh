import { Module } from '@nestjs/common';
import { AbteilungenController } from './abteilungen.controller';

@Module({ controllers: [AbteilungenController] })
export class AbteilungenModule {}
