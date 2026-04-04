/**
 * PriceDisplay – Preisanzeige mit Formatierung
 *
 * DUMB COMPONENT: Formatiert einen Zahlenwert als Euro-Preis.
 *
 * Angular-Konzepte: input(), computed()
 */

import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrl: './price-display.component.css',
})
export class PriceDisplayComponent {
  price = input.required<number>();
  showFromPrefix = input(false);
  size = input<'sm' | 'md' | 'lg'>('md');

  protected formatted = computed(() =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(this.price()),
  );

  protected sizeClass = computed(() => {
    const s = this.size();
    return s === 'lg' ? 'heading-3' : s === 'sm' ? 'text-sm' : '';
  });
}
