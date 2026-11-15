import { Routes } from '@angular/router';
import { LoginPage } from './auth/login.page';
import { RegisterPage } from './auth/register.page';
import { BeerDetailPage } from './beers/beer-detail.page';
import { BeerEditPage } from './beers/beer-edit.page';
import { BeersPage } from './beers/beers.page';
import { BreweriesPage } from './breweries/breweries.page';
import { BreweryDetailPage } from './breweries/brewery-detail.page';
import { BreweryEditPage } from './breweries/brewery-edit.page';
import { adminGuard } from './core/admin.guard';
import { MyRatingsPage } from './ratings/my-ratings.page';

export const routes: Routes = [
  { path: '', redirectTo: 'beers', pathMatch: 'full' },
  { path: 'beers', component: BeersPage },
  { path: 'beers/:id', component: BeerDetailPage },
  { path: 'breweries', component: BreweriesPage },
  { path: 'breweries/:id', component: BreweryDetailPage },
  { path: 'my-ratings', component: MyRatingsPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'breweries/new', component: BreweryEditPage },
      { path: 'breweries/:id/edit', component: BreweryEditPage },
      { path: 'beers/new', component: BeerEditPage },
      { path: 'beers/:id/edit', component: BeerEditPage },
    ],
  },
  { path: '**', redirectTo: 'beers' },
];
