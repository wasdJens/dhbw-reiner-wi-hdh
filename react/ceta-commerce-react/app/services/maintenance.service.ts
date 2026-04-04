/**
 * Maintenance Service – Verwaltung von Wartungsanfragen
 *
 * Dieser Service verwaltet den gesamten Lebenszyklus einer Wartungsanfrage:
 * pending → scheduled → in-progress → completed
 *
 * Dies ist das geschäftskritischste Feature von Ceta.
 * Baufirmen buchen hier regelmäßige Wartung für ihre Geräte.
 *
 * TODO: In einem späteren Semester durch API-Calls ersetzen:
 *       GET /api/maintenance, POST /api/maintenance, PATCH /api/maintenance/:id
 */

import type {
  MaintenanceRequest,
  MaintenanceStatus,
} from "../types";
import { maintenanceRequests as initialRequests } from "../data";

// ── Interner State ──────────────────────────────────────────

let requests: MaintenanceRequest[] = [...initialRequests];
let nextId = requests.length + 1;

// ── Callback für State-Änderungen ───────────────────────────

type MaintenanceListener = () => void;
const listeners: MaintenanceListener[] = [];

export function onMaintenanceChange(listener: MaintenanceListener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// ── Öffentliche API ─────────────────────────────────────────

/** Alle Wartungsanfragen abrufen */
export function getAllRequests(): MaintenanceRequest[] {
  return requests;
}

/** Wartungsanfrage anhand der ID finden */
export function getRequestById(id: string): MaintenanceRequest | null {
  return requests.find((r) => r.id === id) ?? null;
}

/** Wartungsanfragen nach Status filtern */
export function getRequestsByStatus(
  status: MaintenanceStatus
): MaintenanceRequest[] {
  return requests.filter((r) => r.status === status);
}

/** Neue Wartungsanfrage erstellen */
export function createRequest(
  data: Omit<MaintenanceRequest, "id" | "status" | "requestDate" | "scheduledDate">
): MaintenanceRequest {
  const newRequest: MaintenanceRequest = {
    ...data,
    id: `maint-${String(nextId++).padStart(3, "0")}`,
    status: "pending",
    requestDate: new Date().toISOString().split("T")[0],
    scheduledDate: null,
  };

  requests = [...requests, newRequest];
  notifyListeners();
  return newRequest;
}

/** Status einer Wartungsanfrage aktualisieren */
export function updateRequestStatus(
  id: string,
  status: MaintenanceStatus
): MaintenanceRequest | null {
  const request = requests.find((r) => r.id === id);
  if (!request) return null;

  request.status = status;
  requests = [...requests];
  notifyListeners();
  return request;
}

/** Anzahl offener Anfragen (nicht abgeschlossen) */
export function getOpenRequestCount(): number {
  return requests.filter((r) => r.status !== "completed").length;
}
