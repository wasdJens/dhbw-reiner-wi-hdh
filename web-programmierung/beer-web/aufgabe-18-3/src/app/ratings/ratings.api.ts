import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { components } from '../api/schema';
import { API_URL } from '../api-url';
import { toCreateRatingDto, toMyRating, toRating } from './rating.mapper';
import { MyRating, Rating, RatingInput } from './rating';

// Typen der Server-DTOs aus der OpenAPI-Beschreibung (npm run api:types)
export type RatingDto = components['schemas']['RatingDto_Output'];
export type CreateRatingDto = components['schemas']['CreateRatingDto'];
export type MyRatingDto = components['schemas']['MyRatingDto_Output'];

@Injectable({ providedIn: 'root' })
export class RatingsApi {
  private readonly http = inject(HttpClient);

  findByBeer(beerId: number): Observable<Rating[]> {
    return this.http
      .get<RatingDto[]>(`${API_URL}/beers/${beerId}/ratings`)
      .pipe(map((dtos) => dtos.map(toRating)));
  }

  // Das Token hängt der authInterceptor an
  create(beerId: number, input: RatingInput): Observable<Rating> {
    return this.http
      .post<RatingDto>(`${API_URL}/beers/${beerId}/ratings`, toCreateRatingDto(input))
      .pipe(map(toRating));
  }

  // Bewertungen des angemeldeten Users; wer das ist, steht im Token
  findMine(): Observable<MyRating[]> {
    return this.http
      .get<MyRatingDto[]>(`${API_URL}/users/me/ratings`)
      .pipe(map((dtos) => dtos.map(toMyRating)));
  }

  // Löscht die eigene Bewertung eines Biers; 404, wenn es keine gibt
  removeMine(beerId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/users/me/ratings/${beerId}`);
  }
}
