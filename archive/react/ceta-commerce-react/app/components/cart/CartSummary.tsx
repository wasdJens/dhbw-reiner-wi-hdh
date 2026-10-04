/**
 * CartSummary – Zusammenfassung des Warenkorbs
 *
 * DUMB COMPONENT: Zeigt Anzahl, Zwischensumme und Gesamtsumme.
 */

import { Button } from "../ui/Button";
import { PriceDisplay } from "../product/PriceDisplay";

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

export function CartSummary({ itemCount, total }: CartSummaryProps) {
  const tax = total * 0.19;
  const netTotal = total - tax;

  return (
    <div className="cart-summary">
      <h3 className="heading-4 mb-md">Zusammenfassung</h3>

      <div className="cart-summary__row">
        <span>Artikel</span>
        <span>{itemCount}</span>
      </div>

      <div className="cart-summary__row">
        <span>Netto</span>
        <PriceDisplay price={netTotal} />
      </div>

      <div className="cart-summary__row">
        <span>MwSt. (19%)</span>
        <PriceDisplay price={tax} />
      </div>

      <div className="cart-summary__row cart-summary__total">
        <span>Gesamt</span>
        <PriceDisplay price={total} size="lg" />
      </div>

      <div className="mt-lg">
        <Button
          label="Zur Kasse (kommt bald)"
          variant="primary"
          size="lg"
          disabled
        />
      </div>
    </div>
  );
}
