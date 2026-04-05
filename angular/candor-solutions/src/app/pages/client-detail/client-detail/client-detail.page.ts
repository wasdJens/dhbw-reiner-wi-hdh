import { Component, inject, input, computed } from '@angular/core';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ProjectService } from '../../../services/project.service';
import { ProjectCardComponent } from '../../../components/project/project-card/project-card';
import { Button } from '../../../components/ui/button/button';

@Component({
  selector: 'app-client-detail-page',
  imports: [ProjectCardComponent, Button, SlicePipe, DecimalPipe],
  templateUrl: './client-detail.page.html',
  styleUrl: './client-detail.page.css',
})
export default class ClientDetailPage {
  readonly id = input.required<string>();

  private clientService = inject(ClientService);
  private projectService = inject(ProjectService);
  protected readonly router = inject(Router);

  readonly client = computed(() => this.clientService.getClientById(this.id()));
  readonly projects = computed(() => this.projectService.getProjectsByClient(this.id()));
  readonly totalBudget = computed(() => this.projectService.getTotalBudget(this.id()));
}
