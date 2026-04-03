type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  quantity: number;
};

// TypeScript prüft jetzt ALLES:
const product: Product = {
  id: 1,
  name: "Widget Pro",
  price: 29.99,
  category: "Werkzeuge",
  inStock: true,
  quantity: 150,
};

// ❌ Fehler: 'prcie' existiert nicht auf Product
console.log(product.prcie);

// ❌ Fehler: Property 'color' fehlt im Typ Product
const badProduct: Product = {
  id: 2,
  name: "Gadget",
  price: 49.99,
  // TypeScript sagt: category, inStock, quantity fehlen!
};
