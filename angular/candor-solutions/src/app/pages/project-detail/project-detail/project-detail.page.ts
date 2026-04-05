import { Component, inject, input, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ClientService } from '../../../services/client.service';
import { StatusBadge } from '../../../components/ui/status-badge/status-badge';
import { PriorityBadgeComponent } from '../../../components/project/priority-badge/priority-badge';
import { Button } from '../../../components/ui/button/button';

@Component({
  selector: 'app-project-detail-page',
  imports: [StatusBadge, PriorityBadgeComponent, Button, DecimalPipe],
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.css',
})
export default class ProjectDetailPage {
  readonly id = input.required<string>();

  private projectService = inject(ProjectService);
  private clientService = inject(ClientService);
  protected readonly router = inject(Router);

  readonly project = computed(() => this.projectService.getProjectById(this.id()));
  readonly client = computed(() => {
    const project = this.project();
    return project ? this.clientService.getClientById(project.clientId) : null;
  });
}
