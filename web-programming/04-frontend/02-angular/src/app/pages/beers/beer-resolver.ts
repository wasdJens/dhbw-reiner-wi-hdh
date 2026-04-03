import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const beerResolver: ResolveFn<unknown> = (route: ActivatedRouteSnapshot) => {
  const beerId = route.paramMap.get('beerId');
  const beer = { name: 'Nattheimer', id: beerId };
  return beer;
};
