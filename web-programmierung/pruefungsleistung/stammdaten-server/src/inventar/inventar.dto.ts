import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, auswahlFilter, listeSchema } from '../liste';

export const INVENTAR_STATUS = [
  'in_betrieb',
  'in_reparatur',
  'ausgemustert',
] as const;

// Eine Inventar-Position: ein Gerät mit Seriennummer
export const InventarSchema = z.object({
  inventar_nr: z
    .string()
    .meta({ description: 'Inventarnummer, eindeutig', example: 'INV-0003' }),
  bezeichnung: z.string().meta({
    description: 'Hersteller und Modell',
    example: 'Epson Beamer EB-W51',
  }),
  kategorie: z.string().meta({
    description: 'Kategorie des Geräts',
    example: 'Präsentationstechnik',
  }),
  hersteller: z.string().meta({ description: 'Hersteller', example: 'Epson' }),
  seriennummer: z.string().meta({
    description: 'Seriennummer des Herstellers',
    example: 'EPS997911',
  }),
  standort_nr: z.string().meta({
    description: 'Nummer des Standorts, an dem das Gerät steht',
    example: 'STO-04',
  }),
  verantwortlich_nr: z.string().meta({
    description:
      'Personalnummer der verantwortlichen Person; immer eine aktive Person',
    example: 'P-00006',
  }),
  anschaffung_am: z.iso.date().meta({
    description: 'Tag der Anschaffung (JJJJ-MM-TT)',
    example: '2023-04-05',
  }),
  anschaffungswert_cent: z.number().int().meta({
    description: 'Preis bei Anschaffung in Cent, brutto',
    example: 54900,
  }),
  status: z.enum(INVENTAR_STATUS).meta({
    description:
      'in_betrieb: nutzbar. in_reparatur: vorübergehend nicht nutzbar. ausgemustert: dauerhaft außer Betrieb.',
    example: 'in_betrieb',
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2026-04-03T06:00:00Z',
  }),
});

export type Inventar = z.infer<typeof InventarSchema>;

export class InventarDto extends createZodDto(InventarSchema) {}

export class InventarListeDto extends createZodDto(
  listeSchema(InventarSchema),
) {}

export class InventarQueryDto extends createZodDto(
  AenderungsQuerySchema.extend({
    kategorie: z.string().optional().meta({
      description: 'nur Geräte dieser Kategorie',
      example: 'Notebook',
    }),
    status: auswahlFilter(INVENTAR_STATUS, 'nur Geräte mit diesem Status'),
    standort_nr: z
      .string()
      .optional()
      .meta({ description: 'nur Geräte dieses Standorts', example: 'STO-01' }),
    verantwortlich_nr: z.string().optional().meta({
      description: 'nur Geräte dieser verantwortlichen Person',
      example: 'P-00008',
    }),
  }),
) {}
