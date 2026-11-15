import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Gültige Daten für ein neues Bier nach dem Datenmodell und R1
export const CreateBeerSchema = z.object({
  name: z.string().min(1),
  style: z.enum(['helles', 'pils', 'spezial', 'weizen', 'dunkel']),
  abv: z.number().min(0).max(20),
  breweryId: z.number().int(),
  description: z.string().optional(),
});

export class CreateBeerDto extends createZodDto(CreateBeerSchema) {}
