import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Beer, BeerFilter } from './beer';
import { BeerFilterForm } from './beer-filter';
import { BeerList } from './beer-list';
import { BeersApi } from './beers.api';

@Component({
  selector: 'app-beers-page',
  imports: [BeerFilterForm, BeerList, RouterLink],
  template: `
    <h1>Biere</h1>
    @if (auth.isAdmin()) {
      <p class="actions"><a routerLink="/admin/beers/new" class="button">Neues Bier</a></p>
    }
    <app-beer-filter [filter]="filter()" (filterChange)="changeFilter($event)" />
    <app-beer-list [beers]="beers()" />
  `,
})
export class BeersPage implements OnInit {
  private readonly api = inject(BeersApi);
  protected readonly auth = inject(AuthService);
  protected readonly filter = signal<BeerFilter>({ order: 'asc' });
  protected readonly beers = signal<Beer[]>([]);

  ngOnInit(): void {
    this.load();
  }

  protected changeFilter(filter: BeerFilter): void {
    this.filter.set(filter);
    this.load();
  }

  private load(): void {
    this.api.findAll(this.filter()).subscribe((beers) => this.beers.set(beers));
  }
}
