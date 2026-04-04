// src/services/productService.ts

import type { Product, ProductVariant } from "../types/product";
import rawData from "../data/products.json";

// ── Private Hilfsfunktionen (nicht exportiert) ────────────────

function parsePrice(value: any): number {
  if (typeof value === "number" && value >= 0) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(",", ".").trim();
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed) && parsed >= 0) return parsed;
  }
  return 0; // Fallback: kostenlos statt kaputt
}

function normalizeBoolean(value: any): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return ["true", "yes", "1", "ja"].includes(value.toLowerCase());
  }
  return false; // Im Zweifel: nicht verfügbar
}

function normalizeTier(value: any): "basic" | "pro" | "enterprise" {
  if (typeof value !== "string") return "basic";
  const lower = value.toLowerCase().trim();
  if (lower === "pro" || lower === "enterprise") return lower;
  return "basic"; // Fallback für falsches Casing ("Basic", "ENTERPRISE", ...)
}

function normalizeVariant(raw: any): ProductVariant | null {
  if (!raw || typeof raw !== "object") return null;
  if (!raw.id || !raw.name) return null; // Pflichtfelder

  // Property-Name-Fallback: in_stock und available als Alternativen zu inStock
  const inStockRaw = raw.inStock ?? raw.in_stock ?? raw.available;

  return {
    id: String(raw.id).trim(),
    tier: normalizeTier(raw.tier),
    name: String(raw.name).trim(),
    price: parsePrice(raw.price),
    features: Array.isArray(raw.features) ? raw.features : [],
    inStock: normalizeBoolean(inStockRaw),
  };
}

function normalizeProduct(raw: any): Product | null {
  if (!raw || typeof raw !== "object") return null;

  // Pflichtfelder: id und name müssen vorhanden und nicht leer sein
  if (!raw.id || !raw.name || String(raw.name).trim() === "") return null;

  // variants: null oder kein Array → Produkt ungültig
  if (!Array.isArray(raw.variants) || raw.variants.length === 0) return null;

  const variants = raw.variants
    .map(normalizeVariant)
    .filter((v): v is ProductVariant => v !== null);

  if (variants.length === 0) return null; // Alle Varianten ungültig

  // Slug aus Name generieren falls nicht vorhanden
  const slug =
    raw.slug && String(raw.slug).trim() !== ""
      ? String(raw.slug).trim()
      : String(raw.name).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return {
    id: String(raw.id).trim(),
    name: String(raw.name).trim(),
    slug,
    category:
      raw.category && String(raw.category).trim() !== ""
        ? String(raw.category).trim()
        : "Sonstige",
    shortDescription: raw.shortDescription
      ? String(raw.shortDescription).trim()
      : "",
    description: raw.description ? String(raw.description).trim() : "",
    imageUrl: raw.imageUrl ? String(raw.imageUrl).trim() : "",
    variants,
  };
}

// ── Daten laden und bereinigen ────────────────────────────────

// Einmal bereinigen beim Import – nicht bei jedem Aufruf
const products: Product[] = rawData
  .map(normalizeProduct)
  .filter((p): p is Product => p !== null) // Ungültige entfernen
  .filter(
    (p, index, arr) => arr.findIndex((item) => item.id === p.id) === index, // Duplikate entfernen
  );

// ── Öffentliche API (exportiert) ──────────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | null {
  return products.find((p) => p.id === id) ?? null;
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (q.length === 0) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );
}

export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}

export function getStartingPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}