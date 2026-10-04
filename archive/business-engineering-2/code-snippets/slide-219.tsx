// app/components/product/ProductCard.tsx – Event nach oben geben

function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const startingPrice = getStartingPrice(product);

  return (
    <Card>
      <CardBody>
        <Badge label={product.category} variant="accent" />
        <h3>{product.name}</h3>
        <PriceDisplay price={startingPrice} showFromPrefix />
      </CardBody>
      <CardFooter>
        {/* onClick: Wenn der Button geklickt wird */}
        <Button
          label="Details ansehen"
          variant="outline"
          onClick={() => onViewDetails(product.id)}
        />
      </CardFooter>
    </Card>
  );
}

// Verwendung in ProductsPage:
export default function ProductsPage() {
  const navigate = useNavigate();

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
    // Navigiert zu z.B. /products/ceta-core
  };

  return (
    <ProductGrid>
      {getAllProducts().map((p) => (
        <ProductCard key={p.id} product={p} onViewDetails={handleViewDetails} />
      ))}
    </ProductGrid>
  );
}
