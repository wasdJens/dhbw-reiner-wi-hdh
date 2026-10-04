import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  status = input.required<string>();

  readonly variant = computed(() => {
    const map: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
      active: 'success',
      completed: 'info',
      planning: 'warning',
      'on-hold': 'error',
      open: 'warning',
      'in-progress': 'info',
      resolved: 'success',
      declined: 'error',
    };
    return map[this.status()] ?? 'default';
  });

  readonly label = computed(() => {
    const map: Record<string, string> = {
      active: 'Aktiv',
      completed: 'Abgeschlossen',
      planning: 'Planung',
      'on-hold': 'Pausiert',
      open: 'Offen',
      'in-progress': 'In Bearbeitung',
      resolved: 'Erledigt',
      declined: 'Abgelehnt',
    };
    return map[this.status()] ?? this.status();
  });
}
