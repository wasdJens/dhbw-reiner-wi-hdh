import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { listeSchema, SeitenQuerySchema } from '../liste';

// Ein gesetzlicher Feiertag
export const FeiertagSchema = z.object({
  datum: z.iso.date().meta({
    description: 'Tag des Feiertags (JJJJ-MM-TT), eindeutig',
    example: '2026-12-25',
  }),
  name: z.string().meta({ description: 'Name', example: '1. Weihnachtstag' }),
  bundesland: z.string().meta({
    description: 'Bundesland, in dem der Feiertag gilt',
    example: 'BW',
  }),
});

export type Feiertag = z.infer<typeof FeiertagSchema>;

export class FeiertagDto extends createZodDto(FeiertagSchema) {}

export class FeiertagListeDto extends createZodDto(
  listeSchema(FeiertagSchema),
) {}

export class FeiertagQueryDto extends createZodDto(
  SeitenQuerySchema.extend({
    jahr: z.coerce
      .number({ error: 'Jahr als ganze Zahl erwartet' })
      .int({ error: 'Jahr als ganze Zahl erwartet' })
      .optional()
      .meta({ description: 'nur Feiertage dieses Jahres', example: 2026 }),
  }),
) {}
