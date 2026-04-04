/**
 * FeatureList – Liste von Produkt-Features
 *
 * DUMB COMPONENT: Zeigt eine Liste von Features mit Häkchen-Icons an.
 *
 * Angular-Konzepte: input(), @for
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.css',
})
export class FeatureListComponent {
  features = input.required<string[]>();
}
