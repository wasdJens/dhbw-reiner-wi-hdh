import { Component, OnInit, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { Beer } from './beer';
import { BeerList } from './beer-list';
import { BeersApi } from './beers.api';

@Component({
  selector: 'app-top-beers-page',
  imports: [BeerList],
  template: `
    <h1>Die besten Biere</h1>
    @if (beers().length > 0) {
      <app-beer-list [beers]="beers()" />
    } @else {
      <p>Noch kein Bier ist bewertet.</p>
    }
  `,
})
export class TopBeersPage implements OnInit {
  private readonly api = inject(BeersApi);
  protected readonly beers = signal<Beer[]>([]);

  ngOnInit(): void {
    // Sortieren tut der Server; Biere ohne Bewertung stehen am Ende und fallen weg
    this.api
      .findAll({ sort: 'averageRating', order: 'desc' })
      .pipe(map((beers) => beers.filter((beer) => beer.averageRating !== undefined).slice(0, 3)))
      .subscribe((beers) => this.beers.set(beers));
  }
}
