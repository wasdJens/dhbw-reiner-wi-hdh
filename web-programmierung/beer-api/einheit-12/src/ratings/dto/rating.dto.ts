import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateRatingSchema } from './create-rating.dto';

// Antwort: eine Bewertung; id, beerId und createdAt setzt der Server
export const RatingSchema = z.object({
  id: z.number().int(),
  beerId: z.number().int(),
  ...CreateRatingSchema.shape,
  // Aus der Datenbank: Eine leere Spalte ist null
  comment: z.string().nullable(),
  createdAt: z.iso.datetime(),
});

export class RatingDto extends createZodDto(RatingSchema) {}
