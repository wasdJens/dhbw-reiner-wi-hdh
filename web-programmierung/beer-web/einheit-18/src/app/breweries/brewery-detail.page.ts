import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Beer } from '../beers/beer';
import { BeerList } from '../beers/beer-list';
import { BeersApi } from '../beers/beers.api';
import { MessageService } from '../core/message.service';
import { BreweriesApi } from './breweries.api';
import { Brewery } from './brewery';

@Component({
  selector: 'app-brewery-detail-page',
  imports: [BeerList, RouterLink],
  template: `
    @if (brewery(); as brewery) {
      <h1>{{ brewery.name }}</h1>
      <p>{{ brewery.location }}</p>
      @if (auth.isAdmin()) {
        <p class="actions">
          <a [routerLink]="['/admin/breweries', brewery.id, 'edit']" class="button">Bearbeiten</a>
          <button type="button" class="danger" (click)="remove(brewery)">Löschen</button>
          <a routerLink="/admin/beers/new" [queryParams]="{ breweryId: brewery.id }" class="button">
            Neues Bier
          </a>
        </p>
      }
      <h2>Biere</h2>
      <app-beer-list [beers]="beers()" />
    }
  `,
})
export class BreweryDetailPage implements OnInit {
  private readonly breweriesApi = inject(BreweriesApi);
  private readonly beersApi = inject(BeersApi);
  private readonly messages = inject(MessageService);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  readonly id = input.required({ transform: numberAttribute });
  protected readonly brewery = signal<Brewery | null>(null);
  protected readonly beers = signal<Beer[]>([]);

  ngOnInit(): void {
    this.breweriesApi.findOne(this.id()).subscribe((brewery) => this.brewery.set(brewery));
    this.beersApi.findByBrewery(this.id()).subscribe((beers) => this.beers.set(beers));
  }

  protected remove(brewery: Brewery): void {
    if (!confirm(`${brewery.name} löschen?`)) {
      return;
    }
    this.breweriesApi.remove(brewery.id).subscribe({
      next: () =>
        void this.router
          .navigateByUrl('/breweries')
          .then(() => this.messages.success('Brauerei gelöscht.')),
      // R2: Eine Brauerei mit Bieren bleibt
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.messages.error('Die Brauerei hat noch Biere.');
        }
      },
    });
  }
}
