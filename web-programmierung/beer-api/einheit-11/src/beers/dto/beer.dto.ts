import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateBeerSchema } from './create-beer.dto';

// Antwort: ein Bier mit id und dem berechneten averageRating (R5)
export const BeerSchema = z.object({
  id: z.number().int(),
  ...CreateBeerSchema.shape,
  averageRating: z.number().nullable(),
});

export class BeerDto extends createZodDto(BeerSchema) {}
