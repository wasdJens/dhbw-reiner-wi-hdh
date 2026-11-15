import { Module } from '@nestjs/common';
import { ErpClient } from './erp.client';

// Das einzige Module, das das ERP kennt: Adresse, API-Key, Pfade und Fehler
@Module({
  providers: [ErpClient],
  // Brauereien, Biere und Bestellungen fragen das ERP nur über ErpClient
  exports: [ErpClient],
})
export class ErpModule {}
