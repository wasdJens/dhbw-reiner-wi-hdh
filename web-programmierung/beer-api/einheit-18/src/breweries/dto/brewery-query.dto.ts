import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Query-Parameter filtern und sortieren die Liste; die Ressource bleibt /breweries
export const BreweryQuerySchema = z.object({
  city: z.string().optional(),
  sort: z.enum(['name', 'city']).optional(),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export class BreweryQueryDto extends createZodDto(BreweryQuerySchema) {}
