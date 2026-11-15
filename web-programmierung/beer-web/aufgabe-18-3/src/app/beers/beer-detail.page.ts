import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BreweriesApi } from '../breweries/breweries.api';
import { Brewery } from '../breweries/brewery';
import { MessageService } from '../core/message.service';
import { Rating, RatingInput } from '../ratings/rating';
import { RatingForm } from '../ratings/rating-form';
import { RatingList } from '../ratings/rating-list';
import { RatingsApi } from '../ratings/ratings.api';
import { Beer } from './beer';
import { BeerInfo } from './beer-info';
import { BeersApi } from './beers.api';

@Component({
  selector: 'app-beer-detail-page',
  imports: [BeerInfo, RatingForm, RatingList, RouterLink],
  template: `
    @if (beer(); as beer) {
      <app-beer-info [beer]="beer" [brewery]="brewery()" />
      @if (auth.isAdmin()) {
        <p class="actions">
          <a [routerLink]="['/admin/beers', beer.id, 'edit']" class="button">Bearbeiten</a>
          <button type="button" class="danger" (click)="remove(beer)">Löschen</button>
        </p>
      }
      <h2>Bewertungen</h2>
      <app-rating-list
        [ratings]="ratings()"
        [ownUserId]="auth.user()?.id"
        (remove)="removeRating(beer)"
      />
      @if (auth.user()) {
        <app-rating-form [error]="ratingError()" (rate)="rate(beer.id, $event)" />
      } @else {
        <p><a routerLink="/login">Melde dich an</a>, um das Bier zu bewerten.</p>
      }
    }
  `,
})
export class BeerDetailPage implements OnInit {
  private readonly beersApi = inject(BeersApi);
  private readonly breweriesApi = inject(BreweriesApi);
  private readonly ratingsApi = inject(RatingsApi);
  private readonly messages = inject(MessageService);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  readonly id = input.required({ transform: numberAttribute });
  protected readonly beer = signal<Beer | null>(null);
  protected readonly brewery = signal<Brewery | null>(null);
  protected readonly ratings = signal<Rating[]>([]);
  protected readonly ratingError = signal<string | null>(null);

  ngOnInit(): void {
    this.loadBeer();
    this.loadRatings();
  }

  protected rate(beerId: number, input: RatingInput): void {
    this.ratingError.set(null);
    this.ratingsApi.create(beerId, input).subscribe({
      // Durchschnitt und Liste neu laden: Der Server rechnet (R4, R5)
      next: () => {
        this.loadBeer();
        this.loadRatings();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.ratingError.set('Bitte prüfe deine Eingaben.');
        }
      },
    });
  }

  protected removeRating(beer: Beer): void {
    if (!confirm(`Deine Bewertung von ${beer.name} löschen?`)) {
      return;
    }
    this.ratingsApi.removeMine(beer.id).subscribe(() => {
      this.messages.success('Bewertung gelöscht.');
      // Durchschnitt und Liste neu laden wie nach dem Bewerten
      this.loadBeer();
      this.loadRatings();
    });
  }

  protected remove(beer: Beer): void {
    if (!confirm(`${beer.name} löschen?`)) {
      return;
    }
    this.beersApi
      .remove(beer.id)
      .subscribe(() =>
        this.router.navigateByUrl('/beers').then(() => this.messages.success('Bier gelöscht.')),
      );
  }

  private loadBeer(): void {
    this.beersApi.findOne(this.id()).subscribe((beer) => {
      this.beer.set(beer);
      if (this.brewery()?.id !== beer.breweryId) {
        this.breweriesApi.findOne(beer.breweryId).subscribe((brewery) => this.brewery.set(brewery));
      }
    });
  }

  private loadRatings(): void {
    this.ratingsApi.findByBeer(this.id()).subscribe((ratings) => this.ratings.set(ratings));
  }
}
