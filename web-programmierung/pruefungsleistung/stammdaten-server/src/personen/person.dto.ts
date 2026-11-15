import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { AenderungsQuerySchema, auswahlFilter, listeSchema } from '../liste';

export const PERSON_STATUS = ['aktiv', 'ausgetreten'] as const;

// Eine Person
export const PersonSchema = z.object({
  personal_nr: z
    .string()
    .meta({ description: 'Personalnummer, eindeutig', example: 'P-00017' }),
  vorname: z.string().meta({ description: 'Vorname', example: 'Ida' }),
  nachname: z.string().meta({ description: 'Nachname', example: 'Köhler' }),
  email: z.string().meta({
    description: 'E-Mail-Adresse, eindeutig',
    example: 'ida.koehler@example.org',
  }),
  geburtsdatum: z.iso
    .date()
    .meta({ description: 'Geburtsdatum (JJJJ-MM-TT)', example: '1998-06-27' }),
  abteilung_nr: z
    .string()
    .meta({ description: 'Nummer der Abteilung', example: 'ABT-05' }),
  standort_nr: z
    .string()
    .meta({ description: 'Nummer des Standorts', example: 'STO-03' }),
  status: z.enum(PERSON_STATUS).meta({
    description:
      'aktiv: arbeitet für die Prismarine Solutions GmbH. ausgetreten: arbeitet seit austritt_am nicht mehr dort.',
    example: 'aktiv',
  }),
  eintritt_am: z.iso.date().meta({
    description: 'Tag des Eintritts (JJJJ-MM-TT)',
    example: '2020-10-19',
  }),
  austritt_am: z.iso.date().nullable().meta({
    description: 'Tag des Austritts (JJJJ-MM-TT); null, solange aktiv',
    example: null,
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2026-10-11T08:56:00Z',
  }),
});

export type Person = z.infer<typeof PersonSchema>;

export class PersonDto extends createZodDto(PersonSchema) {}

export class PersonListeDto extends createZodDto(listeSchema(PersonSchema)) {}

export class PersonQueryDto extends createZodDto(
  AenderungsQuerySchema.extend({
    status: auswahlFilter(PERSON_STATUS, 'nur Personen mit diesem Status'),
    abteilung_nr: z.string().optional().meta({
      description: 'nur Personen dieser Abteilung',
      example: 'ABT-03',
    }),
    standort_nr: z.string().optional().meta({
      description: 'nur Personen dieses Standorts',
      example: 'STO-02',
    }),
  }),
) {}
