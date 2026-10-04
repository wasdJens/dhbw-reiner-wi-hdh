/**
 * CartSummary – Zusammenfassung des Warenkorbs
 *
 * DUMB COMPONENT: Zeigt Anzahl, Zwischensumme und Gesamtsumme.
 *
 * Angular-Konzepte: input(), computed()
 */

import { Component, computed, input } from '@angular/core';
import { ButtonComponent } from '../ui/button.component';
import { PriceDisplayComponent } from '../product/price-display.component';

@Component({
  selector: 'app-cart-summary',
  imports: [ButtonComponent, PriceDisplayComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent {
  itemCount = input.required<number>();
  total = input.required<number>();

  protected tax = computed(() => this.total() * 0.19);
  protected netTotal = computed(() => this.total() - this.tax());
}
