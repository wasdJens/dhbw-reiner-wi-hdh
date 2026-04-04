// ✅ SMART: Kennt die Geschäftslogik. Nutzt Dumb Components für die Darstellung.

// app/routes/products.tsx
export default function ProductsPage() {
  // State verwalten
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Geschäftslogik – Produkte filtern via Service
  const products = searchTerm.trim().length > 0
    ? searchProducts(searchTerm)    // ← Service-Aufruf
    : getAllProducts();              // ← Service-Aufruf

  // Callback für Navigation zur Detailseite
  function handleViewDetails(productId: string) {
    navigate(`/products/${productId}`);
  }

  // Dumb Components orchestrieren
  return (
    <div>
      <PageHeader title="Produkte" />
      <div className="container">
        <Input
          label="Produkte durchsuchen"
          value={searchTerm}
          onChange={setSearchTerm}        {/* Event fließt NACH OBEN */}
          placeholder="z.B. Schutzhelm…"
        />
        <ProductGrid>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              variant="featured"
              onViewDetails={handleViewDetails}  {/* Event fließt NACH OBEN */}
            />
          ))}
        </ProductGrid>
      </div>
    </div>
  );
}