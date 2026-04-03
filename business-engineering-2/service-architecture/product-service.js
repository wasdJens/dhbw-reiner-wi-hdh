import { products } from "./products.js";

// Alle Produkte abrufen
export function getAllProducts() {
  return products;
}

// Produkt nach ID finden
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

// Produkte nach Kategorie filtern
export function getProductsByCategory(category) {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}

// Produkte durchsuchen
export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lowerQuery));
}

// Top-Produkte nach Umsatz
export function getTopProducts(limit = 5) {
  return [...products]
    .sort((a, b) => b.price * b.sold - a.price * a.sold)
    .slice(0, limit);
}

export async function getAllProducts() {
  const response = await fetch("https://api.example.com/products");
  return response.json();
}
