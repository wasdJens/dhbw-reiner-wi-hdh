import { Component, OnInit, inject, signal } from '@angular/core';
import { MyRatingList } from './my-rating-list';
import { MyRating } from './rating';
import { RatingsApi } from './ratings.api';

@Component({
  selector: 'app-my-ratings-page',
  imports: [MyRatingList],
  template: `
    <h1>Meine Bewertungen</h1>
    <app-my-rating-list [ratings]="ratings()" />
  `,
})
export class MyRatingsPage implements OnInit {
  private readonly api = inject(RatingsApi);
  protected readonly ratings = signal<MyRating[]>([]);

  ngOnInit(): void {
    this.api.findMine().subscribe((ratings) => this.ratings.set(ratings));
  }
}
