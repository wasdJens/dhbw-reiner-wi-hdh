import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, listeSchema } from '../liste';

// Eine Abteilung
export const AbteilungSchema = z.object({
  abteilung_nr: z.string().meta({
    description: 'Nummer der Abteilung, eindeutig',
    example: 'ABT-06',
  }),
  name: z.string().meta({ description: 'Name der Abteilung', example: 'IT' }),
  kostenstelle: z
    .string()
    .meta({ description: 'Kostenstelle der Abteilung', example: 'KST-4100' }),
  leitung_nr: z.string().meta({
    description: 'Personalnummer der Leitung; immer eine aktive Person',
    example: 'P-00021',
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2025-03-08T23:29:00Z',
  }),
});

export type Abteilung = z.infer<typeof AbteilungSchema>;

export class AbteilungDto extends createZodDto(AbteilungSchema) {}

export class AbteilungListeDto extends createZodDto(
  listeSchema(AbteilungSchema),
) {}

export class AbteilungQueryDto extends createZodDto(AenderungsQuerySchema) {}
