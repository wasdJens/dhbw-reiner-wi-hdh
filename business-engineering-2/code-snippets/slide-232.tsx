// ❌ FALSCH: Array direkt verändern
const handleAdd = (product: Product) => {
  cart.push({ product, quantity: 1 }); // React merkt die Änderung NICHT
  setCart(cart); // Selbe Referenz → kein Re-Render
};

// ✅ RICHTIG: Neues Array erstellen
const handleAdd = (product: Product) => {
  setCart((prev) => [...prev, { product, quantity: 1 }]);
  // Spread-Operator erstellt eine Kopie + neues Element
};

// ❌ FALSCH: 3 State-Updates → 3 Re-Renders
setSearchTerm(newTerm);
setSelectedCategory(newCat);
setSortBy(newSort);

// ✅ BESSER: Zusammengehörenden State zusammenfassen
const [filters, setFilters] = useState({
  searchTerm: "",
  category: "alle",
  sortBy: "name" as const,
});
setFilters((prev) => ({ ...prev, searchTerm: newTerm, category: newCat }));

// ❌ FALSCH: State-Update im Render
function BadComponent() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // 💥 Unendliche Schleife!
  return <p>{count}</p>;
}

// State-Updates gehören in Event-Handler oder useEffect, NICHT in den Render-Zyklus.