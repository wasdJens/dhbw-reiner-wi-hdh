// Rohdaten → UI-optimierte Daten

interface ProductDisplay extends Product {
  // Berechnete Felder für die UI
  formattedPrice: string;
  stockLabel: string;
  stockColor: string;
  slug: string; // URL-freundlicher Name
}

function transformForDisplay(product: Product): ProductDisplay {
  return {
    ...product,

    // Preis formatiert für die Anzeige
    formattedPrice: new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(product.price),

    // Stock-Status als lesbarer Text
    stockLabel: product.inStock ? "Auf Lager" : "Nicht verfügbar",
    stockColor: product.inStock ? "green" : "red",

    // URL-freundlicher Name: "Widget Pro" → "widget-pro"
    slug: product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  };
}

// Jetzt kann die UI einfach zugreifen:
// <span style={{ color: product.stockColor }}>{product.stockLabel}</span>
// <Link to={`/products/${product.slug}`}>