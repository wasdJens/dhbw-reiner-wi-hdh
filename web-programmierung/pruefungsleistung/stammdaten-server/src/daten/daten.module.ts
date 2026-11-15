import { Global, Module } from '@nestjs/common';
import { DatenService } from './daten.service';

// Daten aller Ressourcen; global, damit jedes Module den DatenService bekommt
@Global()
@Module({
  providers: [DatenService],
  exports: [DatenService],
})
export class DatenModule {}
