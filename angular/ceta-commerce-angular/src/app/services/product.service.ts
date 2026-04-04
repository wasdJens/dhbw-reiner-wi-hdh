/**
 * Product Service – Zugriff auf Produktdaten
 *
 * Dieser Service kapselt den gesamten Datenzugriff für Produkte.
 * Keine Komponente greift direkt auf die Rohdaten zu.
 *
 * Angular-Konzept: Injectable Service mit providedIn: 'root' (Singleton).
 */

import { Injectable } from '@angular/core';
import type { Product, ProductVariant } from '../types';
import { products as rawProducts } from '../data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = rawProducts;

  /** Alle Produkte abrufen */
  getAllProducts(): Product[] {
    return this.products;
  }

  /** Produkt anhand der ID finden */
  getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) ?? null;
  }

  /** Produkt anhand des URL-Slugs finden */
  getProductBySlug(slug: string): Product | null {
    return this.products.find((p) => p.slug === slug) ?? null;
  }

  /** Produkte nach Suchbegriff filtern (Name, Kategorie, Beschreibung) */
  searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (q.length === 0) return this.products;

    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    );
  }

  /** Bestimmte Variante eines Produkts finden */
  getVariantById(productId: string, variantId: string): ProductVariant | null {
    const product = this.getProductById(productId);
    if (!product) return null;
    return product.variants.find((v) => v.id === variantId) ?? null;
  }

  /** Alle einzigartigen Kategorien abrufen */
  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))].sort();
  }

  /** Günstigsten Preis eines Produkts ermitteln (für Übersichtsseiten) */
  getStartingPrice(product: Product): number {
    return Math.min(...product.variants.map((v) => v.price));
  }
}
