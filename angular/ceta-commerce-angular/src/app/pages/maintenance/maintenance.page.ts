/**
 * Maintenance Page – Wartungsanfragen-Dashboard
 *
 * SMART COMPONENT: Zeigt alle Wartungsanfragen mit Statusfilter.
 *
 * Angular-Konzepte: inject(), signal(), computed(), @for
 */

import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../services/maintenance.service';
import type { MaintenanceStatus } from '../../types';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { RequestListComponent } from '../../components/maintenance/request-list.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';

type FilterOption = 'all' | MaintenanceStatus;

interface FilterOptionItem {
  value: FilterOption;
  label: string;
}

const filterOptions: FilterOptionItem[] = [
  { value: 'all', label: 'Alle' },
  { value: 'pending', label: 'Ausstehend' },
  { value: 'scheduled', label: 'Geplant' },
  { value: 'in-progress', label: 'In Bearbeitung' },
  { value: 'completed', label: 'Abgeschlossen' },
];

@Component({
  selector: 'app-maintenance-page',
  imports: [PageHeaderComponent, RequestListComponent, ButtonComponent, BadgeComponent],
  templateUrl: './maintenance.page.html',
  styleUrl: './maintenance.page.css',
})
export default class MaintenancePage {
  protected readonly router = inject(Router);
  private maintenanceService = inject(MaintenanceService);

  readonly filterOptions = filterOptions;
  activeFilter = signal<FilterOption>('all');

  filteredRequests = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? this.maintenanceService.getAllRequests()
      : this.maintenanceService.getRequestsByStatus(filter);
  });

  activeFilterLabel = computed(
    () => filterOptions.find((o) => o.value === this.activeFilter())?.label ?? '',
  );
}
