import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort: Bestand eines Biers im Format der Beer API; Felder des ERP fehlen
export const StockSchema = z.object({
  beerId: z.number().int(),
  bottles: z.number().int(),
  // Tag der letzten Inventur im ERP, ISO 8601 wie alle Daten der Beer API
  asOf: z.iso.date(),
});

export class StockDto extends createZodDto(StockSchema) {}
