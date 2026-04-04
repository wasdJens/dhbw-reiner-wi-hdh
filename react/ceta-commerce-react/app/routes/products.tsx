/**
 * Products Page – Produktübersicht
 *
 * SMART COMPONENT: Verwaltet Suchbegriff-State und lädt Produkte über den Service.
 *
 * Demonstriert:
 * - useState für den Suchbegriff
 * - Filterte Liste basierend auf State
 * - Smart Component orchestriert Dumb Components (ProductCard, Input)
 */

import { useState } from "react";
import { useNavigate } from "react-router";
import { getAllProducts, searchProducts } from "../services";
import { PageHeader, ProductCard, ProductGrid, Input } from "../components";

export default function ProductsPage() {
  const navigate = useNavigate();

  // State: Suchbegriff – ändert sich wenn der Nutzer tippt
  const [searchTerm, setSearchTerm] = useState("");

  // Geschäftslogik: Produkte filtern basierend auf Suchbegriff
  const products =
    searchTerm.trim().length > 0
      ? searchProducts(searchTerm)
      : getAllProducts();

  function handleViewDetails(productId: string) {
    navigate(`/products/${productId}`);
  }

  return (
    <div>
      <PageHeader
        title="Produkte"
        description="Spezialisierte Ausrüstung für die Baubranche – vom Schutzhelm bis zum Überwachungssystem."
      />

      <section className="section">
        <div className="container">
          {/* Suchfeld */}
          <div className="mb-xl" style={{ maxWidth: "400px" }}>
            <Input
              label="Produkte durchsuchen"
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="z.B. Schutzhelm, Vermessung…"
              type="search"
            />
          </div>

          {/* Ergebnisanzeige */}
          <p className="text-muted mb-lg">
            {products.length} {products.length === 1 ? "Produkt" : "Produkte"}{" "}
            gefunden
          </p>

          {/* Produktliste */}
          {products.length > 0 ? (
            <ProductGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                  onViewDetails={handleViewDetails}
                />
              ))}
            </ProductGrid>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">🔍</div>
              <h3 className="empty-state__title">Keine Produkte gefunden</h3>
              <p className="empty-state__description">
                Für &quot;{searchTerm}&quot; wurden keine Produkte gefunden.
                Versuchen Sie einen anderen Suchbegriff.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
