/**
 * CartItemRow – Einzelne Zeile im Warenkorb
 *
 * DUMB COMPONENT: Zeigt ein Produkt im Warenkorb mit Mengensteuerung.
 * Die Änderungs-Events werden über output() nach oben weitergegeben.
 *
 * Angular-Konzepte: input(), output()
 */

import { Component, input, output } from '@angular/core';
import { PriceDisplayComponent } from '../product/price-display.component';

@Component({
  selector: 'app-cart-item-row',
  imports: [PriceDisplayComponent],
  templateUrl: './cart-item-row.component.html',
  styleUrl: './cart-item-row.component.css',
})
export class CartItemRowComponent {
  productName = input.required<string>();
  variantName = input.required<string>();
  price = input.required<number>();
  quantity = input.required<number>();
  increase = output<void>();
  decrease = output<void>();
  remove = output<void>();
}
