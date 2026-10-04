/**
 * CartBadge – Warenkorb-Icon mit Anzahl
 *
 * DUMB COMPONENT: Zeigt die Artikelanzahl an.
 * Der Count wird von der Smart Component übergeben.
 */

import { Link } from "react-router";

interface CartBadgeProps {
  itemCount: number;
}

export function CartBadge({ itemCount }: CartBadgeProps) {
  return (
    <Link to="/cart" className="cart-badge">
      🛒 Warenkorb
      {itemCount > 0 && (
        <span className="cart-badge__count">{itemCount}</span>
      )}
    </Link>
  );
}
