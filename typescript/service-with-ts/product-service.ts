import Product from "./product.interface.ts";
import { products } from "./products.ts";

// Nachher (TypeScript): Klar definiert was rein und raus geht
function getProductById(id: number): Product | null {
  return products.find((p) => p.id === id) ?? null;
}

// Der Aufrufer weiß jetzt:
// - Er MUSS eine number übergeben (keinen String)
// - Er bekommt ein Product ODER null zurück
// - Er muss den null-Fall behandeln

const product = getProductById(1);
if (product) {
  console.log(product.name); // ✅ TypeScript weiß: hier ist es ein Product
} else {
  console.log("Nicht gefunden"); // ✅ null-Fall behandelt
}

// Ohne die Prüfung:
console.log(product.name); // ❌ TypeScript warnt: product könnte null sein
