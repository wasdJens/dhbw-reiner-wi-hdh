// Client-Modell: Bewertung mit Datum als Date
export interface Rating {
  id: number;
  beerId: number;
  userId: number;
  score: number;
  comment?: string;
  createdAt: Date;
}

// Client-Modell: eigene Bewertung mit dem Namen des Biers
export interface MyRating {
  beerId: number;
  beerName: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

// Eingaben des Formulars Bewerten
export interface RatingInput {
  score: number;
  comment: string;
}
