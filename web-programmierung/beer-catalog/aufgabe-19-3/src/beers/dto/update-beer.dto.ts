import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Lokale Änderung; der nächste Import überschreibt sie mit den Daten des ERP
export const UpdateBeerSchema = z.object({
  name: z.string().min(1).optional(),
  style: z.string().min(1).optional(),
  abv: z.number().min(0).optional(),
  price: z.number().min(0).optional(),
});

export class UpdateBeerDto extends createZodDto(UpdateBeerSchema) {}
