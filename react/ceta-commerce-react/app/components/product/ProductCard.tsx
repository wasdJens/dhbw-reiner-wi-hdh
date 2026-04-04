/**
 * ProductCard – Produktkarte für Übersichtsseiten
 *
 * DUMB COMPONENT: Zeigt ein Produkt als Karte an.
 * Bekommt alle Daten über Props – weiß nichts über Services oder Routing.
 *
 * Demonstriert:
 * - Component Composition (Card + CardBody + CardFooter)
 * - Props-Interface als Vertrag
 * - Bedingtes Rendering (variant prop)
 */

import type { Product } from "../../types";
import { Card, CardBody, CardFooter } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PriceDisplay } from "./PriceDisplay";
import { getStartingPrice } from "../../services/product.service";

interface ProductCardProps {
  product: Product;
  variant?: "featured" | "compact";
  onViewDetails: (productId: string) => void;
}

export function ProductCard({
  product,
  variant = "compact",
  onViewDetails,
}: ProductCardProps) {
  const startingPrice = getStartingPrice(product);

  return (
    <Card>
      {variant === "featured" && (
        <div
          className="card__image"
          style={{ backgroundColor: "var(--color-gray-100)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontSize: "3rem" }}>
            {product.category === "Sicherheit" && "🪖"}
            {product.category === "Vermessung" && "📐"}
            {product.category === "Sicherheitstechnik" && "🛡️"}
          </span>
        </div>
      )}
      <CardBody>
        <Badge label={product.category} variant="accent" />
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.shortDescription}</p>
        <PriceDisplay price={startingPrice} showFromPrefix />
      </CardBody>
      <CardFooter>
        <Button
          label="Details ansehen"
          variant="outline"
          onClick={() => onViewDetails(product.id)}
        />
      </CardFooter>
    </Card>
  );
}
