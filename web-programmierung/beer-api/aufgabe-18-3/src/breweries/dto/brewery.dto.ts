import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CreateBrewerySchema } from './create-brewery.dto';

// Antwort: die Felder aus dem Body und die id, die der Service vergibt
export const BrewerySchema = z.object({
  id: z.number().int(),
  ...CreateBrewerySchema.shape,
});

export class BreweryDto extends createZodDto(BrewerySchema) {}
