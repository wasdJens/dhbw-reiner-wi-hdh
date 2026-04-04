/**
 * Warenkorb-Typen
 *
 * Der Warenkorb speichert Produkt-Varianten mit Mengenangaben.
 * Aktuell wird der Warenkorb im Service-Layer als Modul-Variable gehalten.
 * In einem späteren Semester könnte dies durch einen Backend-gestützten Warenkorb ersetzt werden.
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
