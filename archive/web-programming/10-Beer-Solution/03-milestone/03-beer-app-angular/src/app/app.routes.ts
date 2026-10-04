import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { BeersPage } from './pages/beers-page/beers-page';
import { BeerDetailPage } from './pages/beer-detail-page/beer-detail-page';
import { BeerCreatePage } from './pages/beer-create-page/beer-create-page';
import { beerResolver, beersResolver } from './resolvers/beers.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'beers',
    component: BeersPage,
    resolve: {
      beers: beersResolver,
    },
  },
  {
    path: 'beers/create',
    component: BeerCreatePage,
  },
  {
    path: 'beers/:id',
    component: BeerDetailPage,
    resolve: {
      beer: beerResolver,
    },
  },
];
