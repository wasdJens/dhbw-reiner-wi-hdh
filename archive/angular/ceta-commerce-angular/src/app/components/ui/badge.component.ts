/**
 * Badge – Farbiger Status-/Kategorie-Badge
 *
 * DUMB COMPONENT: Zeigt ein Label in einer farbigen Kapsel an.
 *
 * Angular-Konzepte: input()
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  label = input.required<string>();
  variant = input<'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'>(
    'primary',
  );
}
