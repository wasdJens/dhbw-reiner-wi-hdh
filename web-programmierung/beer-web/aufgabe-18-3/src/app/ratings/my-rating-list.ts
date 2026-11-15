import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyRating } from './rating';

@Component({
  selector: 'app-my-rating-list',
  imports: [DatePipe, RouterLink],
  template: `
    <ul class="ratings">
      @for (rating of ratings(); track rating.beerId) {
        <li>
          <a [routerLink]="['/beers', rating.beerId]">{{ rating.beerName }}</a>
          <span class="stars" [attr.aria-label]="rating.score + ' von 5 Sternen'">
            {{ stars(rating.score) }}
          </span>
          <span class="date">{{ rating.createdAt | date: 'dd.MM.yyyy, HH:mm' }}</span>
          <button type="button" class="link" (click)="remove.emit(rating)">Löschen</button>
          @if (rating.comment) {
            <p>{{ rating.comment }}</p>
          }
        </li>
      } @empty {
        <li>Du hast noch kein Bier bewertet.</li>
      }
    </ul>
  `,
})
export class MyRatingList {
  readonly ratings = input.required<MyRating[]>();
  readonly remove = output<MyRating>();

  protected stars(score: number): string {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  }
}
