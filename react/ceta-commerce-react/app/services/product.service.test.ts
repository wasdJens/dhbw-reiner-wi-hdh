/**
 * Tests für den Product Service
 *
 * Diese Tests prüfen die Kernfunktionen des Produktservice.
 * Sie stellen sicher, dass Daten korrekt geladen, gefiltert und gefunden werden.
 */

import { describe, test, expect } from "vitest";
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  searchProducts,
  getVariantById,
  getCategories,
  getStartingPrice,
} from "./product.service";

describe("product.service", () => {
  test("getAllProducts gibt ein nicht-leeres Array zurück", () => {
    const products = getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  test("jedes Produkt hat alle Pflichtfelder", () => {
    getAllProducts().forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("slug");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("variants");
      expect(product.variants.length).toBeGreaterThan(0);
    });
  });

  test("jede Variante hat gültige Preise", () => {
    getAllProducts().forEach((product) => {
      product.variants.forEach((variant) => {
        expect(typeof variant.price).toBe("number");
        expect(variant.price).toBeGreaterThan(0);
      });
    });
  });

  test("getProductById findet existierendes Produkt", () => {
    const product = getProductById("ceta-core");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("CetaCore");
  });

  test("getProductById gibt null für ungültige ID", () => {
    expect(getProductById("nicht-vorhanden")).toBeNull();
  });

  test("getProductBySlug findet Produkt über Slug", () => {
    const product = getProductBySlug("ceta-level");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("CetaLevel");
  });

  test("searchProducts findet nach Name", () => {
    const results = searchProducts("CetaCore");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("CetaCore");
  });

  test("searchProducts findet nach Kategorie", () => {
    const results = searchProducts("Vermessung");
    expect(results.length).toBeGreaterThan(0);
  });

  test("leere Suche gibt alle Produkte zurück", () => {
    expect(searchProducts("").length).toBe(getAllProducts().length);
  });

  test("getVariantById findet existierende Variante", () => {
    const variant = getVariantById("ceta-core", "ceta-core-pro");
    expect(variant).not.toBeNull();
    expect(variant?.tier).toBe("pro");
  });

  test("getVariantById gibt null für ungültige Kombination", () => {
    expect(getVariantById("ceta-core", "falsche-id")).toBeNull();
    expect(getVariantById("falsche-id", "ceta-core-pro")).toBeNull();
  });

  test("getCategories gibt sortierte, einzigartige Kategorien", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    // Prüfe Sortierung
    const sorted = [...categories].sort();
    expect(categories).toEqual(sorted);
    // Prüfe Einzigartigkeit
    expect(new Set(categories).size).toBe(categories.length);
  });

  test("getStartingPrice gibt den günstigsten Preis", () => {
    const product = getProductById("ceta-core");
    expect(product).not.toBeNull();
    if (product) {
      const startingPrice = getStartingPrice(product);
      const minPrice = Math.min(...product.variants.map((v) => v.price));
      expect(startingPrice).toBe(minPrice);
    }
  });
});
