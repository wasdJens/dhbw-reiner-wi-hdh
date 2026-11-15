import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Feste Größe jeder Seite einer Liste
export const PAGE_SIZE = 3;

const PAGE_ERROR = 'ganze Zahl ab 1 erwartet';

// Query-Parameter seite: optional, beginnt bei 1
export const PageQuerySchema = z.object({
  seite: z.coerce
    .number({ error: PAGE_ERROR })
    .int({ error: PAGE_ERROR })
    .min(1, { error: PAGE_ERROR })
    .default(1)
    .meta({ description: 'Nummer der Seite, beginnt bei 1', example: 1 }),
});

export class PageQueryDto extends createZodDto(PageQuerySchema) {}

// Hülle jeder Liste: Einträge der Seite, Nummer der Seite, Zahl der Seiten
export function pageSchema<T extends z.ZodType>(item: T) {
  return z.object({
    daten: z.array(item).meta({
      description: `Einträge der Seite, höchstens ${PAGE_SIZE}; hinter der letzten Seite leer`,
    }),
    seite: z
      .number()
      .int()
      .meta({ description: 'Nummer der Seite', example: 1 }),
    seiten_gesamt: z
      .number()
      .int()
      .meta({ description: 'Zahl aller Seiten', example: 3 }),
  });
}

export type Page<T> = { daten: T[]; seite: number; seiten_gesamt: number };

// Schneidet die Seite page aus items
export function toPage<T>(items: T[], page: number): Page<T> {
  return {
    daten: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    seite: page,
    seiten_gesamt: Math.ceil(items.length / PAGE_SIZE),
  };
}
