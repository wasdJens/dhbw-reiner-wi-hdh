import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brewery } from '../breweries/brewery';
import { Beer } from './beer';

@Component({
  selector: 'app-beer-info',
  imports: [DecimalPipe, RouterLink],
  template: `
    <h1>{{ beer().name }}</h1>
    <dl>
      <dt>Brauerei</dt>
      <dd>
        @if (brewery(); as brewery) {
          <a [routerLink]="['/breweries', brewery.id]">{{ brewery.name }}</a> in {{ brewery.city }}
        }
      </dd>
      <dt>Stil</dt>
      <dd>{{ beer().styleName }}</dd>
      <dt>Alkohol</dt>
      <dd>{{ beer().abv | number: '1.1-1' }} %</dd>
      <dt>Durchschnitt</dt>
      <dd>
        @if (beer().averageRating !== undefined) {
          {{ beer().averageRating | number: '1.1-1' }} von 5
        } @else {
          noch keine Bewertung
        }
      </dd>
      @if (beer().description) {
        <dt>Beschreibung</dt>
        <dd>{{ beer().description }}</dd>
      }
    </dl>
  `,
})
export class BeerInfo {
  readonly beer = input.required<Beer>();
  readonly brewery = input<Brewery | null>(null);
}
