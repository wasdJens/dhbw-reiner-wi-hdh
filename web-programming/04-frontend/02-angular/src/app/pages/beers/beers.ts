import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-beers',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './beers.html',
  styleUrl: './beers.css',
})
export class Beers {
  beers = signal([{ name: 'Nattheimer', id: 1 }]);
}
