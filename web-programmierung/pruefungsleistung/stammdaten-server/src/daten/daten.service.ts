import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Liste } from '../liste';

// Ressourcen mit ihrem Schlüsselfeld und dem Präfix ihrer Fehlercodes
export const RESSOURCEN = {
  personen: { schluessel: 'personal_nr', code: 'PERSON', name: 'Person' },
  abteilungen: {
    schluessel: 'abteilung_nr',
    code: 'ABTEILUNG',
    name: 'Abteilung',
  },
  standorte: { schluessel: 'standort_nr', code: 'STANDORT', name: 'Standort' },
  raeume: { schluessel: 'raum_nr', code: 'RAUM', name: 'Raum' },
  inventar: { schluessel: 'inventar_nr', code: 'INVENTAR', name: 'Inventar' },
  artikel: { schluessel: 'artikel_nr', code: 'ARTIKEL', name: 'Artikel' },
  feiertage: { schluessel: 'datum', code: 'FEIERTAG', name: 'Feiertag' },
} as const;

export type Ressource = keyof typeof RESSOURCEN;
export type Stand = 1 | 2;

export const STAND_BESCHREIBUNG: Record<Stand, string> = {
  1: 'Auslieferungszustand',
  2: 'nach den Änderungen vom 01.12.2026',
};

type Eintrag = Record<string, unknown>;
type Datenstand = {
  eintraege: Record<Ressource, Eintrag[]>;
  geloescht: Partial<Record<Ressource, string[]>>;
};

// Filter einer Liste: Felder mit festem Wert, Änderungen seit, Jahr (Feiertage)
export type Filter = {
  felder?: Record<string, string | number | undefined>;
  geaendertSeit?: string;
  jahr?: number;
};

// Ordner daten/ im Projekt, auch beim Start aus dist/
const DATEN = join(__dirname, '..', '..', 'daten');

@Injectable()
export class DatenService {
  private readonly staende: Record<Stand, Datenstand> = {
    1: ladeStand(1),
    2: ladeStand(2),
  };
  private stand: Stand;

  constructor(config: ConfigService) {
    this.stand = config.get('STAMMDATEN_STAND', '1') === '2' ? 2 : 1;
  }

  getStand(): Stand {
    return this.stand;
  }

  setStand(stand: Stand) {
    this.stand = stand;
  }

  liste<T>(
    ressource: Ressource,
    filter: Filter,
    seite: number,
    proSeite: number,
  ): Liste<T> {
    const treffer = this.staende[this.stand].eintraege[ressource].filter(
      (e) =>
        Object.entries(filter.felder ?? {}).every(
          ([feld, wert]) => wert === undefined || e[feld] === wert,
        ) &&
        (!filter.geaendertSeit ||
          Date.parse(e.geaendert_am as string) >
            Date.parse(filter.geaendertSeit)) &&
        (!filter.jahr || (e.datum as string).startsWith(`${filter.jahr}-`)),
    );
    return {
      daten: treffer.slice((seite - 1) * proSeite, seite * proSeite) as T[],
      seite,
      pro_seite: proSeite,
      gesamt: treffer.length,
      seiten_gesamt: Math.ceil(treffer.length / proSeite),
    };
  }

  // Ein Eintrag; 410, wenn er im aktuellen Stand gelöscht ist, sonst 404
  eins<T>(ressource: Ressource, nummer: string): T {
    const { schluessel, code, name } = RESSOURCEN[ressource];
    const daten = this.staende[this.stand];
    const eintrag = daten.eintraege[ressource].find(
      (e) => e[schluessel] === nummer,
    );
    if (eintrag) {
      return eintrag as T;
    }
    if (daten.geloescht[ressource]?.includes(nummer)) {
      throw new GoneException({
        fehler: `${name} ${nummer} wurde gelöscht`,
        code: `${code}_410`,
      });
    }
    throw new NotFoundException({
      fehler: `${name} ${nummer} unbekannt`,
      code: `${code}_404`,
    });
  }
}

function ladeStand(stand: Stand): Datenstand {
  const lesen = <T>(datei: string) =>
    JSON.parse(
      readFileSync(join(DATEN, `stand-${stand}`, `${datei}.json`), 'utf8'),
    ) as T;
  const eintraege = Object.fromEntries(
    Object.keys(RESSOURCEN).map((r) => [r, lesen<Eintrag[]>(r)]),
  ) as Record<Ressource, Eintrag[]>;
  return { eintraege, geloescht: lesen('geloescht') };
}
