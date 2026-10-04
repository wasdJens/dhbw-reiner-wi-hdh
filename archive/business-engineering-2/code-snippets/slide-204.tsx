// 1. Imports
import type { Product } from "../../types";
import { Card, CardBody, CardFooter } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PriceDisplay } from "./PriceDisplay";
import { getStartingPrice } from "../../services/product.service";

// 2. Interface für Props (TypeScript)
interface ProductCardProps {
  product: Product;
  variant?: "featured" | "compact";
  onViewDetails: (productId: string) => void;
}

// 3. Die Komponente ist eine Funktion
export function ProductCard({
  product,
  variant = "compact",
  onViewDetails,
}: ProductCardProps) {
  // 4. Hier lebt die Logik (Berechnungen, etc.)
  const startingPrice = getStartingPrice(product);
  // getStartingPrice: Math.min(...product.variants.map(v => v.price))

  // 5. Return = Was auf dem Bildschirm erscheint
  return (
    <Card>
      <CardBody>
        <Badge label={product.category} variant="accent" />
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
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
