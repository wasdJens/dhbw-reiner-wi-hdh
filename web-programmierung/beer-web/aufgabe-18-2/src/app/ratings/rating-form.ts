import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingInput } from './rating';

@Component({
  selector: 'app-rating-form',
  imports: [FormsModule],
  template: `
    <form #form="ngForm" class="rating-form" (ngSubmit)="rate.emit({ score, comment })">
      <h2>Bewerten</h2>
      <fieldset>
        <legend>Sterne</legend>
        @for (value of scores; track value) {
          <label class="inline">
            <input type="radio" name="score" [value]="value" [(ngModel)]="score" required />
            {{ value }}
          </label>
        }
      </fieldset>
      <label>Kommentar <textarea name="comment" rows="3" [(ngModel)]="comment"></textarea></label>
      @if (error()) {
        <p class="form-error">{{ error() }}</p>
      }
      <button type="submit" [disabled]="form.invalid">Bewerten</button>
    </form>
  `,
})
export class RatingForm {
  readonly error = input<string | null>(null);
  // Die Darstellung meldet nur den Klick; senden tut der Container
  readonly rate = output<RatingInput>();

  protected readonly scores = [1, 2, 3, 4, 5];
  protected score = 0;
  protected comment = '';
}
