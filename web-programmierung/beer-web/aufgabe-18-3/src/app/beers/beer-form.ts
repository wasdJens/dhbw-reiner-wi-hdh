import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Brewery } from '../breweries/brewery';
import { BEER_STYLES, BeerInput, STYLE_NAMES } from './beer';

@Component({
  selector: 'app-beer-form',
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="save.emit(value)">
      <label>Name <input name="name" [(ngModel)]="value.name" required /></label>
      <label>
        Brauerei
        <select name="breweryId" [(ngModel)]="value.breweryId" required>
          @for (brewery of breweries(); track brewery.id) {
            <option [ngValue]="brewery.id">{{ brewery.name }}</option>
          }
        </select>
      </label>
      <label>
        Stil
        <select name="style" [(ngModel)]="value.style" required>
          @for (style of styles; track style) {
            <option [ngValue]="style">{{ styleNames[style] }}</option>
          }
        </select>
      </label>
      <label>
        Alkohol in %
        <input name="abv" type="number" step="0.1" [(ngModel)]="value.abv" required />
      </label>
      <label>
        Beschreibung
        <textarea name="description" rows="3" [(ngModel)]="value.description"></textarea>
      </label>
      @if (error()) {
        <p class="form-error">{{ error() }}</p>
      }
      <button type="submit" [disabled]="form.invalid">Speichern</button>
    </form>
  `,
})
export class BeerForm implements OnInit {
  readonly initial = input.required<BeerInput>();
  readonly breweries = input.required<Brewery[]>();
  readonly error = input<string | null>(null);
  readonly save = output<BeerInput>();

  protected readonly styles = BEER_STYLES;
  protected readonly styleNames = STYLE_NAMES;
  protected value!: BeerInput;

  ngOnInit(): void {
    this.value = { ...this.initial() };
  }
}
