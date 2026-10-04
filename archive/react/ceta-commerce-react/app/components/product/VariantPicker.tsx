/**
 * VariantPicker – Auswahl der Produktvariante (Basic / Pro / Enterprise)
 *
 * DUMB COMPONENT: Zeigt alle Varianten eines Produkts und hebt die ausgewählte hervor.
 * Die Auswahl-Logik (welcher State) lebt in der Smart Component.
 *
 * Demonstriert:
 * - Props für Daten UND Events (onSelect = Callback nach oben)
 * - Bedingtes Styling (selected)
 */

import type { ProductVariant } from "../../types";
import { PriceDisplay } from "./PriceDisplay";
import { Badge } from "../ui/Badge";

interface VariantPickerProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

const tierLabels: Record<string, string> = {
  basic: "Basic",
  pro: "Pro",
  enterprise: "Enterprise",
};

const tierBadgeVariant: Record<string, "neutral" | "info" | "accent"> = {
  basic: "neutral",
  pro: "info",
  enterprise: "accent",
};

export function VariantPicker({
  variants,
  selectedVariantId,
  onSelect,
}: VariantPickerProps) {
  return (
    <div className="variant-picker">
      {variants.map((variant) => (
        <div
          key={variant.id}
          className={`variant-option ${
            variant.id === selectedVariantId ? "variant-option--selected" : ""
          }`}
          onClick={() => onSelect(variant.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(variant.id)}
        >
          <div>
            <div className="flex flex--gap-sm" style={{ alignItems: "center" }}>
              <span className="variant-option__name">
                {tierLabels[variant.tier]}
              </span>
              <Badge
                label={tierLabels[variant.tier]}
                variant={tierBadgeVariant[variant.tier]}
              />
              {!variant.inStock && (
                <Badge label="Nicht verfügbar" variant="error" />
              )}
            </div>
          </div>
          <PriceDisplay price={variant.price} />
        </div>
      ))}
    </div>
  );
}
