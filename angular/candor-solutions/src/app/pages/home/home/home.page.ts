import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ProjectService } from '../../../services/project.service';
import { RequestService } from '../../../services/request.service';
import { Button } from '../../../components/ui/button/button';

@Component({
  selector: 'app-home-page',
  imports: [Button],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  protected readonly router = inject(Router);
  private clientService = inject(ClientService);
  private projectService = inject(ProjectService);
  private requestService = inject(RequestService);

  readonly activeClientCount = this.clientService.getActiveClients().length;
  readonly totalProjectCount = this.projectService.getAllProjects().length;
  readonly openRequestCount = this.requestService.getOpenRequests().length;
}
