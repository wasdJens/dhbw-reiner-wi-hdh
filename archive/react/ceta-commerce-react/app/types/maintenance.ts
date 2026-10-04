/**
 * Wartungsanfrage-Typen
 *
 * Baufirmen können über den Webshop Wartungsanfragen für gekaufte Geräte stellen.
 * Der Status durchläuft: pending → scheduled → in-progress → completed
 *
 * Dies ist das geschäftskritischste Feature – hier verdient Ceta das meiste Geld.
 */

export type MaintenanceStatus =
  | "pending"
  | "scheduled"
  | "in-progress"
  | "completed";

export type MaintenancePriority = "low" | "medium" | "high";

export interface MaintenanceRequest {
  id: string;
  productId: string;
  productName: string;
  variantTier: "basic" | "pro" | "enterprise";
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  contactEmail: string;
  requestDate: string;
  scheduledDate: string | null;
}
