import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { components } from '../api/schema';
import { API_URL } from '../api-url';
import { toBrewery, toBreweryDto } from './brewery.mapper';
import { Brewery, BreweryInput } from './brewery';

// Typen der Server-DTOs aus der OpenAPI-Beschreibung (npm run api:types)
export type BreweryDto = components['schemas']['BreweryDto_Output'];
export type CreateBreweryDto = components['schemas']['CreateBreweryDto'];

@Injectable({ providedIn: 'root' })
export class BreweriesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/breweries`;

  findAll(): Observable<Brewery[]> {
    return this.http.get<BreweryDto[]>(this.url).pipe(map((dtos) => dtos.map(toBrewery)));
  }

  findOne(id: number): Observable<Brewery> {
    return this.http.get<BreweryDto>(`${this.url}/${id}`).pipe(map(toBrewery));
  }

  create(input: BreweryInput): Observable<Brewery> {
    return this.http.post<BreweryDto>(this.url, toBreweryDto(input)).pipe(map(toBrewery));
  }

  update(id: number, input: BreweryInput): Observable<Brewery> {
    return this.http
      .patch<BreweryDto>(`${this.url}/${id}`, toBreweryDto(input))
      .pipe(map(toBrewery));
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
