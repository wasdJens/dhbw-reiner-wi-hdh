/**
 * RequestCard – Karte für eine einzelne Wartungsanfrage
 *
 * DUMB COMPONENT: Zeigt die wichtigsten Infos einer Wartungsanfrage.
 */

import type { MaintenanceRequest } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "../ui/Badge";

interface RequestCardProps {
  request: MaintenanceRequest;
}

const priorityVariant: Record<string, "neutral" | "warning" | "error"> = {
  low: "neutral",
  medium: "warning",
  high: "error",
};

const priorityLabels: Record<string, string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
};

export function RequestCard({ request }: RequestCardProps) {
  return (
    <div className="request-card">
      <div>
        <div className="request-card__title">
          {request.productName} – {request.variantTier.charAt(0).toUpperCase() + request.variantTier.slice(1)}
        </div>
        <p className="request-card__meta">
          {request.description.length > 120
            ? request.description.slice(0, 120) + "…"
            : request.description}
        </p>
        <div className="flex flex--gap-sm mt-sm">
          <StatusBadge status={request.status} />
          <Badge
            label={`Priorität: ${priorityLabels[request.priority]}`}
            variant={priorityVariant[request.priority]}
          />
        </div>
      </div>
      <div className="text-sm text-muted" style={{ whiteSpace: "nowrap" }}>
        {request.requestDate}
      </div>
    </div>
  );
}
