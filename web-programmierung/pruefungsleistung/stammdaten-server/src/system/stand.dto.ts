import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const stand = z
  .union([z.literal(1), z.literal(2)], { error: '1 oder 2 erwartet' })
  .meta({
    description:
      '1: Auslieferungszustand. 2: nach den Änderungen vom 01.12.2026.',
    example: 2,
  });

// Antwort: aktueller Datenstand
export const StandSchema = z.object({
  stand,
  beschreibung: z.string().meta({
    description: 'Beschreibung des Datenstands',
    example: 'nach den Änderungen vom 01.12.2026',
  }),
});

export class StandDto extends createZodDto(StandSchema) {}

// Anfrage: Datenstand wechseln
export class StandWechselDto extends createZodDto(z.object({ stand })) {}
