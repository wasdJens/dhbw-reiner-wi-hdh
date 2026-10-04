// Ziel: Egal was reinkommt, es kommt immer dasselbe Format raus.

function normalizeProduct(raw: any): Product {
  return {
    id: Number(raw.id),

    // Leerzeichen entfernen, erster Buchstabe groß
    name: capitalizeFirst(String(raw.name).trim()),

    // Verschiedene Preisformate akzeptieren
    price: parsePrice(raw.price),

    // Kategorie: Konsistente Schreibweise
    category: normalizeCategory(raw.category),

    // Boolean: "yes", "true", 1, true → true
    inStock: normalizeBoolean(raw.inStock ?? raw.stock ?? raw.available),
  };
}

function capitalizeFirst(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// parsePrice und normalizeBoolean kennt ihr schon aus dem Service-Beispiel