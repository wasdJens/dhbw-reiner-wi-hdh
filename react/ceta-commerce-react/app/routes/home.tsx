/**
 * Home Page – Startseite von Ceta Commerce
 *
 * SMART COMPONENT: Lädt Produkte über den Service und orchestriert Dumb Components.
 * Zeigt Hero-Section, Produkthighlights und Wartungs-CTA.
 */

import { useNavigate } from "react-router";
import { getAllProducts } from "../services";
import { ProductCard, ProductGrid, Button } from "../components";

export default function HomePage() {
  const navigate = useNavigate();
  const products = getAllProducts();

  function handleViewDetails(productId: string) {
    navigate(`/products/${productId}`);
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">
            Ausrüstung, die Ihre Baustelle sicherer macht
          </h1>
          <p className="hero__subtitle">
            Ceta liefert spezialisierte Technik für Baufirmen – vom smarten
            Schutzhelm bis zum autonomen Überwachungssystem. Einfach online
            bestellen und Wartung direkt mitbuchen.
          </p>
          <div className="flex flex--center flex--gap-md">
            <Button
              label="Produkte entdecken"
              variant="primary"
              size="lg"
              onClick={() => navigate("/products")}
            />
            <Button
              label="Wartung anfragen"
              variant="outline"
              size="lg"
              onClick={() => navigate("/maintenance/new")}
            />
          </div>
        </div>
      </section>

      {/* Produkthighlights */}
      <section className="section">
        <div className="container">
          <h2 className="heading-2 mb-lg">Unsere Produkte</h2>
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
        </div>
      </section>

      {/* Wartungs-CTA */}
      <section className="section" style={{ backgroundColor: "var(--color-gray-50)" }}>
        <div className="container text-center">
          <h2 className="heading-2 mb-md">
            Wartung & Service – Direkt über den Webshop
          </h2>
          <p className="text-muted mb-lg" style={{ maxWidth: "600px", marginInline: "auto" }}>
            Ihre Geräte brauchen eine Inspektion? Melden Sie Wartungsanfragen
            online an – wir kümmern uns um den Rest. Transparente Statusverfolgung
            von der Anfrage bis zur Fertigstellung.
          </p>
          <div className="flex flex--center flex--gap-md">
            <Button
              label="Neue Wartungsanfrage"
              variant="primary"
              onClick={() => navigate("/maintenance/new")}
            />
            <Button
              label="Anfragen verwalten"
              variant="secondary"
              onClick={() => navigate("/maintenance")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
