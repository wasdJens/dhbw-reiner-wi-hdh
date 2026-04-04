/**
 * Tests für den Maintenance Service
 *
 * Diese Tests prüfen das Erstellen und Filtern von Wartungsanfragen.
 */

import { describe, test, expect } from "vitest";
import {
  getAllRequests,
  getRequestById,
  getRequestsByStatus,
  createRequest,
  getOpenRequestCount,
} from "./maintenance.service";

describe("maintenance.service", () => {
  test("getAllRequests gibt initiale Anfragen zurück", () => {
    const requests = getAllRequests();
    expect(requests.length).toBeGreaterThan(0);
  });

  test("jede Anfrage hat alle Pflichtfelder", () => {
    getAllRequests().forEach((request) => {
      expect(request).toHaveProperty("id");
      expect(request).toHaveProperty("productId");
      expect(request).toHaveProperty("productName");
      expect(request).toHaveProperty("status");
      expect(request).toHaveProperty("priority");
      expect(request).toHaveProperty("description");
      expect(request).toHaveProperty("contactEmail");
    });
  });

  test("getRequestById findet existierende Anfrage", () => {
    const request = getRequestById("maint-001");
    expect(request).not.toBeNull();
    expect(request?.productName).toBe("CetaCore");
  });

  test("getRequestById gibt null für ungültige ID", () => {
    expect(getRequestById("nicht-vorhanden")).toBeNull();
  });

  test("getRequestsByStatus filtert korrekt", () => {
    const pending = getRequestsByStatus("pending");
    pending.forEach((r) => expect(r.status).toBe("pending"));

    const completed = getRequestsByStatus("completed");
    completed.forEach((r) => expect(r.status).toBe("completed"));
  });

  test("createRequest erstellt neue Anfrage mit Status pending", () => {
    const before = getAllRequests().length;
    const newRequest = createRequest({
      productId: "ceta-core",
      productName: "CetaCore",
      variantTier: "pro",
      description: "Testanfrage",
      priority: "medium",
      contactEmail: "test@example.com",
    });

    expect(newRequest.status).toBe("pending");
    expect(newRequest.scheduledDate).toBeNull();
    expect(getAllRequests().length).toBe(before + 1);
  });

  test("getOpenRequestCount zählt nicht-abgeschlossene Anfragen", () => {
    const total = getAllRequests().length;
    const completed = getRequestsByStatus("completed").length;
    const open = getOpenRequestCount();
    expect(open).toBe(total - completed);
  });
});
