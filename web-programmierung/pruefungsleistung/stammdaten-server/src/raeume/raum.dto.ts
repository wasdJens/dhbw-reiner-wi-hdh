import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, auswahlFilter, listeSchema } from '../liste';

export const RAUM_ARTEN = [
  'besprechung',
  'schulung',
  'werkstatt',
  'lager',
] as const;
export const RAUM_STATUS = ['verfuegbar', 'gesperrt'] as const;

// Ein Raum
export const RaumSchema = z.object({
  raum_nr: z
    .string()
    .meta({ description: 'Nummer des Raums, eindeutig', example: 'RAU-001' }),
  bezeichnung: z.string().meta({
    description: 'Bezeichnung des Raums',
    example: 'Besprechungsraum Nordsee',
  }),
  art: z
    .enum(RAUM_ARTEN)
    .meta({ description: 'Art des Raums', example: 'besprechung' }),
  standort_nr: z
    .string()
    .meta({ description: 'Nummer des Standorts', example: 'STO-01' }),
  etage: z
    .number()
    .int()
    .meta({ description: 'Etage, 0 ist das Erdgeschoss', example: 0 }),
  plaetze: z.number().int().meta({
    description: 'Sitzplätze; 0 bei Lagerflächen',
    example: 10,
  }),
  ausstattung: z.array(z.string()).meta({
    description: 'Ausstattung des Raums, kann leer sein',
    example: ['Bildschirm', 'Videokonferenz', 'Whiteboard'],
  }),
  status: z.enum(RAUM_STATUS).meta({
    description:
      'verfuegbar: kann genutzt werden. gesperrt: derzeit nicht nutzbar, zum Beispiel wegen Renovierung.',
    example: 'verfuegbar',
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2025-01-07T00:13:00Z',
  }),
});

export type Raum = z.infer<typeof RaumSchema>;

export class RaumDto extends createZodDto(RaumSchema) {}

export class RaumListeDto extends createZodDto(listeSchema(RaumSchema)) {}

export class RaumQueryDto extends createZodDto(
  AenderungsQuerySchema.extend({
    art: auswahlFilter(RAUM_ARTEN, 'nur Räume dieser Art'),
    status: auswahlFilter(RAUM_STATUS, 'nur Räume mit diesem Status'),
    standort_nr: z
      .string()
      .optional()
      .meta({ description: 'nur Räume dieses Standorts', example: 'STO-01' }),
  }),
) {}
