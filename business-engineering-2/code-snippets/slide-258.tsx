// Route definiert in routes.ts:
// route("products/:productId", "routes/product-detail.tsx")

import { useParams, Link } from "react-router"; // ← v7: kein "-dom"
import { getProductById } from "../services";

export default function ProductDetailPage() {
  // :productId aus der URL lesen
  const { productId } = useParams();
  const product = productId ? getProductById(productId) : null;
  //                                           ↑ String-ID! Kein Number(id) nötig.
  // getProductById("ceta-core") → CetaCore
  // getProductById("ceta-level") → CetaLevel
  // getProductById("ceta-guard") → CetaGuard

  // Was wenn das Produkt nicht existiert?
  if (!product) {
    return (
      <div>
        <h1>Produkt nicht gefunden</h1>
        <p>Das Produkt &quot;{productId}&quot; existiert nicht.</p>
        <Link to="/products">Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.shortDescription}</p>
      <p>Kategorie: {product.category}</p>
      <p>Varianten: {product.variants.length}</p>
      {/* Varianten: basic / pro / enterprise */}
    </div>
  );
}