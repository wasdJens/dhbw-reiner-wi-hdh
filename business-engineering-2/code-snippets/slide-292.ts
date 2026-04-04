// Was macht einen Datensatz gültig?
// Definiert klare Regeln:

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateProduct(raw: any): ValidationResult {
  const errors: string[] = [];

  // Pflichtfelder prüfen
  if (!raw.id) errors.push("ID fehlt");
  if (!raw.name || String(raw.name).trim() === "") errors.push("Name fehlt");
  if (raw.price === undefined || raw.price === null) errors.push("Preis fehlt");

  // Wertebereiche prüfen
  const price = parsePrice(raw.price);
  if (price < 0) errors.push(`Ungültiger Preis: ${raw.price}`);
  if (price > 99999) errors.push(`Preis unrealistisch hoch: ${raw.price}`);

  // Typprüfungen
  if (raw.id && typeof raw.id !== "number")
    errors.push(`ID ist keine Zahl: ${raw.id}`);

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Anwendung:
rawData.forEach((item) => {
  const result = validateProduct(item);
  if (!result.isValid) {
    console.warn(`Datensatz ${item.id || "???"} ungültig:`, result.errors);
  }
});