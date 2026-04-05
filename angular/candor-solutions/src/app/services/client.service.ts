/**
 * ClientService – Zugriff auf Kundendaten
 *
 * Kapselt den gesamten Datenzugriff für Kunden.
 * Keine Komponente greift direkt auf die Rohdaten zu.
 *
 * Angular-Konzept: Injectable Service mit providedIn: 'root' (Singleton).
 */

import { Injectable } from '@angular/core';
import type { Client } from '../types';
import { clients as rawClients } from '../data';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly clients: Client[] = rawClients;

  /** Alle Kunden abrufen */
  getAllClients(): Client[] {
    return this.clients;
  }

  /** Nur aktive Kunden */
  getActiveClients(): Client[] {
    return this.clients.filter(client => client.isActive);
  }

  /** Kunde anhand der ID finden */
  getClientById(id: string): Client | null {
    return this.clients.find(client => client.id === id) ?? null;
  }

  /** Kunden nach Suchbegriff filtern (Name, Branche, Ansprechpartner) */
  searchClients(query: string): Client[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery.length === 0) return this.clients;

    return this.clients.filter(
      client =>
        client.name.toLowerCase().includes(normalizedQuery) ||
        client.industry.toLowerCase().includes(normalizedQuery) ||
        client.contactPerson.toLowerCase().includes(normalizedQuery),
    );
  }

  /** Alle einzigartigen Branchen sortiert abrufen */
  getIndustries(): string[] {
    return [...new Set(this.clients.map(client => client.industry))].sort();
  }
}
