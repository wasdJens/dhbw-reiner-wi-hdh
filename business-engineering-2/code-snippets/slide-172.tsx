export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const products =
    searchTerm.trim().length > 0
      ? searchProducts(searchTerm)
      : getAllProducts();

  return (
    <div>
      <PageHeader title="Produkte" />
      <section className="section">
        <div className="container">
          <Input
            label="Produkte durchsuchen"
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="z.B. Schutzhelm, Vermessung…"
          />
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
      </section>
    </div>
  );
}
