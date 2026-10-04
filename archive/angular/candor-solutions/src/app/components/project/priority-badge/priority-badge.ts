import { Component, computed, input } from '@angular/core';
import type { ProjectPriority } from '../../../types';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.html',
  styleUrl: './priority-badge.css',
})
export class PriorityBadgeComponent {
  priority = input.required<ProjectPriority>();

  readonly variant = computed(() => {
    const map: Record<ProjectPriority, string> = {
      high: 'badge--error',
      medium: 'badge--warning',
      low: 'badge--default',
    };
    return map[this.priority()];
  });

  readonly label = computed(() => {
    const map: Record<ProjectPriority, string> = {
      high: 'Hoch',
      medium: 'Mittel',
      low: 'Niedrig',
    };
    return map[this.priority()];
  });
}
