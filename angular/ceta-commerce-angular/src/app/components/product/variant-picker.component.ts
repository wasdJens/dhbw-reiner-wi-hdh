/**
 * VariantPicker – Auswahl der Produktvariante (Basic / Pro / Enterprise)
 *
 * DUMB COMPONENT: Zeigt alle Varianten eines Produkts und hebt die ausgewählte hervor.
 * Die Auswahl-Logik (welcher State) lebt in der Smart Component.
 *
 * Angular-Konzepte: input(), output(), @for, @if
 */

import { Component, input, output } from '@angular/core';
import type { ProductVariant } from '../../types';
import { PriceDisplayComponent } from './price-display.component';
import { BadgeComponent } from '../ui/badge.component';

const tierLabels: Record<string, string> = {
  basic: 'Basic',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

const tierBadgeVariant: Record<string, 'neutral' | 'info' | 'accent'> = {
  basic: 'neutral',
  pro: 'info',
  enterprise: 'accent',
};

@Component({
  selector: 'app-variant-picker',
  imports: [PriceDisplayComponent, BadgeComponent],
  templateUrl: './variant-picker.component.html',
  styleUrl: './variant-picker.component.css',
})
export class VariantPickerComponent {
  variants = input.required<ProductVariant[]>();
  selectedVariantId = input.required<string>();
  select = output<string>();

  tierLabel(tier: string): string {
    return tierLabels[tier] ?? tier;
  }

  tierBadge(tier: string): 'neutral' | 'info' | 'accent' {
    return tierBadgeVariant[tier] ?? 'neutral';
  }
}
