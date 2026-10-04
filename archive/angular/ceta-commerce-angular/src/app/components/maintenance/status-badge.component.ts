/**
 * StatusBadge – Farbcodierter Status für Wartungsanfragen
 *
 * DUMB COMPONENT: Zeigt den Status einer Wartungsanfrage als farbigen Badge.
 *
 * Angular-Konzepte: input()
 */

import { Component, input } from '@angular/core';
import type { MaintenanceStatus } from '../../types';

const statusLabels: Record<MaintenanceStatus, string> = {
  pending: 'Ausstehend',
  scheduled: 'Geplant',
  'in-progress': 'In Bearbeitung',
  completed: 'Abgeschlossen',
};

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  status = input.required<MaintenanceStatus>();

  protected label(): string {
    return statusLabels[this.status()];
  }
}
