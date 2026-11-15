import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brewery } from './brewery';

@Component({
  selector: 'app-brewery-list',
  imports: [RouterLink],
  template: `
    <ul class="cards">
      @for (brewery of breweries(); track brewery.id) {
        <li>
          <a [routerLink]="['/breweries', brewery.id]">{{ brewery.name }}</a>
          <span>{{ brewery.location }}</span>
        </li>
      }
    </ul>
  `,
})
export class BreweryList {
  readonly breweries = input.required<Brewery[]>();
}
