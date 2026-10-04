import { Component } from '@angular/core';

@Component({
  selector: 'app-beer-list',
  template: `
    <h1>Beer List</h1>
    <ul class="beer-list">
      @for (let beer of beers) {
        <li class="beer-list-element">
          <div>
            <h2>{{ beer.name }}</h2>
            <p>Taste: {{ beer.taste }}</p>
            <p>Brand: {{ beer.brand }}</p>
            <p>Amount: {{ beer.amount }}</p>
            <p>Rating: {{ beer.rating }}</p>
          </div>
        </li>
      }
    </ul>
  `,
  standalone: true
})
export class BeerListComponent {
  beers = [
    {
      name: 'Nattheimer Spezial',
      taste: 'Good',
      brand: 'Nattheimer',
      amount: 6,
      rating: 4,
    },
    {
      name: 'Goldochsen Kellerbier',
      taste: 'Super',
      brand: 'Goldochsen',
      amount: 0,
      rating: 1,
    },
  ];
}