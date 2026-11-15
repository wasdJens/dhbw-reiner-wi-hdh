import { z } from 'zod';

// Antwort des ERP v2 laut Swagger UI des ERP (/api); nur die Felder,
// die die Beer API braucht. Zod prüft sie wie einen Body (Einheit 7)
export const ErpStockSchema = z.object({
  artikel_nr: z.string(),
  // Bestand je Lagerort statt einer Summe
  lagerorte: z.array(
    z.object({
      name: z.string(),
      bestand: z.number().int().min(0),
    }),
  ),
  // Zeitpunkt nach ISO 8601, etwa 2026-11-15T13:03:00Z
  aktualisiert_am: z.iso.datetime(),
});

export type ErpStock = z.infer<typeof ErpStockSchema>;
