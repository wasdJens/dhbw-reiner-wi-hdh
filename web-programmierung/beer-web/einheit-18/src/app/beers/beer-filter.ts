import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BEER_STYLES, BeerFilter, STYLE_NAMES } from './beer';

@Component({
  selector: 'app-beer-filter',
  imports: [FormsModule],
  template: `
    <form class="filter">
      <label>
        Stil
        <select
          name="style"
          [ngModel]="filter().style ?? ''"
          (ngModelChange)="change({ style: $event || undefined })"
        >
          <option value="">alle Stile</option>
          @for (style of styles; track style) {
            <option [value]="style">{{ styleNames[style] }}</option>
          }
        </select>
      </label>
      <label>
        Sortierung
        <select
          name="sort"
          [ngModel]="filter().sort ?? ''"
          (ngModelChange)="change({ sort: $event || undefined })"
        >
          <option value="">keine</option>
          <option value="name">Name</option>
          <option value="abv">Alkohol</option>
          <option value="averageRating">Durchschnitt</option>
        </select>
      </label>
      <label>
        Reihenfolge
        <select name="order" [ngModel]="filter().order" (ngModelChange)="change({ order: $event })">
          <option value="asc">aufsteigend</option>
          <option value="desc">absteigend</option>
        </select>
      </label>
    </form>
  `,
})
export class BeerFilterForm {
  readonly filter = input.required<BeerFilter>();
  readonly filterChange = output<BeerFilter>();

  protected readonly styles = BEER_STYLES;
  protected readonly styleNames = STYLE_NAMES;

  protected change(change: Partial<BeerFilter>): void {
    this.filterChange.emit({ ...this.filter(), ...change });
  }
}
