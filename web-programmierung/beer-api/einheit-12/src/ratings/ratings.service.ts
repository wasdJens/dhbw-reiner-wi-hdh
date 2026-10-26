import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './rating.entity';

@Injectable()
export class RatingsService {
  // Daten in beer.db: Bewertungen überstehen einen Neustart
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  findByBeer(beerId: number): Promise<Rating[]> {
    return this.ratingsRepository.findBy({ beerId });
  }

  // R3: score ist eine ganze Zahl von 1 bis 5 (Schema, CreateRatingDto)
  // Grenze: score 1 und 5 → 201
  // Fehler: score 0, 6 oder 3.5 → 400
  // R4: Ein User bewertet ein Bier höchstens einmal; eine zweite ersetzt die erste.
  // Normal: User 1 bewertet Bier 1 → 201, eine Bewertung
  // Grenze: User 1 bewertet Bier 1 noch einmal → 201, weiter eine Bewertung
  // Normal: User 1 bewertet Bier 2 → 201, zählt für Bier 2 extra
  // Fehler: Bier 42 → 404 (BeersService prüft, bevor create läuft)
  async create(beerId: number, dto: CreateRatingDto): Promise<Rating> {
    // R4: Eine vorhandene Bewertung desselben Users fällt weg
    await this.ratingsRepository.delete({ beerId, userId: dto.userId });
    return this.ratingsRepository.save({
      beerId,
      ...dto,
      createdAt: new Date().toISOString(),
    });
  }

  // R5: Die Durchschnittsbewertung wird auf eine Nachkommastelle gerundet.
  // Normal: 4, 4 und 5 → 4.3
  // Grenze: keine Bewertung → null, nicht 0
  // Grenze: eine Bewertung 5 → 5
  async averageFor(beerId: number): Promise<number | null> {
    const ratings = await this.findByBeer(beerId);
    const scores = ratings.map((rating) => rating.score);
    if (scores.length === 0) {
      return null;
    }
    const average =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;
    // Math.round liefert eine Zahl; toFixed lieferte einen String
    return Math.round(average * 10) / 10;
  }
}
