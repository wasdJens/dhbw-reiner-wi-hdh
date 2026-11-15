import { Component, OnInit, inject, signal } from '@angular/core';
import { MessageService } from '../core/message.service';
import { MyRatingList } from './my-rating-list';
import { MyRating } from './rating';
import { RatingsApi } from './ratings.api';

@Component({
  selector: 'app-my-ratings-page',
  imports: [MyRatingList],
  template: `
    <h1>Meine Bewertungen</h1>
    <app-my-rating-list [ratings]="ratings()" (remove)="remove($event)" />
  `,
})
export class MyRatingsPage implements OnInit {
  private readonly api = inject(RatingsApi);
  private readonly messages = inject(MessageService);
  protected readonly ratings = signal<MyRating[]>([]);

  ngOnInit(): void {
    this.load();
  }

  protected remove(rating: MyRating): void {
    if (!confirm(`Bewertung von ${rating.beerName} löschen?`)) {
      return;
    }
    this.api.removeMine(rating.beerId).subscribe(() => {
      this.messages.success('Bewertung gelöscht.');
      this.load();
    });
  }

  private load(): void {
    this.api.findMine().subscribe((ratings) => this.ratings.set(ratings));
  }
}
