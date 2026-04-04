export default function ProductsPage() {
  const navigate = useNavigate();

  // useState: [aktuellerWert, Funktion zum Ändern]
  const [searchTerm, setSearchTerm] = useState("");
  //          ↑                ↑                ↑
  //    Aktueller Wert   Setter-Funktion   Startwert

  // Wenn sich searchTerm ändert, wird die Komponente NEU gerendert
  // React berechnet automatisch was sich in der UI geändert hat
  const products =
    searchTerm.trim().length > 0
      ? searchProducts(searchTerm) // Filtert CetaCore, CetaLevel, CetaGuard
      : getAllProducts();

  return (
    <div>
      <Input
        label="Produkte durchsuchen"
        value={searchTerm}
        onChange={setSearchTerm} // Setter direkt übergeben
        placeholder="z.B. Schutzhelm, Vermessung…"
      />
      <p>{products.length} Ergebnisse</p>
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
