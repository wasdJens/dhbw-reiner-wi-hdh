import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, auswahlFilter, listeSchema } from '../liste';

export const ARTIKEL_STATUS = ['lieferbar', 'nicht_lieferbar'] as const;

// Ein Artikel des Einkaufskatalogs
export const ArtikelSchema = z.object({
  artikel_nr: z
    .string()
    .meta({ description: 'Artikelnummer, eindeutig', example: 'ART-0001' }),
  bezeichnung: z
    .string()
    .meta({ description: 'Bezeichnung', example: 'Kugelschreiber blau' }),
  kategorie: z
    .string()
    .meta({ description: 'Kategorie des Artikels', example: 'Büromaterial' }),
  einheit: z.string().meta({
    description: 'Einheit, auf die sich der Preis bezieht',
    example: 'Stück',
  }),
  preis_cent: z.number().int().meta({
    description: 'Preis je Einheit in Cent, netto',
    example: 129,
  }),
  mwst_satz: z.number().int().meta({
    description: 'Mehrwertsteuersatz in Prozent (7 oder 19)',
    example: 19,
  }),
  status: z.enum(ARTIKEL_STATUS).meta({
    description:
      'lieferbar: kann bestellt werden. nicht_lieferbar: derzeit nicht bestellbar.',
    example: 'lieferbar',
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2025-06-29T15:13:00Z',
  }),
});

export type Artikel = z.infer<typeof ArtikelSchema>;

export class ArtikelDto extends createZodDto(ArtikelSchema) {}

export class ArtikelListeDto extends createZodDto(listeSchema(ArtikelSchema)) {}

export class ArtikelQueryDto extends createZodDto(
  AenderungsQuerySchema.extend({
    kategorie: z.string().optional().meta({
      description: 'nur Artikel dieser Kategorie',
      example: 'Getränke',
    }),
    status: auswahlFilter(ARTIKEL_STATUS, 'nur Artikel mit diesem Status'),
  }),
) {}
