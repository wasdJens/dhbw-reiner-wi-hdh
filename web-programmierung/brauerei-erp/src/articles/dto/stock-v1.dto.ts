import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort v1: Bestand als Summe aller Lagerorte
export const StockV1Schema = z.object({
  artikel_nr: z
    .string()
    .meta({ description: 'Artikelnummer', example: 'BR-1001' }),
  bezeichnung: z.string().meta({
    description: 'Bezeichnung des Artikels',
    example: 'Nattheimer Spezial 0,5 l',
  }),
  bestand: z.number().int().meta({
    description: 'Flaschen in allen Lagerorten zusammen',
    example: 240,
  }),
  stand: z.string().meta({
    description: 'Tag der letzten Inventur im Format TT.MM.JJJJ',
    example: '15.11.2026',
  }),
});

export type StockV1 = z.infer<typeof StockV1Schema>;

export class StockV1Dto extends createZodDto(StockV1Schema) {}
