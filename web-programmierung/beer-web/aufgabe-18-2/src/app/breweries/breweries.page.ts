import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BreweriesApi } from './breweries.api';
import { Brewery } from './brewery';
import { BreweryList } from './brewery-list';

@Component({
  selector: 'app-breweries-page',
  imports: [BreweryList, RouterLink],
  template: `
    <h1>Brauereien</h1>
    @if (auth.isAdmin()) {
      <p class="actions"><a routerLink="/admin/breweries/new" class="button">Neue Brauerei</a></p>
    }
    <app-brewery-list [breweries]="breweries()" />
  `,
})
export class BreweriesPage implements OnInit {
  private readonly api = inject(BreweriesApi);
  protected readonly auth = inject(AuthService);
  protected readonly breweries = signal<Brewery[]>([]);

  ngOnInit(): void {
    this.api.findAll().subscribe((breweries) => this.breweries.set(breweries));
  }
}
