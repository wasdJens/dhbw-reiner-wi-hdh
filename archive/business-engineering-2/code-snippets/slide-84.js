// Ein Produkt im Katalog
const product = {
  id: 1,
  name: "Widget Pro",
  price: 29.99,
  category: "Werkzeuge",
  inStock: true,
  quantity: 150,
  supplier: {
    name: "Zulieferer AG",
    deliveryDays: 3
  }
};

// Zugriff
console.log(product.name);           // "Widget Pro"
console.log(product.supplier.name);  // "Zulieferer AG"

// Ein Kunde
const customer = {
  id: 42,
  firstName: "Maria",
  lastName: "Schmidt",
  email: "m.schmidt@firma.de",
  address: {
    street: "Hauptstraße 1",
    city: "Stuttgart",
    zip: "70173"
  }
};