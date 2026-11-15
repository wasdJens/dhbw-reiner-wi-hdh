import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { pageSchema } from '../../page.dto';

// Antwort v2: eine Brauerei
export const BrewerySchema = z.object({
  brauerei_nr: z
    .string()
    .meta({ description: 'Nummer der Brauerei', example: 'BRA-01' }),
  name: z.string().meta({
    description: 'Name der Brauerei',
    example: 'Privatbrauerei Schlumberger',
  }),
  ort: z
    .string()
    .meta({ description: 'Ort der Brauerei', example: 'Nattheim' }),
  status: z.enum(['aktiv', 'gesperrt']).meta({
    description:
      'aktiv: Die Brauerei liefert über das ERP. gesperrt: Die Brauerei liefert derzeit ' +
      'nicht über das ERP; ihre Artikel sind nicht bestellbar.',
    example: 'aktiv',
  }),
  geaendert_am: z.iso.datetime().meta({
    description: 'Zeitpunkt der letzten Änderung (ISO 8601, UTC)',
    example: '2026-11-15T13:03:00Z',
  }),
});

export type BreweryOut = z.infer<typeof BrewerySchema>;

export class BreweryDto extends createZodDto(BrewerySchema) {}

// Antwort v2: eine Seite der Brauereien
export class BreweryPageDto extends createZodDto(pageSchema(BrewerySchema)) {}
