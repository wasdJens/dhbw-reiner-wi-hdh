import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const beersResolver: ResolveFn<Array<{ name: string }>> = async (
  route: ActivatedRouteSnapshot
) => {
  const http = inject(HttpClient);
  const response = http.get<Array<{ name: string }>>('http://localhost:3000/v2/beers');
  const beers = await firstValueFrom(response);
  return beers;
};
