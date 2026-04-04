/**
 * StatusBadge – Farbcodierter Status für Wartungsanfragen
 *
 * DUMB COMPONENT: Zeigt den Status einer Wartungsanfrage als farbigen Badge.
 * Mapping: pending=gelb, scheduled=blau, in-progress=blau-dunkel, completed=grün
 */

import type { MaintenanceStatus } from "../../types";

interface StatusBadgeProps {
  status: MaintenanceStatus;
}

const statusLabels: Record<MaintenanceStatus, string> = {
  pending: "Ausstehend",
  scheduled: "Geplant",
  "in-progress": "In Bearbeitung",
  completed: "Abgeschlossen",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge status-badge--${status}`}>
      {statusLabels[status]}
    </span>
  );
}
