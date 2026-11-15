// Eine Brauerei; gesperrt: liefert derzeit nicht über das ERP
export type Brewery = {
  breweryNumber: string;
  name: string;
  city: string;
  status: 'aktiv' | 'gesperrt';
  // Letzte Änderung der Stammdaten, UTC
  changedAt: string;
};

// Feste Daten: BRA-01 bis BRA-04 wie die Beispieldaten der Beer API
export const BREWERIES: Brewery[] = [
  {
    breweryNumber: 'BRA-01',
    name: 'Privatbrauerei Schlumberger',
    city: 'Nattheim',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-02',
    name: 'Wildbräu Grafing',
    city: 'Grafing bei München',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-03',
    name: 'Augustiner-Bräu',
    city: 'München',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-04',
    name: 'Edelweissbrauerei Farny',
    city: 'Kißlegg',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-05',
    name: 'Brauerei Clemens Härle',
    city: 'Leutkirch im Allgäu',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-06',
    name: 'Privat-Brauerei Zötler',
    city: 'Rettenberg',
    status: 'aktiv',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    breweryNumber: 'BRA-07',
    name: 'Brauerei Rapp',
    city: 'Kutzenhausen',
    status: 'gesperrt',
    changedAt: '2026-11-15T13:03:00Z',
  },
];
