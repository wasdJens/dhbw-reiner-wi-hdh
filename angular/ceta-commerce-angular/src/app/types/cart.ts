/**
 * Warenkorb-Typen
 *
 * Der Warenkorb speichert Produkt-Varianten mit Mengenangaben.
 */

/** Einzelne Position im Warenkorb */
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

/** Gesamter Warenkorb */
export interface Cart {
  items: CartItem[];
}
