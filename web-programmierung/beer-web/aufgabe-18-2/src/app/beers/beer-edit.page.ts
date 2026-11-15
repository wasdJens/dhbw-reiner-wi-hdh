import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreweriesApi } from '../breweries/breweries.api';
import { Brewery } from '../breweries/brewery';
import { MessageService } from '../core/message.service';
import { Beer, BeerInput } from './beer';
import { BeerForm } from './beer-form';
import { BeersApi } from './beers.api';

// Neues Bier ohne id, Bier bearbeiten mit id aus der Route
@Component({
  selector: 'app-beer-edit-page',
  imports: [BeerForm],
  template: `
    <h1>{{ id() ? 'Bier bearbeiten' : 'Neues Bier' }}</h1>
    @if (initial(); as initial) {
      <app-beer-form
        [initial]="initial"
        [breweries]="breweries()"
        [error]="error()"
        (save)="save($event)"
      />
    }
  `,
})
export class BeerEditPage implements OnInit {
  private readonly beersApi = inject(BeersApi);
  private readonly breweriesApi = inject(BreweriesApi);
  private readonly messages = inject(MessageService);
  private readonly router = inject(Router);

  readonly id = input(undefined, { transform: (value?: string) => numberAttribute(value, 0) });
  // ?breweryId=… aus der Detailseite einer Brauerei wählt sie vor
  readonly breweryId = input(undefined, {
    transform: (value?: string) => numberAttribute(value, 0),
  });
  protected readonly initial = signal<BeerInput | null>(null);
  protected readonly breweries = signal<Brewery[]>([]);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.id();
    this.breweriesApi.findAll().subscribe((breweries) => {
      this.breweries.set(breweries);
      if (!id) {
        this.initial.set({
          name: '',
          style: 'helles',
          abv: 5,
          breweryId: this.breweryId() || breweries[0].id,
          description: '',
        });
      }
    });
    if (id) {
      this.beersApi
        .findOne(id)
        .subscribe((beer) => this.initial.set({ ...beer, description: beer.description ?? '' }));
    }
  }

  protected save(input: BeerInput): void {
    this.error.set(null);
    const id = this.id();
    const request = id ? this.beersApi.update(id, input) : this.beersApi.create(input);
    request.subscribe({
      next: (beer: Beer) =>
        void this.router
          .navigate(['/beers', beer.id])
          .then(() => this.messages.success('Bier gespeichert.')),
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.error.set('Bitte prüfe deine Eingaben.');
        }
      },
    });
  }
}
