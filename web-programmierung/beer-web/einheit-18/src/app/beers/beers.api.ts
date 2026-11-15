import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { components } from '../api/schema';
import { API_URL } from '../api-url';
import { toBeer, toBeerDto } from './beer.mapper';
import { Beer, BeerFilter, BeerInput } from './beer';

// Typen der Server-DTOs aus der OpenAPI-Beschreibung (npm run api:types)
export type BeerDto = components['schemas']['BeerDto_Output'];
export type CreateBeerDto = components['schemas']['CreateBeerDto'];

@Injectable({ providedIn: 'root' })
export class BeersApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/beers`;

  // Filter und Sortierung übernimmt der Server (Query-Parameter)
  findAll(filter: BeerFilter): Observable<Beer[]> {
    let params = new HttpParams();
    if (filter.style) {
      params = params.set('style', filter.style);
    }
    if (filter.sort) {
      params = params.set('sort', filter.sort).set('order', filter.order);
    }
    return this.http.get<BeerDto[]>(this.url, { params }).pipe(map((dtos) => dtos.map(toBeer)));
  }

  findByBrewery(breweryId: number): Observable<Beer[]> {
    return this.http
      .get<BeerDto[]>(`${API_URL}/breweries/${breweryId}/beers`)
      .pipe(map((dtos) => dtos.map(toBeer)));
  }

  findOne(id: number): Observable<Beer> {
    return this.http.get<BeerDto>(`${this.url}/${id}`).pipe(map(toBeer));
  }

  create(input: BeerInput): Observable<Beer> {
    return this.http.post<BeerDto>(this.url, toBeerDto(input)).pipe(map(toBeer));
  }

  update(id: number, input: BeerInput): Observable<Beer> {
    return this.http.patch<BeerDto>(`${this.url}/${id}`, toBeerDto(input)).pipe(map(toBeer));
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
