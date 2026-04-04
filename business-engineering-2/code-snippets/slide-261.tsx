// src/app/pages/maintenance-new/maintenance-new.page.ts
// Nach dem Formular-Submit weiterleiten
import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { MaintenanceService } from "../../services/maintenance.service";
import { type RequestFormData } from "../../components/maintenance/request-form.component";

@Component({ /* ... */ })
export default class MaintenanceNewPage {
  private router = inject(Router);                       // inject() statt constructor
  private maintenanceService = inject(MaintenanceService);

  submitted = signal(false); // Zeigt Erfolgs-State

  handleSubmit(data: RequestFormData): void {
    this.maintenanceService.createRequest(data); // Speichert im Service
    this.submitted.set(true);                    // UI wechselt zu Erfolgs-Nachricht

    // Dann automatisch zur Übersicht weiterleiten
    setTimeout(() => {
      this.router.navigate(["/maintenance"]);
    }, 2000);
  }
}