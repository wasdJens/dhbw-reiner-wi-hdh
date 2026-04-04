/**
 * Cart Page – Warenkorb
 *
 * SMART COMPONENT: Verwaltet den Warenkorb-State über den Cart Service.
 * Reagiert auf Änderungen über den Listener-Mechanismus des Services.
 *
 * Demonstriert:
 * - State-Synchronisation mit einem Service (onCartChange)
 * - Bedingte UI: Leerer Warenkorb vs. gefüllter Warenkorb
 * - Dumb Components empfangen Daten und Event-Handler als Props
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getCart,
  getCartTotal,
  getCartItemCount,
  getProductById,
  getVariantById,
  updateQuantity,
  removeFromCart,
  clearCart,
  onCartChange,
} from "../services";
import { PageHeader, CartItemRow, CartSummary, Button } from "../components";

export default function CartPage() {
  const navigate = useNavigate();

  // State wird aus dem Service geladen und bei Änderungen aktualisiert
  const [cart, setCart] = useState(getCart());
  const [total, setTotal] = useState(getCartTotal());
  const [itemCount, setItemCount] = useState(getCartItemCount());

  // Listener: Wenn sich der Warenkorb ändert, State aktualisieren
  useEffect(() => {
    const unsubscribe = onCartChange(() => {
      setCart(getCart());
      setTotal(getCartTotal());
      setItemCount(getCartItemCount());
    });
    return unsubscribe;
  }, []);

  // Leerer Warenkorb
  if (cart.items.length === 0) {
    return (
      <div>
        <PageHeader title="Warenkorb" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state__icon">🛒</div>
              <h3 className="empty-state__title">Ihr Warenkorb ist leer</h3>
              <p className="empty-state__description">
                Stöbern Sie in unseren Produkten und fügen Sie Artikel zu Ihrem
                Warenkorb hinzu.
              </p>
              <div className="mt-lg">
                <Button
                  label="Produkte ansehen"
                  variant="primary"
                  onClick={() => navigate("/products")}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Warenkorb"
        description={`${itemCount} ${itemCount === 1 ? "Artikel" : "Artikel"} in Ihrem Warenkorb`}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gridTemplateColumns: "2fr 1fr" }}>
            {/* Warenkorbinhalt */}
            <div>
              {cart.items.map((item) => {
                const product = getProductById(item.productId);
                const variant = getVariantById(item.productId, item.variantId);
                if (!product || !variant) return null;

                return (
                  <CartItemRow
                    key={`${item.productId}-${item.variantId}`}
                    productName={product.name}
                    variantName={variant.name}
                    price={variant.price}
                    quantity={item.quantity}
                    onIncrease={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity + 1
                      )
                    }
                    onDecrease={() =>
                      updateQuantity(
                        item.productId,
                        item.variantId,
                        item.quantity - 1
                      )
                    }
                    onRemove={() =>
                      removeFromCart(item.productId, item.variantId)
                    }
                  />
                );
              })}

              <div className="mt-lg">
                <Button
                  label="Warenkorb leeren"
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                />
              </div>
            </div>

            {/* Zusammenfassung */}
            <CartSummary itemCount={itemCount} total={total} />
          </div>
        </div>
      </section>
    </div>
  );
}
