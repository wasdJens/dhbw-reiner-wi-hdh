/**
 * Navigation – Hauptnavigation der Anwendung
 *
 * DUMB COMPONENT: Rendert Navigationslinks.
 * Nutzt routerLinkActive für aktive Zustände.
 *
 * Angular-Konzepte: @for, RouterLink, RouterLinkActive
 */

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  to: string;
  label: string;
  exact: boolean;
}

const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Start', exact: true },
  { to: '/products', label: 'Produkte', exact: false },
  { to: '/maintenance', label: 'Wartung', exact: false },
  { to: '/about', label: 'Über Ceta', exact: false },
];

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  readonly items = navigationItems;
}
