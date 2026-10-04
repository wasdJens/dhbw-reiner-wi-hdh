/**
 * RequestCard – Karte für eine einzelne Wartungsanfrage
 *
 * DUMB COMPONENT: Zeigt die wichtigsten Infos einer Wartungsanfrage.
 *
 * Angular-Konzepte: input(), computed()
 */

import { Component, computed, input } from '@angular/core';
import type { MaintenanceRequest } from '../../types';
import { StatusBadgeComponent } from './status-badge.component';
import { BadgeComponent } from '../ui/badge.component';

const priorityVariant: Record<string, 'neutral' | 'warning' | 'error'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'error',
};

const priorityLabels: Record<string, string> = {
  low: 'Niedrig',
  medium: 'Mittel',
  high: 'Hoch',
};

@Component({
  selector: 'app-request-card',
  imports: [StatusBadgeComponent, BadgeComponent],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css',
})
export class RequestCardComponent {
  request = input.required<MaintenanceRequest>();

  protected capitalizedTier = computed(() => {
    const tier = this.request().variantTier;
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  });

  protected truncatedDescription = computed(() => {
    const desc = this.request().description;
    return desc.length > 120 ? desc.slice(0, 120) + '…' : desc;
  });

  protected priorityLabel = computed(
    () => priorityLabels[this.request().priority] ?? this.request().priority,
  );

  protected priorityBadgeVariant = computed(
    () => priorityVariant[this.request().priority] ?? 'neutral',
  );
}
