/**
 * PriceDisplay – Preisanzeige mit Formatierung
 *
 * DUMB COMPONENT: Formatiert einen Zahlenwert als Euro-Preis.
 * Kann optional einen "ab"-Prefix anzeigen (für Übersichtsseiten).
 */

interface PriceDisplayProps {
  price: number;
  showFromPrefix?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  price,
  showFromPrefix = false,
  size = "md",
}: PriceDisplayProps) {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  const sizeClass =
    size === "lg" ? "heading-3" : size === "sm" ? "text-sm" : "";

  return (
    <span className={`product-card__price ${sizeClass}`}>
      {showFromPrefix && <span>ab </span>}
      {formatted}
    </span>
  );
}
