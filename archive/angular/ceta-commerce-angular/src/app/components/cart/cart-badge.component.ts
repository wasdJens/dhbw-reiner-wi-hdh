/**
 * CartBadge – Warenkorb-Icon mit Anzahl
 *
 * DUMB COMPONENT: Zeigt die Artikelanzahl an.
 *
 * Angular-Konzepte: input(), @if, RouterLink
 */

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-badge',
  imports: [RouterLink],
  templateUrl: './cart-badge.component.html',
  styleUrl: './cart-badge.component.css',
})
export class CartBadgeComponent {
  itemCount = input(0);
}
