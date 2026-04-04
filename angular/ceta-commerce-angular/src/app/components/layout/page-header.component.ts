/**
 * PageHeader – Seitenüberschrift mit optionaler Beschreibung
 *
 * DUMB COMPONENT: Wird auf jeder Unterseite als einheitlicher Kopfbereich verwendet.
 *
 * Angular-Konzepte: input(), @if
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  title = input.required<string>();
  description = input('');
}
