// app/routes/products.tsx
import { ProductCard, ProductGrid } from "../components";
import { getAllProducts, searchProducts } from "../services";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Dieselbe Service-Funktion – verschiedene Aufrufe je nach Suchbegriff
  const products =
    searchTerm.trim().length > 0
      ? searchProducts(searchTerm)
      : getAllProducts();

  return (
    <div>
      <h1>Unsere Produkte</h1>

      {/* Dieselbe Komponente für alle 3 Ceta-Produkte */}
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="featured"
            onViewDetails={(id) => navigate(`/products/${id}`)}
          />
        ))}
      </ProductGrid>
    </div>
  );
}
