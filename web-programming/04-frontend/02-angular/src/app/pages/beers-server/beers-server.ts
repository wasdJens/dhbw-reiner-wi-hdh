import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beers-server',
  imports: [],
  templateUrl: './beers-server.html',
  styleUrl: './beers-server.css',
})
export class BeersServer {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  beers = computed(() => this.data()?.['beers']);
}
