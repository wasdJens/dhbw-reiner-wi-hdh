import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Lokale Änderung; der nächste Import überschreibt sie mit den Daten des ERP
export const UpdateBrewerySchema = z.object({
  name: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
});

export class UpdateBreweryDto extends createZodDto(UpdateBrewerySchema) {}
