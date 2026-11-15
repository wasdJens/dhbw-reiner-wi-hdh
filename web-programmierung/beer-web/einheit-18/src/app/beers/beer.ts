export type BeerStyle = 'helles' | 'pils' | 'spezial' | 'weizen' | 'dunkel';

// Anzeigenamen der Stile in Liste, Filter und Formular
export const STYLE_NAMES: Record<BeerStyle, string> = {
  helles: 'Helles',
  pils: 'Pils',
  spezial: 'Spezial',
  weizen: 'Weizen',
  dunkel: 'Dunkel',
};
export const BEER_STYLES = Object.keys(STYLE_NAMES) as BeerStyle[];

// Client-Modell: Ohne Bewertung fehlt averageRating
export interface Beer {
  id: number;
  name: string;
  style: BeerStyle;
  styleName: string;
  abv: number;
  breweryId: number;
  description?: string;
  averageRating?: number;
}

// Eingaben des Formulars Bier
export interface BeerInput {
  name: string;
  style: BeerStyle;
  abv: number;
  breweryId: number;
  description: string;
}

// Filter und Sortierung der Bierliste
export interface BeerFilter {
  style?: BeerStyle;
  sort?: 'name' | 'abv' | 'averageRating';
  order: 'asc' | 'desc';
}
