import { z } from 'zod';

// Antworten des ERP v2 laut Handbuch und Swagger UI des ERP (/api); nur die
// Felder, die der Katalog braucht. Zod prüft sie wie einen Body (Einheit 7)

// Hülle jeder Liste: höchstens 3 Einträge je Seite
export function erpPageSchema<T extends z.ZodType>(item: T) {
  return z.object({
    daten: z.array(item),
    seite: z.number().int(),
    seiten_gesamt: z.number().int(),
  });
}

// Brauerei aus GET /v2/brauereien
export const ErpBrewerySchema = z.object({
  brauerei_nr: z.string(),
  name: z.string(),
  ort: z.string(),
  status: z.enum(['aktiv', 'gesperrt']),
});

export type ErpBrewery = z.infer<typeof ErpBrewerySchema>;

// Artikel aus GET /v2/artikel
export const ErpArticleSchema = z.object({
  artikel_nr: z.string(),
  bezeichnung: z.string(),
  brauerei_nr: z.string(),
  sorte: z.string(),
  alkohol_vol: z.number(),
  // Preis in Cent als ganze Zahl
  preis_cent: z.number().int(),
});

export type ErpArticle = z.infer<typeof ErpArticleSchema>;

// TODO Aufgabe 19.4: Schema und Typ des Bestands aus
// GET /v2/artikel/{artikel_nr}/bestand. Die Felder stehen in Abschnitt 4 des
// Handbuchs
