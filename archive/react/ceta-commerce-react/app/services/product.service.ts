/**
 * Product Service – Zugriff auf Produktdaten
 *
 * Dieser Service kapselt den gesamten Datenzugriff für Produkte.
 * Keine Komponente greift direkt auf die Rohdaten zu.
 *
 * TODO: Die statischen Imports durch fetch('/api/products') ersetzen,
 *       wenn das Backend im nächsten Semester verfügbar ist.
 *       Die Funktionssignaturen bleiben gleich – nur die Datenquelle ändert sich.
 */

import type { Product, ProductVariant } from "../types";
import { products as rawProducts } from "../data";

// ── Daten einmal laden und bereinigen ──────────────────────

const products: Product[] = rawProducts;

// ── Öffentliche API ────────────────────────────────────────

/** Alle Produkte abrufen */
export function getAllProducts(): Product[] {
  return products;
}

/** Produkt anhand der ID finden */
export function getProductById(id: string): Product | null {
  return products.find((p) => p.id === id) ?? null;
}

/** Produkt anhand des URL-Slugs finden */
export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

/** Produkte nach Suchbegriff filtern (Name, Kategorie, Beschreibung) */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (q.length === 0) return products;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
  );
}

/** Bestimmte Variante eines Produkts finden */
export function getVariantById(
  productId: string,
  variantId: string
): ProductVariant | null {
  const product = getProductById(productId);
  if (!product) return null;
  return product.variants.find((v) => v.id === variantId) ?? null;
}

/** Alle einzigartigen Kategorien abrufen */
export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}

/** Günstigsten Preis eines Produkts ermitteln (für Übersichtsseiten) */
export function getStartingPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}
