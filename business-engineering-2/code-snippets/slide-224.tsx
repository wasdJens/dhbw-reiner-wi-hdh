// TypeScript macht den Vertrag explizit:

// app/components/product/ProductCard.tsx – der tatsächliche Ceta-Vertrag:
interface ProductCardProps {
  // Pflicht-Props
  product: Product;                          // Welches Produkt? (mit verschachtelten Varianten)

  // Optionale Props mit Defaults
  variant?: "featured" | "compact";          // Wie darstellen? ("compact" ist Default)

  // Event-Handler (Pflicht – keine optionale Navigation)
  onViewDetails: (productId: string) => void; // Was passiert beim Klick auf "Details"?
}

// Die Komponente definiert was sie braucht.
// Die Eltern-Komponente muss den Vertrag erfüllen.

// ✅ Vertrag erfüllt:
<ProductCard product={cetaCore} onViewDetails={handleView} />

// ❌ TypeScript-Fehler: product fehlt!
<ProductCard onViewDetails={handleView} />

// ❌ TypeScript-Fehler: falscher Typ!
<ProductCard product="CetaCore" onViewDetails={handleView} />
//                    ↑ string statt Product → TypeScript meckert!