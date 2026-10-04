import { Component, inject, input, output } from '@angular/core';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import { StatusBadge } from '../../ui/status-badge/status-badge';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge';
import type { Project } from '../../../types';

@Component({
  selector: 'app-project-card',
  imports: [StatusBadge, PriorityBadgeComponent, SlicePipe, DecimalPipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCardComponent {
  project = input.required<Project>();
  viewDetails = output<string>();

  private clientService = inject(ClientService);

  readonly clientName = () =>
    this.clientService.getClientById(this.project().clientId)?.name ?? 'Unbekannt';
}
