import { Module } from '@nestjs/common';
import { ArtikelController } from './artikel.controller';

@Module({ controllers: [ArtikelController] })
export class ArtikelModule {}
