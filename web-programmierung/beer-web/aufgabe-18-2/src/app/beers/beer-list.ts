import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Beer } from './beer';

@Component({
  selector: 'app-beer-list',
  imports: [DecimalPipe, RouterLink],
  template: `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stil</th>
          <th>Alkohol</th>
          <th>Durchschnitt</th>
        </tr>
      </thead>
      <tbody>
        @for (beer of beers(); track beer.id) {
          <tr>
            <td>
              <a [routerLink]="['/beers', beer.id]">{{ beer.name }}</a>
            </td>
            <td>{{ beer.styleName }}</td>
            <td>{{ beer.abv | number: '1.1-1' }} %</td>
            <td>
              @if (beer.averageRating !== undefined) {
                {{ beer.averageRating | number: '1.1-1' }}
              } @else {
                noch keine Bewertung
              }
            </td>
          </tr>
        } @empty {
          <tr>
            <td colspan="4">Keine Biere gefunden.</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class BeerList {
  readonly beers = input.required<Beer[]>();
}
