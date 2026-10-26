import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateBeerSchema } from './create-beer.dto';

// Filter und Sortierung für GET /beers (Story 11)
export const BeerQuerySchema = z.object({
  // Dieselben Stile wie beim Anlegen: ?style=lager → 400
  style: CreateBeerSchema.shape.style.optional(),
  // Query-Parameter sind Strings: coerce wandelt "2" in 2
  breweryId: z.coerce.number().int().optional(),
  sort: z.enum(['name', 'abv', 'averageRating']).optional(),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export class BeerQueryDto extends createZodDto(BeerQuerySchema) {}
