// React – Nach dem Formular-Submit weiterleiten
// Ceta-Beispiel: Wartungsanfrage erstellen (app/routes/maintenance-new.tsx)
import { useNavigate } from "react-router";
import { createRequest } from "../services";

export default function MaintenanceNewPage() {
  const navigate = useNavigate();

  const handleSubmit = (formData: MaintenanceFormData) => {
    createRequest(formData); // Speichert im maintenance.service.ts

    // Dann zur Übersicht weiterleiten
    navigate("/maintenance");

    // Oder: Zurück zur vorherigen Seite
    // navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formular-Felder */}
      <button type="submit">Anfrage absenden</button>
    </form>
  );
}