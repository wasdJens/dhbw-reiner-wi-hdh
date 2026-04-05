import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { RequestService } from '../../../services/request.service';
import { Button } from '../../../components/ui/button/button';

@Component({
  selector: 'app-request-new-page',
  imports: [FormsModule, Button],
  templateUrl: './request-new.page.html',
  styleUrl: './request-new.page.css',
})
export default class RequestNewPage {
  private clientService = inject(ClientService);
  private requestService = inject(RequestService);
  protected readonly router = inject(Router);

  readonly clients = this.clientService.getActiveClients();
  readonly submitted = signal(false);

  formData = {
    clientId: '',
    title: '',
    description: '',
    requestedBy: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  };

  submit(): void {
    this.requestService.submitRequest(this.formData);
    this.submitted.set(true);
  }
}
