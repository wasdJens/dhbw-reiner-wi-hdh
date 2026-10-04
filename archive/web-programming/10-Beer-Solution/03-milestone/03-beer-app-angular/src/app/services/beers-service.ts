import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BeerCreateDto, BeerResponseDto, UpdateBeerDto } from '../definitions/beer-api.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1/beers';

  getAllBeers() {
    const beers = this.http.get<BeerResponseDto[]>(this.apiUrl);
    return beers;
  }

  getBeerById(id: number) {
    const beer = this.http.get<BeerResponseDto>(`${this.apiUrl}/${id}`);
    return beer;
  }

  async createBeer(payload: BeerCreateDto) {
    const createdBeer = await firstValueFrom(this.http.post<BeerResponseDto>(this.apiUrl, payload));
    return createdBeer;
  }

  async updateBeer(id: number, payload: UpdateBeerDto) {
    const updatedBeer = await firstValueFrom(
      this.http.patch<BeerResponseDto>(`${this.apiUrl}/${id}`, payload)
    );
    return updatedBeer;
  }

  async deleteBeer(id: number) {
    await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
