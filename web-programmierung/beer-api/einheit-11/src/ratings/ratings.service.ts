import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';

export interface Rating {
  id: number;
  beerId: number;
  userId: number;
  score: number;
  comment?: string;
  createdAt: string;
}

@Injectable()
export class RatingsService {
  // Daten im Arbeitsspeicher: Nach einem Neustart gibt es keine Bewertungen
  private readonly ratings: Rating[] = [];
  private nextId = 1;

  findByBeer(beerId: number): Rating[] {
    return this.ratings.filter((rating) => rating.beerId === beerId);
  }

  // R3: score ist eine ganze Zahl von 1 bis 5 (Schema, CreateRatingDto)
  // Grenze: score 1 und 5 → 201
  // Fehler: score 0, 6 oder 3.5 → 400
  // R4: Ein User bewertet ein Bier höchstens einmal; eine zweite ersetzt die erste.
  // Normal: User 1 bewertet Bier 1 → 201, eine Bewertung
  // Grenze: User 1 bewertet Bier 1 noch einmal → 201, weiter eine Bewertung
  // Normal: User 1 bewertet Bier 2 → 201, zählt für Bier 2 extra
  // Fehler: Bier 42 → 404 (BeersService prüft, bevor create läuft)
  create(beerId: number, dto: CreateRatingDto): Rating {
    const rating: Rating = {
      id: this.nextId++,
      beerId,
      ...dto,
      createdAt: new Date().toISOString(),
    };
    // R4: Eine vorhandene Bewertung desselben Users fällt weg
    const index = this.ratings.findIndex(
      (r) => r.beerId === beerId && r.userId === dto.userId,
    );
    if (index !== -1) {
      this.ratings.splice(index, 1);
    }
    this.ratings.push(rating);
    return rating;
  }

  // R5: Die Durchschnittsbewertung wird auf eine Nachkommastelle gerundet.
  // Normal: 4, 4 und 5 → 4.3
  // Grenze: keine Bewertung → null, nicht 0
  // Grenze: eine Bewertung 5 → 5
  averageFor(beerId: number): number | null {
    const scores = this.findByBeer(beerId).map((rating) => rating.score);
    if (scores.length === 0) {
      return null;
    }
    const average =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;
    // Math.round liefert eine Zahl; toFixed lieferte einen String
    return Math.round(average * 10) / 10;
  }
}
