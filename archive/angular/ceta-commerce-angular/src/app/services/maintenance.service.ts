/**
 * Maintenance Service – Verwaltung von Wartungsanfragen mit Angular Signals
 *
 * Dieser Service verwaltet den gesamten Lebenszyklus einer Wartungsanfrage:
 * pending → scheduled → in-progress → completed
 *
 * Angular-Konzepte: signal(), computed()
 */

import { computed, Injectable, signal } from '@angular/core';
import type { MaintenanceRequest, MaintenanceStatus } from '../types';
import { maintenanceRequests as initialRequests } from '../data';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  private nextId = initialRequests.length + 1;

  /** Reaktiver State: Liste aller Wartungsanfragen */
  readonly requests = signal<MaintenanceRequest[]>([...initialRequests]);

  /** Abgeleiteter Wert: Anzahl offener Anfragen (nicht abgeschlossen) */
  readonly openRequestCount = computed(
    () => this.requests().filter((r) => r.status !== 'completed').length,
  );

  /** Alle Wartungsanfragen abrufen */
  getAllRequests(): MaintenanceRequest[] {
    return this.requests();
  }

  /** Wartungsanfrage anhand der ID finden */
  getRequestById(id: string): MaintenanceRequest | null {
    return this.requests().find((r) => r.id === id) ?? null;
  }

  /** Wartungsanfragen nach Status filtern */
  getRequestsByStatus(status: MaintenanceStatus): MaintenanceRequest[] {
    return this.requests().filter((r) => r.status === status);
  }

  /** Neue Wartungsanfrage erstellen */
  createRequest(
    data: Omit<MaintenanceRequest, 'id' | 'status' | 'requestDate' | 'scheduledDate'>,
  ): MaintenanceRequest {
    const newRequest: MaintenanceRequest = {
      ...data,
      id: `maint-${String(this.nextId++).padStart(3, '0')}`,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      scheduledDate: null,
    };

    this.requests.update((requests) => [...requests, newRequest]);
    return newRequest;
  }

  /** Status einer Wartungsanfrage aktualisieren */
  updateRequestStatus(id: string, status: MaintenanceStatus): MaintenanceRequest | null {
    let updated: MaintenanceRequest | null = null;

    this.requests.update((requests) =>
      requests.map((r) => {
        if (r.id === id) {
          updated = { ...r, status };
          return updated;
        }
        return r;
      }),
    );

    return updated;
  }
}
