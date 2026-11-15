import { z } from 'zod';

// Größe einer Seite: Standard und Höchstwert
export const PRO_SEITE_STANDARD = 100;
export const PRO_SEITE_MAX = 500;

// Query-Parameter jeder Liste: Seite und Größe der Seite
export const SeitenQuerySchema = z.object({
  seite: z.coerce
    .number({ error: 'ganze Zahl ab 1 erwartet' })
    .int({ error: 'ganze Zahl ab 1 erwartet' })
    .min(1, { error: 'ganze Zahl ab 1 erwartet' })
    .default(1)
    .meta({ description: 'Nummer der Seite, beginnt bei 1', example: 1 }),
  pro_seite: z.coerce
    .number({ error: `ganze Zahl von 1 bis ${PRO_SEITE_MAX} erwartet` })
    .int({ error: `ganze Zahl von 1 bis ${PRO_SEITE_MAX} erwartet` })
    .min(1, { error: `ganze Zahl von 1 bis ${PRO_SEITE_MAX} erwartet` })
    .max(PRO_SEITE_MAX, {
      error: `ganze Zahl von 1 bis ${PRO_SEITE_MAX} erwartet`,
    })
    .default(PRO_SEITE_STANDARD)
    .meta({
      description: `Einträge je Seite, 1 bis ${PRO_SEITE_MAX}, Standard ${PRO_SEITE_STANDARD}`,
      example: PRO_SEITE_STANDARD,
    }),
});

// Zusätzlich für Ressourcen mit geaendert_am
export const AenderungsQuerySchema = SeitenQuerySchema.extend({
  geaendert_seit: z.iso
    .datetime({ offset: true, error: 'Zeitpunkt nach ISO 8601 erwartet' })
    .optional()
    .meta({
      description:
        'Nur Einträge, deren geaendert_am nach diesem Zeitpunkt liegt (ISO 8601)',
      example: '2026-11-16T00:00:00Z',
    }),
});

// Hülle jeder Liste
export function listeSchema<T extends z.ZodType>(eintrag: T) {
  return z.object({
    daten: z.array(eintrag).meta({
      description: 'Einträge der Seite; hinter der letzten Seite leer',
    }),
    seite: z
      .number()
      .int()
      .meta({ description: 'Nummer der Seite', example: 1 }),
    pro_seite: z
      .number()
      .int()
      .meta({ description: 'Einträge je Seite', example: PRO_SEITE_STANDARD }),
    gesamt: z.number().int().meta({
      description: 'Zahl aller Einträge, die zu den Filtern passen',
      example: 250,
    }),
    seiten_gesamt: z
      .number()
      .int()
      .meta({ description: 'Zahl aller Seiten', example: 3 }),
  });
}

export type Liste<T> = {
  daten: T[];
  seite: number;
  pro_seite: number;
  gesamt: number;
  seiten_gesamt: number;
};

// Optionaler Filter mit festen Werten; die Fehlermeldung nennt die erlaubten Werte
export function auswahlFilter<const T extends readonly [string, ...string[]]>(
  werte: T,
  description: string,
) {
  return z
    .enum(werte, { error: `erlaubt: ${werte.join(', ')}` })
    .optional()
    .meta({ description });
}
