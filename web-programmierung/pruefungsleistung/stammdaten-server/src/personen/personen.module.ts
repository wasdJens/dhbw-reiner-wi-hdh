import { Module } from '@nestjs/common';
import { PersonenController } from './personen.controller';

@Module({ controllers: [PersonenController] })
export class PersonenModule {}
