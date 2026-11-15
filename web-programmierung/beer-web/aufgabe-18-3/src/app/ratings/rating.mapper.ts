import { CreateRatingDto, MyRatingDto, RatingDto } from './ratings.api';
import { MyRating, Rating, RatingInput } from './rating';

// Server-DTO → Client-Modell: createdAt als Date, kein Kommentar als fehlendes Feld
export function toRating(dto: RatingDto): Rating {
  return {
    id: dto.id,
    beerId: dto.beerId,
    userId: dto.userId,
    score: dto.score,
    comment: dto.comment ?? undefined,
    createdAt: new Date(dto.createdAt),
  };
}

// Eigene Bewertung: dieselben Regeln wie bei toRating
export function toMyRating(dto: MyRatingDto): MyRating {
  return {
    beerId: dto.beerId,
    beerName: dto.beerName,
    score: dto.score,
    comment: dto.comment ?? undefined,
    createdAt: new Date(dto.createdAt),
  };
}

// Client-Modell → Server-DTO; ein leerer Kommentar entfällt
export function toCreateRatingDto(input: RatingInput): CreateRatingDto {
  const dto: CreateRatingDto = { score: input.score };
  if (input.comment) {
    dto.comment = input.comment;
  }
  return dto;
}
