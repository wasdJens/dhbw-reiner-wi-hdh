
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BeerResponseDto } from '../../definitions/beer-api.interface';

@Component({
  selector: 'app-beers-page',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule
],
  templateUrl: './beers-page.html',
  styleUrl: './beers-page.scss',
})
export class BeersPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  readonly beers = computed(() => this.data()!['beers'] as BeerResponseDto[]);

  protected trackByBeer = (_index: number, beer: BeerResponseDto) => beer.id;
}
