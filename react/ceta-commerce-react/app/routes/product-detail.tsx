/**
 * Product Detail Page – Produktdetailseite mit Variantenauswahl
 *
 * SMART COMPONENT: Nutzt Route-Parameter (:productId), verwaltet ausgewählte Variante,
 * und ermöglicht das Hinzufügen zum Warenkorb.
 *
 * Demonstriert:
 * - Dynamische Routen (useParams → productId)
 * - useState für ausgewählte Variante
 * - Service-Aufrufe (getProductById, addToCart)
 * - Fehlerbehandlung (Produkt nicht gefunden)
 */

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getProductById, addToCart } from "../services";
import {
  PageHeader,
  VariantPicker,
  FeatureList,
  PriceDisplay,
  Button,
  Badge,
} from "../components";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Produkt über Service laden
  const product = productId ? getProductById(productId) : null;

  // State: Ausgewählte Variante (Standard: erste Variante)
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants[0]?.id ?? ""
  );

  // State: Feedback nach dem Hinzufügen zum Warenkorb
  const [addedToCart, setAddedToCart] = useState(false);

  // Fehlerfall: Produkt nicht gefunden
  if (!product) {
    return (
      <div>
        <PageHeader title="Produkt nicht gefunden" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <h3 className="empty-state__title">
                Dieses Produkt existiert nicht
              </h3>
              <p className="empty-state__description">
                Das Produkt mit der ID &quot;{productId}&quot; konnte nicht
                gefunden werden.
              </p>
              <div className="mt-lg">
                <Button
                  label="Zurück zu allen Produkten"
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

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  function handleAddToCart() {
    if (!product || !selectedVariant || !selectedVariant.inStock) return;
    addToCart(product.id, selectedVariantId);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div>
      <PageHeader title={product.name} description={product.category} />

      <section className="section">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted mb-xl">
            <Link to="/products" className="link">
              Produkte
            </Link>
            {" / "}
            <span>{product.name}</span>
          </nav>

          <div className="grid grid--2">
            {/* Linke Seite: Produktbild / Platzhalter */}
            <div>
              <div
                className="card__image"
                style={{
                  backgroundColor: "var(--color-gray-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-lg)",
                  height: "400px",
                }}
              >
                <span style={{ fontSize: "5rem" }}>
                  {product.category === "Sicherheit" && "🪖"}
                  {product.category === "Vermessung" && "📐"}
                  {product.category === "Sicherheitstechnik" && "🛡️"}
                </span>
              </div>
            </div>

            {/* Rechte Seite: Details */}
            <div>
              <Badge label={product.category} variant="accent" />
              <h2 className="heading-2 mt-sm">{product.name}</h2>
              <p className="text-muted mt-md">{product.description}</p>

              {/* Variantenauswahl */}
              <h3 className="heading-4 mt-xl mb-md">Variante wählen</h3>
              <VariantPicker
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />

              {/* Ausgewählte Variante: Features + Preis */}
              {selectedVariant && (
                <div className="mt-xl">
                  <h3 className="heading-4 mb-md">
                    Features – {selectedVariant.name}
                  </h3>
                  <FeatureList features={selectedVariant.features} />

                  <div className="flex flex--between mt-xl">
                    <PriceDisplay price={selectedVariant.price} size="lg" />
                    <div className="flex flex--gap-sm">
                      {addedToCart ? (
                        <Badge label="✓ Hinzugefügt!" variant="success" />
                      ) : (
                        <Button
                          label={
                            selectedVariant.inStock
                              ? "In den Warenkorb"
                              : "Nicht verfügbar"
                          }
                          variant="primary"
                          onClick={handleAddToCart}
                          disabled={!selectedVariant.inStock}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
