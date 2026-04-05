// Ein Produktkatalog
const catalog = [
  { id: 1, name: "Widget Pro", price: 29.99, category: "Werkzeuge" },
  { id: 2, name: "Gadget X", price: 49.99, category: "Elektronik" },
  { id: 3, name: "Super Widget", price: 19.99, category: "Werkzeuge" },
  { id: 4, name: "Mega Gadget", price: 99.99, category: "Elektronik" },
  { id: 5, name: "Mini Tool", price: 9.99, category: "Werkzeuge" }
];

// Wie viele Produkte?
console.log(catalog.length);  // 5

// Erstes Produkt
console.log(catalog[0].name);  // "Widget Pro"

// Letztes Produkt
console.log(catalog[catalog.length - 1].name);  // "Mini Tool"