/**
 * Produkt-Typen für den Ceta Commerce Shop
 *
 * Ceta verkauft drei Produkte in jeweils drei Varianten (Basic / Pro / Enterprise).
 * Die Varianten unterscheiden sich in Funktionsumfang und Preis.
 */

/** Produktvariante – z.B. "CetaCore Basic" oder "CetaGuard Enterprise" */
export interface ProductVariant {
  id: string;
  tier: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
  features: string[];
  inStock: boolean;
}

/** Hauptprodukt – z.B. "CetaCore" */
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  variants: ProductVariant[];
}
