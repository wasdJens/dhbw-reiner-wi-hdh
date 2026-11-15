import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Rating } from './rating';

@Component({
  selector: 'app-rating-list',
  imports: [DatePipe],
  template: `
    <ul class="ratings">
      @for (rating of ratings(); track rating.id) {
        <li [class.own]="rating.userId === ownUserId()">
          <span class="stars" [attr.aria-label]="rating.score + ' von 5 Sternen'">
            {{ stars(rating.score) }}
          </span>
          <span class="date">{{ rating.createdAt | date: 'dd.MM.yyyy, HH:mm' }}</span>
          @if (rating.userId === ownUserId()) {
            <strong>Deine Bewertung</strong>
            <button type="button" class="link" (click)="remove.emit(rating)">Löschen</button>
          }
          @if (rating.comment) {
            <p>{{ rating.comment }}</p>
          }
        </li>
      } @empty {
        <li>Noch keine Bewertungen.</li>
      }
    </ul>
  `,
})
export class RatingList {
  readonly ratings = input.required<Rating[]>();
  readonly ownUserId = input<number>();
  // Nur an der eigenen Bewertung; löschen tut der Container
  readonly remove = output<Rating>();

  protected stars(score: number): string {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  }
}
