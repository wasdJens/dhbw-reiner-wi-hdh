import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort: eine Brauerei im Modell des Katalogs; Felder des ERP fehlen
export const BrewerySchema = z.object({
  id: z.number().int(),
  // Nummer der Brauerei im ERP: erkennt die Brauerei beim nächsten Import wieder
  erpNumber: z.string(),
  name: z.string(),
  city: z.string(),
});

export type Brewery = z.infer<typeof BrewerySchema>;

export class BreweryDto extends createZodDto(BrewerySchema) {}
