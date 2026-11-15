// Ein Artikel mit Stammdaten und Bestand je Lagerort
export type Article = {
  articleNumber: string;
  name: string;
  breweryNumber: string;
  style: string;
  abv: number;
  // Abgabepreis je Flasche in Cent
  priceCent: number;
  stock: { location: string; bottles: number }[];
  // Letzte Inventur, UTC
  updatedAt: string;
  // Letzte Änderung der Stammdaten, UTC
  changedAt: string;
};

// Feste Daten: BR-1001 bis BR-1004 für die vier Biere der Beispieldaten,
// BR-1005 bis BR-1007 je ein Bier der Brauereien BRA-05 bis BRA-07
export const ARTICLES: Article[] = [
  {
    articleNumber: 'BR-1001',
    name: 'Nattheimer Spezial 0,5 l',
    breweryNumber: 'BRA-01',
    style: 'Spezial',
    abv: 5.4,
    priceCent: 139,
    stock: [
      { location: 'Hauptlager', bottles: 200 },
      { location: 'Kühlhaus', bottles: 40 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1002',
    name: 'Wildbräu Grafing Helles 0,5 l',
    breweryNumber: 'BRA-02',
    style: 'Helles',
    abv: 5.0,
    priceCent: 119,
    stock: [
      { location: 'Hauptlager', bottles: 96 },
      { location: 'Kühlhaus', bottles: 0 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1003',
    name: 'Augustiner Lagerbier Hell 0,5 l',
    breweryNumber: 'BRA-03',
    style: 'Helles',
    abv: 5.2,
    priceCent: 109,
    stock: [
      { location: 'Hauptlager', bottles: 0 },
      { location: 'Kühlhaus', bottles: 0 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1004',
    name: 'Farny Kristall-Weizen 0,5 l',
    breweryNumber: 'BRA-04',
    style: 'Weizen',
    abv: 5.3,
    priceCent: 129,
    stock: [
      { location: 'Hauptlager', bottles: 120 },
      { location: 'Kühlhaus', bottles: 24 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1005',
    name: 'Härle Bio Lager Hell 0,5 l',
    breweryNumber: 'BRA-05',
    style: 'Helles',
    abv: 4.7,
    priceCent: 129,
    stock: [
      { location: 'Hauptlager', bottles: 60 },
      { location: 'Kühlhaus', bottles: 12 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1006',
    name: 'Zötler Korbinian Dunkel 0,5 l',
    breweryNumber: 'BRA-06',
    style: 'Dunkel',
    abv: 5.2,
    priceCent: 119,
    stock: [
      { location: 'Hauptlager', bottles: 48 },
      { location: 'Kühlhaus', bottles: 0 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
  {
    articleNumber: 'BR-1007',
    name: 'Rapp Weiße 0,5 l',
    breweryNumber: 'BRA-07',
    style: 'Weizen',
    abv: 5.5,
    priceCent: 99,
    stock: [
      { location: 'Hauptlager', bottles: 80 },
      { location: 'Kühlhaus', bottles: 0 },
    ],
    updatedAt: '2026-11-15T13:03:00Z',
    changedAt: '2026-11-15T13:03:00Z',
  },
];
