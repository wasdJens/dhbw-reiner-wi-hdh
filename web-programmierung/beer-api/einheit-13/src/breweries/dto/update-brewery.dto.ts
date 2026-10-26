import { createZodDto } from 'nestjs-zod';
import { CreateBrewerySchema } from './create-brewery.dto';

// Jedes Feld optional: Ein fehlendes Feld bleibt unverändert
export const UpdateBrewerySchema = CreateBrewerySchema.partial();

export class UpdateBreweryDto extends createZodDto(UpdateBrewerySchema) {}
