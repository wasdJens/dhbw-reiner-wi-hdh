import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort: eine eigene Bewertung mit dem Namen des Biers; den User kennt der Client
export const MyRatingSchema = z.object({
  beerId: z.number().int(),
  beerName: z.string(),
  score: z.number().int(),
  comment: z.string().nullable(),
  createdAt: z.iso.datetime(),
});

export class MyRatingDto extends createZodDto(MyRatingSchema) {}
