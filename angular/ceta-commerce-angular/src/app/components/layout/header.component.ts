/**
 * Header – Kopfzeile der Anwendung
 *
 * Enthält Logo, Navigation und Warenkorb-Badge.
 * Der Header braucht die Warenkorb-Anzahl als input(),
 * da der CartBadge ein Dumb Component ist.
 *
 * Angular-Konzepte: input(), Component Composition
 */

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { CartBadgeComponent } from '../cart/cart-badge.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NavigationComponent, CartBadgeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartItemCount = input(0);
}
