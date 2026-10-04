/**
 * RequestList – Liste von Wartungsanfragen
 *
 * DUMB COMPONENT: Rendert eine Liste von RequestCards.
 * Zeigt einen Empty State wenn keine Anfragen vorhanden sind.
 */

import type { MaintenanceRequest } from "../../types";
import { RequestCard } from "./RequestCard";

interface RequestListProps {
  requests: MaintenanceRequest[];
}

export function RequestList({ requests }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📋</div>
        <h3 className="empty-state__title">Keine Anfragen gefunden</h3>
        <p className="empty-state__description">
          Es gibt derzeit keine Wartungsanfragen mit diesem Filter.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex--column flex--gap-md">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
