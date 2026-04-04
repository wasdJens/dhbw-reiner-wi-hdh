/**
 * New Maintenance Request Page – Neue Wartungsanfrage erstellen
 *
 * SMART COMPONENT: Orchestriert das RequestForm (Dumb) und den Maintenance Service.
 * Nach erfolgreichem Erstellen wird zum Dashboard navigiert.
 *
 * Demonstriert:
 * - Smart Component als Vermittler zwischen Dumb Component und Service
 * - Navigation nach Aktion (useNavigate)
 * - Daten für das Formular aus dem Product Service laden
 */

import { useState } from "react";
import { useNavigate } from "react-router";
import { getAllProducts, createRequest } from "../services";
import { PageHeader, RequestForm } from "../components";

export default function MaintenanceNewPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Produktoptionen für das Formular aus dem Service laden
  const products = getAllProducts();
  const productOptions = products.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  function handleSubmit(data: {
    productId: string;
    productName: string;
    variantTier: "basic" | "pro" | "enterprise";
    description: string;
    priority: "low" | "medium" | "high";
    contactEmail: string;
  }) {
    createRequest(data);
    setSubmitted(true);

    // Nach 2 Sekunden zum Dashboard navigieren
    setTimeout(() => {
      navigate("/maintenance");
    }, 2000);
  }

  // Erfolgsansicht nach Absenden
  if (submitted) {
    return (
      <div>
        <PageHeader title="Anfrage erstellt" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state__icon">✅</div>
              <h3 className="empty-state__title">
                Ihre Wartungsanfrage wurde erfolgreich erstellt
              </h3>
              <p className="empty-state__description">
                Sie werden automatisch zum Dashboard weitergeleitet…
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Neue Wartungsanfrage"
        description="Beschreiben Sie das Problem und wir kümmern uns um den Rest."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "640px" }}>
          <RequestForm
            productOptions={productOptions}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}
