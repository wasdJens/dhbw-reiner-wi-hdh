/**
 * New Maintenance Request Page – Neue Wartungsanfrage erstellen
 *
 * SMART COMPONENT: Orchestriert das RequestForm (Dumb) und den Maintenance Service.
 * Nach erfolgreichem Erstellen wird zum Dashboard navigiert.
 *
 * Angular-Konzepte: inject(), signal()
 */

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import {
  RequestFormComponent,
  type RequestFormData,
} from '../../components/maintenance/request-form.component';

@Component({
  selector: 'app-maintenance-new-page',
  imports: [PageHeaderComponent, RequestFormComponent],
  templateUrl: './maintenance-new.page.html',
  styleUrl: './maintenance-new.page.css',
})
export default class MaintenanceNewPage {
  private router = inject(Router);
  private productService = inject(ProductService);
  private maintenanceService = inject(MaintenanceService);

  submitted = signal(false);

  readonly productOptions = this.productService
    .getAllProducts()
    .map((p) => ({ value: p.id, label: p.name }));

  handleSubmit(data: RequestFormData): void {
    this.maintenanceService.createRequest(data);
    this.submitted.set(true);

    setTimeout(() => {
      this.router.navigate(['/maintenance']);
    }, 2000);
  }
}
