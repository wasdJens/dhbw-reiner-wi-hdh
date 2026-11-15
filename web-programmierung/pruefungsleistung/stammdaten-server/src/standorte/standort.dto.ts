import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, listeSchema } from '../liste';

// Ein Standort
export const StandortSchema = z.object({
  standort_nr: z.string().meta({
    description: 'Nummer des Standorts, eindeutig',
    example: 'STO-01',
  }),
  name: z.string().meta({
    description: 'Name des Standorts',
    example: 'Zentrale Heidenheim',
  }),
  strasse: z
    .string()
    .meta({ description: 'Straße und Hausnummer', example: 'Hafenstraße 12' }),
  plz: z.string().meta({ description: 'Postleitzahl', example: '89518' }),
  ort: z
    .string()
    .meta({ description: 'Ort', example: 'Heidenheim an der Brenz' }),
  land: z
    .string()
    .meta({ description: 'Land (ISO 3166-1 alpha-2)', example: 'DE' }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2025-07-06T20:05:00Z',
  }),
});

export type Standort = z.infer<typeof StandortSchema>;

export class StandortDto extends createZodDto(StandortSchema) {}

export class StandortListeDto extends createZodDto(
  listeSchema(StandortSchema),
) {}

export class StandortQueryDto extends createZodDto(AenderungsQuerySchema) {}
