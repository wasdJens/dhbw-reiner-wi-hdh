import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SecondPage } from './pages/second-page/second-page';
import { Beers } from './pages/beers/beers';
import { BeerDetail } from './pages/beers/beer-detail/beer-detail';
import { beerResolver } from './pages/beers/beer-resolver';
import { BeersServer } from './pages/beers-server/beers-server';
import { beersResolver } from './pages/beers-server/beers-resolver';
import { BeersCreate } from './pages/beers-create/beers-create';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'second-page',
    component: SecondPage,
  },
  {
    path: 'beers',
    component: Beers,
    children: [
      {
        path: ':beerId',
        component: BeerDetail,
        resolve: {
          beer: beerResolver,
        },
      },
    ],
  },
  {
    path: 'beers-server',
    component: BeersServer,
    resolve: {
      beers: beersResolver,
    },
  },
  {
    path: 'beers-create',
    component: BeersCreate,
  },
];
