import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { PageQuerySchema, pageSchema } from '../../page.dto';

// Antwort v2: ein Artikel mit Stammdaten, ohne Bestand
export const ArticleSchema = z.object({
  artikel_nr: z
    .string()
    .meta({ description: 'Artikelnummer', example: 'BR-1001' }),
  bezeichnung: z.string().meta({
    description: 'Bezeichnung des Artikels',
    example: 'Nattheimer Spezial 0,5 l',
  }),
  brauerei_nr: z.string().meta({
    description: 'Nummer der Brauerei, die den Artikel braut',
    example: 'BRA-01',
  }),
  sorte: z.string().meta({ description: 'Biersorte', example: 'Spezial' }),
  alkohol_vol: z.number().meta({
    description: 'Alkoholgehalt in Volumenprozent',
    example: 5.4,
  }),
  preis_cent: z.number().int().meta({
    description: 'Abgabepreis je Flasche in Cent',
    example: 139,
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2026-11-15T13:03:00Z',
  }),
});

export type ArticleOut = z.infer<typeof ArticleSchema>;

// Antwort v2: eine Seite der Artikel
export class ArticlePageDto extends createZodDto(pageSchema(ArticleSchema)) {}

// Query-Parameter: seite und der optionale Filter brauerei_nr
export const ArticleQuerySchema = PageQuerySchema.extend({
  brauerei_nr: z.string().optional().meta({
    description: 'Nur Artikel dieser Brauerei',
    example: 'BRA-01',
  }),
});

export class ArticleQueryDto extends createZodDto(ArticleQuerySchema) {}
