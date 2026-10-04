/**
 * Maintenance Page – Wartungsanfragen-Dashboard
 *
 * SMART COMPONENT: Zeigt alle Wartungsanfragen mit Statusfilter.
 * Implementiert das "4 States of Data" Pattern aus Kapitel 7:
 * Success (Anfragen vorhanden), Empty (keine Anfragen), + Filterung.
 *
 * Demonstriert:
 * - useState für aktiven Filter
 * - Service-Aufrufe (getAllRequests, getRequestsByStatus)
 * - Bedingtes Rendering basierend auf Filter-State
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getAllRequests,
  getRequestsByStatus,
  onMaintenanceChange,
} from "../services";
import type { MaintenanceStatus } from "../types";
import { PageHeader, RequestList, Button, Badge } from "../components";

type FilterOption = "all" | MaintenanceStatus;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "pending", label: "Ausstehend" },
  { value: "scheduled", label: "Geplant" },
  { value: "in-progress", label: "In Bearbeitung" },
  { value: "completed", label: "Abgeschlossen" },
];

export default function MaintenancePage() {
  const navigate = useNavigate();

  // State
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [requests, setRequests] = useState(getAllRequests());

  // Listener: Wenn sich Wartungsanfragen ändern (z.B. neue erstellt)
  useEffect(() => {
    const unsubscribe = onMaintenanceChange(() => {
      setRequests(getAllRequests());
    });
    return unsubscribe;
  }, []);

  // Geschäftslogik: Filtern
  const filteredRequests =
    activeFilter === "all"
      ? requests
      : getRequestsByStatus(activeFilter);

  return (
    <div>
      <PageHeader
        title="Wartungsanfragen"
        description="Verwalten Sie den Status Ihrer Wartungs- und Serviceanfragen."
      />

      <section className="section">
        <div className="container">
          {/* Header mit Aktion */}
          <div className="flex flex--between mb-xl">
            <div className="flex flex--gap-sm">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`btn btn--sm ${
                    activeFilter === option.value
                      ? "btn--secondary"
                      : "btn--ghost"
                  }`}
                  onClick={() => setActiveFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button
              label="+ Neue Anfrage"
              variant="primary"
              onClick={() => navigate("/maintenance/new")}
            />
          </div>

          {/* Ergebniszähler */}
          <p className="text-muted mb-md">
            {filteredRequests.length}{" "}
            {filteredRequests.length === 1 ? "Anfrage" : "Anfragen"}
            {activeFilter !== "all" && (
              <>
                {" "}
                mit Status{" "}
                <Badge
                  label={
                    filterOptions.find((o) => o.value === activeFilter)
                      ?.label ?? ""
                  }
                  variant="info"
                />
              </>
            )}
          </p>

          {/* Anfragenliste */}
          <RequestList requests={filteredRequests} />
        </div>
      </section>
    </div>
  );
}
