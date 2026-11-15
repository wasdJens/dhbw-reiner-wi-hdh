import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// R3 ist eine Form: Das Schema prüft sie, bevor der Service läuft
export const CreateRatingSchema = z.object({
  userId: z.number().int(),
  score: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export class CreateRatingDto extends createZodDto(CreateRatingSchema) {}
