import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beer } from '../beers/beer.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './rating.entity';
import { RatingsGateway } from './ratings.gateway';

// Ein Bier im Ranking, im Format von GET /beers
export type RankedBeer = Beer & { averageRating: number };

// R5: Durchschnitt auf eine Nachkommastelle; ohne Bewertung null
function roundedAverage(scores: number[]): number | null {
  if (scores.length === 0) {
    return null;
  }
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  // Math.round liefert eine Zahl; toFixed lieferte einen String
  return Math.round(average * 10) / 10;
}

@Injectable()
export class RatingsService {
  // Daten in beer.db: Bewertungen überstehen einen Neustart
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
    // Das Gateway injiziert den Service: forwardRef auf beiden Seiten
    @Inject(forwardRef(() => RatingsGateway))
    private readonly ratingsGateway: RatingsGateway,
    private readonly eventEmitter: EventEmitter2,
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
  async create(
    beerId: number,
    userId: number,
    dto: CreateRatingDto,
  ): Promise<Rating> {
    // R4: Eine vorhandene Bewertung desselben Users fällt weg
    await this.ratingsRepository.delete({ beerId, userId });
    const rating = await this.ratingsRepository.save({
      beerId,
      userId,
      ...dto,
      createdAt: new Date().toISOString(),
    });
    // Meldet die Bewertung; wer darauf reagiert, weiß der Service nicht
    const event = { beerId, score: dto.score };
    this.eventEmitter.emit('rating.created', event);
    // Story 15: neues Ranking an alle verbundenen Clients, nur nach einer Bewertung
    this.ratingsGateway.server.emit('ranking', await this.ranking());
    return rating;
  }

  // R5: Die Durchschnittsbewertung wird auf eine Nachkommastelle gerundet.
  // Normal: 4, 4 und 5 → 4.3
  // Grenze: keine Bewertung → null, nicht 0
  // Grenze: eine Bewertung 5 → 5
  async averageFor(beerId: number): Promise<number | null> {
    const ratings = await this.findByBeer(beerId);
    return roundedAverage(ratings.map((rating) => rating.score));
  }

  // Story 15: die fünf Biere mit dem höchsten averageRating.
  // Normal: Bier 1 mit 5, Bier 3 mit 4 → [Bier 1, Bier 3]
  // Grenze: Biere ohne Bewertung fehlen; keine Bewertung → []
  // Grenze: gleicher Durchschnitt → kleinere id zuerst, wie GET /beers
  async ranking(): Promise<RankedBeer[]> {
    // Bewertungen mit ihrem Bier über die Relation; kein Import von BeersModule
    const ratings = await this.ratingsRepository.find({
      relations: { beer: true },
    });
    const byBeer = new Map<number, { beer: Beer; scores: number[] }>();
    for (const rating of ratings) {
      const entry = byBeer.get(rating.beerId) ?? {
        beer: rating.beer,
        scores: [],
      };
      entry.scores.push(rating.score);
      byBeer.set(rating.beerId, entry);
    }
    return [...byBeer.values()]
      .map(({ beer, scores }) => ({
        ...beer,
        // Jedes Bier hier hat mindestens eine Bewertung: nie null
        averageRating: roundedAverage(scores) as number,
      }))
      .sort((a, b) => b.averageRating - a.averageRating || a.id - b.id)
      .slice(0, 5);
  }
}
