import { createZodDto } from 'nestjs-zod';
import { CreateBeerSchema } from './create-beer.dto';

// Jedes Feld optional: Ein fehlendes Feld bleibt unverändert
export const UpdateBeerSchema = CreateBeerSchema.partial();

export class UpdateBeerDto extends createZodDto(UpdateBeerSchema) {}
