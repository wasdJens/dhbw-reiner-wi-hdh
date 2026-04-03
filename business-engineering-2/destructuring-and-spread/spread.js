// Objekte zusammenführen
const defaults = { color: "blau", size: "M", quantity: 1 };
const userChoice = { color: "rot", quantity: 3 };

const finalOrder = { ...defaults, ...userChoice };
// { color: "rot", size: "M", quantity: 3 }
// userChoice überschreibt defaults

// Arrays zusammenführen
const germanProducts = [{ name: "Widget" }, { name: "Gadget" }];
const usProducts = [{ name: "Gizmo" }];

const allProducts = [...germanProducts, ...usProducts];
// [{ name: "Widget" }, { name: "Gadget" }, { name: "Gizmo" }]

// Kopie erstellen (wichtig für Sortierung!)
const sorted = [...products].sort((a, b) => a.price - b.price);
// Original bleibt unverändert! sorted ist eine neue Kopie.
