/**
 * Statische Wartungsanfragen als Beispieldaten
 *
 * Diese Daten simulieren eine Datenbank mit bestehenden Wartungsanfragen.
 * Jeder Status (pending, scheduled, in-progress, completed) ist mindestens einmal vertreten.
 * TODO: In einem späteren Semester durch fetch('/api/maintenance') ersetzen.
 */

import type { MaintenanceRequest } from "../types";

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "maint-001",
    productId: "ceta-core",
    productName: "CetaCore",
    variantTier: "enterprise",
    description:
      "GPS-Tracking zeigt ungenaue Positionen an. Abweichung ca. 15m statt der spezifizierten 2m. Problem tritt seit letzter Woche auf allen 12 Helmen der Baustelle Süd auf.",
    priority: "high",
    status: "in-progress",
    contactEmail: "technik@baufirma-mueller.de",
    requestDate: "2026-03-28",
    scheduledDate: "2026-04-02",
  },
  {
    id: "maint-002",
    productId: "ceta-guard",
    productName: "CetaGuard",
    variantTier: "pro",
    description:
      "Nachtsicht-Kamera zeigt seit dem letzten Firmware-Update Streifen im Bild. Tagsüber funktioniert alles einwandfrei.",
    priority: "medium",
    status: "scheduled",
    contactEmail: "it@grossbau-ag.de",
    requestDate: "2026-03-30",
    scheduledDate: "2026-04-07",
  },
  {
    id: "maint-003",
    productId: "ceta-level",
    productName: "CetaLevel",
    variantTier: "basic",
    description:
      "Display zeigt nach Sturz aus 1,5m Höhe nur noch Streifen an. Gehäuse äußerlich unbeschädigt. Gerät misst weiterhin, aber Werte sind nicht ablesbar.",
    priority: "low",
    status: "pending",
    contactEmail: "einkauf@handwerk-schmidt.de",
    requestDate: "2026-04-01",
    scheduledDate: null,
  },
  {
    id: "maint-004",
    productId: "ceta-core",
    productName: "CetaCore",
    variantTier: "pro",
    description:
      "Sturzerkennung hat bei 3 von 8 Helmen Fehlalarme im Bereich des Treppenhauses ausgelöst. Bitte Sensorkalibrierung prüfen.",
    priority: "medium",
    status: "completed",
    contactEmail: "sicherheit@bau-weber.de",
    requestDate: "2026-03-15",
    scheduledDate: "2026-03-20",
  },
  {
    id: "maint-005",
    productId: "ceta-guard",
    productName: "CetaGuard",
    variantTier: "enterprise",
    description:
      "KI-Anomalieerkennung klassifiziert Füchse und Katzen als Eindringlinge. Benötigen Anpassung der Erkennungsparameter für unser Gelände mit angrenzendem Waldstück.",
    priority: "low",
    status: "pending",
    contactEmail: "facility@infrastruktur-nord.de",
    requestDate: "2026-04-03",
    scheduledDate: null,
  },
];
