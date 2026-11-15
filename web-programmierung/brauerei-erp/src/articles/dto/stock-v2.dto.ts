import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort v2: Bestand je Lagerort, Zeitpunkt nach ISO 8601
export const StockV2Schema = z.object({
  artikel_nr: z
    .string()
    .meta({ description: 'Artikelnummer', example: 'BR-1001' }),
  bezeichnung: z.string().meta({
    description: 'Bezeichnung des Artikels',
    example: 'Nattheimer Spezial 0,5 l',
  }),
  lagerorte: z
    .array(
      z.object({
        name: z
          .string()
          .meta({ description: 'Name des Lagerorts', example: 'Hauptlager' }),
        bestand: z
          .number()
          .int()
          .meta({ description: 'Flaschen an diesem Lagerort', example: 200 }),
      }),
    )
    .meta({ description: 'Bestand je Lagerort' }),
  aktualisiert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Inventur (ISO 8601, UTC)',
    example: '2026-11-15T13:03:00Z',
  }),
});

export type StockV2 = z.infer<typeof StockV2Schema>;

export class StockV2Dto extends createZodDto(StockV2Schema) {}
