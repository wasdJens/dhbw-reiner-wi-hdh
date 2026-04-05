import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ClientCardComponent } from '../../../components/client/client-card/client-card';

@Component({
  selector: 'app-clients-page',
  imports: [ClientCardComponent],
  templateUrl: './clients.page.html',
  styleUrl: './clients.page.css',
})
export default class ClientsPage {
  private clientService = inject(ClientService);
  protected readonly router = inject(Router);

  readonly clients = this.clientService.getAllClients();
}
