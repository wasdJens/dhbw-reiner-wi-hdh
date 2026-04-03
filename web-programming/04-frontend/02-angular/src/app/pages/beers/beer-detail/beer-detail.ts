import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beer-detail',
  imports: [],
  templateUrl: './beer-detail.html',
  styleUrl: './beer-detail.css',
})
export class BeerDetail {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  beer = computed(() => this.data()?.['beer']);
}
