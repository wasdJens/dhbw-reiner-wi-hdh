import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BeerResponseDto } from '../definitions/beer-api.interface';
import { inject } from '@angular/core';
import { BeersService } from '../services/beers-service';

export const beersResolver: ResolveFn<BeerResponseDto[]> = () => {
  const beersService = inject(BeersService);
  return beersService.getAllBeers();
};

export const beerResolver: ResolveFn<BeerResponseDto> = (route: ActivatedRouteSnapshot) => {
  const beersService = inject(BeersService);
  const beerRouteId = route.paramMap.get('id');
  const beerId = Number(beerRouteId);
  return beersService.getBeerById(beerId);
};
