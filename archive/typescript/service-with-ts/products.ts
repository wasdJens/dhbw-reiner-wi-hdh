import Product from "./product.interface.ts";

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Elektronik",
    inStock: true,
    quantity: 15,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 29.99,
    category: "Zubehör",
    inStock: true,
    quantity: 50,
  },
  {
    id: 3,
    name: "USB-C Kabel",
    price: 12.99,
    category: "Zubehör",
    inStock: true,
    quantity: 100,
  },
  {
    id: 4,
    name: 'Monitor 27"',
    price: 349.99,
    category: "Elektronik",
    inStock: false,
    quantity: 0,
  },
  {
    id: 5,
    name: "Mechanische Tastatur",
    price: 129.99,
    category: "Zubehör",
    inStock: true,
    quantity: 8,
  },
  {
    id: 6,
    name: "Webcam Full HD",
    price: 79.99,
    category: "Elektronik",
    inStock: true,
    quantity: 25,
  },
];
