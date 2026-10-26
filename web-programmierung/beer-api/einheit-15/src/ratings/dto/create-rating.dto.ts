import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// R3 ist eine Form: Das Schema prüft sie, bevor der Service läuft
// userId kommt aus dem Token; strict lehnt eine userId im Body mit 400 ab
export const CreateRatingSchema = z
  .object({
    score: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  })
  .strict();

export class CreateRatingDto extends createZodDto(CreateRatingSchema) {}
