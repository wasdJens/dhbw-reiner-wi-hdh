import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Antwort: ein Bier im Modell des Katalogs; Felder des ERP fehlen
export const BeerSchema = z.object({
  id: z.number().int(),
  // Nummer des Artikels im ERP: erkennt das Bier beim nächsten Import wieder
  erpNumber: z.string(),
  name: z.string(),
  style: z.string(),
  abv: z.number(),
  // Preis in Euro
  price: z.number(),
  breweryId: z.number().int(),
});

export type Beer = z.infer<typeof BeerSchema>;

export class BeerDto extends createZodDto(BeerSchema) {}
