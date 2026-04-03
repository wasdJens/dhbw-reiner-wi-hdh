import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getTopProducts,
} from "./product-service.js";

// Der Code liest sich wie ein Gespräch:
console.log("=== Alle Produkte ===");
const all = getAllProducts();
console.log(`${all.length} Produkte im Katalog`);

console.log("\n=== Office-Produkte ===");
const office = getProductsByCategory("Office");
office.forEach((p) => console.log(`  ${p.name} – ${p.price}€`));

console.log("\n=== Suche: 'keyboard' ===");
const results = searchProducts("keyboard");
results.forEach((p) => console.log(`  ${p.name} – ${p.price}€`));

console.log("\n=== Top 3 nach Umsatz ===");
const top = getTopProducts(3);
top.forEach((p) => {
  const revenue = p.price * p.sold;
  console.log(`  ${p.name} – ${revenue.toFixed(2)}€ Umsatz`);
});
