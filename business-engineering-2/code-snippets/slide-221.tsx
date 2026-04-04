// React – Die Ceta ProductsPage: State kombinieren
export default function ProductsPage() {
  const navigate = useNavigate();

  // Alle Produkte: kein State, direkt aus Service
  const allProducts = getAllProducts();
  // Ceta hat 3 Produkte: CetaCore (Sicherheit), CetaLevel (Vermessung), CetaGuard (Sicherheitstechnik)

  // Mehrere State-Werte die zusammenspielen
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("alle");

  // Abgeleitete Daten – KEIN State! Berechnet aus State.
  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "alle" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["alle", ...getCategories()];
  // getCategories() → ["Sicherheit", "Sicherheitstechnik", "Vermessung"]

  return (
    <div>
      <Input
        label="Suche"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="z.B. CetaCore…"
      />
      <Select
        label="Kategorie"
        value={selectedCategory}
        onChange={setSelectedCategory}
        options={categories.map((c) => ({ value: c, label: c }))}
      />
      <p>{filteredProducts.length} Produkte gefunden</p>
      <ProductGrid>
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            variant="featured"
            onViewDetails={(id) => navigate(`/products/${id}`)}
          />
        ))}
      </ProductGrid>
    </div>
  );
}
