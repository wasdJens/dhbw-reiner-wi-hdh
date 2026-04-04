/**
 * RequestForm – Formular für neue Wartungsanfrage
 *
 * DUMB COMPONENT: Zeigt das Formular an und gibt die Daten beim Absenden
 * über den onSubmit-Callback nach oben. Die Validierungslogik lebt hier,
 * da sie rein UI-bezogen ist (Pflichtfelder anzeigen).
 *
 * Demonstriert: Formulare, kontrollierte Inputs, Validierung
 */

import { useState } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";

interface RequestFormData {
  productId: string;
  productName: string;
  variantTier: "basic" | "pro" | "enterprise";
  description: string;
  priority: "low" | "medium" | "high";
  contactEmail: string;
}

interface RequestFormProps {
  productOptions: { value: string; label: string }[];
  onSubmit: (data: RequestFormData) => void;
}

export function RequestForm({ productOptions, onSubmit }: RequestFormProps) {
  // Formular-State – jedes Feld wird kontrolliert
  const [productId, setProductId] = useState("");
  const [variantTier, setVariantTier] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!productId) newErrors.productId = "Bitte wählen Sie ein Produkt";
    if (!variantTier) newErrors.variantTier = "Bitte wählen Sie eine Variante";
    if (!description.trim())
      newErrors.description = "Bitte beschreiben Sie das Problem";
    if (!priority) newErrors.priority = "Bitte wählen Sie eine Priorität";
    if (!contactEmail.trim())
      newErrors.contactEmail = "Bitte geben Sie eine E-Mail-Adresse an";
    else if (!contactEmail.includes("@"))
      newErrors.contactEmail = "Bitte geben Sie eine gültige E-Mail-Adresse an";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const selectedProduct = productOptions.find((p) => p.value === productId);

    onSubmit({
      productId,
      productName: selectedProduct?.label ?? "",
      variantTier: variantTier as "basic" | "pro" | "enterprise",
      description: description.trim(),
      priority: priority as "low" | "medium" | "high",
      contactEmail: contactEmail.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex--column flex--gap-lg">
      <Select
        label="Produkt"
        value={productId}
        onChange={setProductId}
        options={productOptions}
        placeholder="Produkt auswählen…"
        error={errors.productId}
        required
      />

      <Select
        label="Variante"
        value={variantTier}
        onChange={setVariantTier}
        options={[
          { value: "basic", label: "Basic" },
          { value: "pro", label: "Pro" },
          { value: "enterprise", label: "Enterprise" },
        ]}
        placeholder="Variante auswählen…"
        error={errors.variantTier}
        required
      />

      <Select
        label="Priorität"
        value={priority}
        onChange={setPriority}
        options={[
          { value: "low", label: "Niedrig – Kann warten" },
          { value: "medium", label: "Mittel – Sollte bald behoben werden" },
          { value: "high", label: "Hoch – Beeinträchtigt den Betrieb" },
        ]}
        placeholder="Priorität auswählen…"
        error={errors.priority}
        required
      />

      <TextArea
        label="Problembeschreibung"
        value={description}
        onChange={setDescription}
        placeholder="Beschreiben Sie das Problem so genau wie möglich. Wann tritt es auf? Wie viele Geräte sind betroffen?"
        rows={5}
        error={errors.description}
        required
      />

      <Input
        label="Kontakt-E-Mail"
        value={contactEmail}
        onChange={setContactEmail}
        placeholder="ihre-email@firma.de"
        type="email"
        error={errors.contactEmail}
        required
      />

      <div>
        <Button label="Wartungsanfrage absenden" variant="primary" type="submit" />
      </div>
    </form>
  );
}
