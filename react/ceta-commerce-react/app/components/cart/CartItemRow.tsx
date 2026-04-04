/**
 * CartItemRow – Einzelne Zeile im Warenkorb
 *
 * DUMB COMPONENT: Zeigt ein Produkt im Warenkorb mit Mengensteuerung.
 * Die Änderungs-Events werden nach oben weitergegeben.
 */

import { PriceDisplay } from "../product/PriceDisplay";

interface CartItemRowProps {
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemRow({
  productName,
  variantName,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <div className="cart-item__name">{productName}</div>
        <div className="cart-item__variant">{variantName}</div>
      </div>
      <div className="cart-item__quantity">
        <button className="cart-item__quantity-btn" onClick={onDecrease}>
          −
        </button>
        <span>{quantity}</span>
        <button className="cart-item__quantity-btn" onClick={onIncrease}>
          +
        </button>
      </div>
      <div className="cart-item__price">
        <PriceDisplay price={price * quantity} />
      </div>
      <button className="btn btn--ghost btn--sm" onClick={onRemove}>
        ✕
      </button>
    </div>
  );
}
