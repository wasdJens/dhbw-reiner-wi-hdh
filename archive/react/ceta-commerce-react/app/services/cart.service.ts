/**
 * Cart Service – Warenkorbverwaltung
 *
 * Der Warenkorb wird als Modul-Variable gehalten (In-Memory State).
 * Das bedeutet: Der Warenkorb lebt so lange wie die Browser-Session.
 *
 * TODO: In einem späteren Semester durch eine API ersetzen:
 *       POST /api/cart/items, DELETE /api/cart/items/:id, etc.
 *       Die Funktionssignaturen bleiben gleich.
 *
 * Architektur-Hinweis:
 * Dieser Service enthält die gesamte Warenkorb-Logik.
 * Komponenten rufen nur Service-Funktionen auf – sie berechnen keine Preise,
 * prüfen keine Mengen und manipulieren keine Daten direkt.
 */

import type { Cart, CartItem } from "../types";
import { getProductById, getVariantById } from "./product.service";

// ── Interner State (Modul-Variable) ─────────────────────────

let cart: Cart = {
  items: [],
};

// ── Callback für State-Änderungen ───────────────────────────

type CartListener = () => void;
const listeners: CartListener[] = [];

/** Listener registrieren, der bei Warenkorb-Änderungen aufgerufen wird */
export function onCartChange(listener: CartListener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// ── Öffentliche API ─────────────────────────────────────────

/** Aktuellen Warenkorb abrufen */
export function getCart(): Cart {
  return cart;
}

/** Artikel zum Warenkorb hinzufügen */
export function addToCart(
  productId: string,
  variantId: string,
  quantity: number = 1
): void {
  const existing = cart.items.find(
    (item) => item.productId === productId && item.variantId === variantId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, variantId, quantity });
  }

  cart = { ...cart, items: [...cart.items] };
  notifyListeners();
}

/** Artikel aus dem Warenkorb entfernen */
export function removeFromCart(productId: string, variantId: string): void {
  cart = {
    ...cart,
    items: cart.items.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    ),
  };
  notifyListeners();
}

/** Menge eines Artikels ändern */
export function updateQuantity(
  productId: string,
  variantId: string,
  quantity: number
): void {
  if (quantity <= 0) {
    removeFromCart(productId, variantId);
    return;
  }

  const item = cart.items.find(
    (i) => i.productId === productId && i.variantId === variantId
  );
  if (item) {
    item.quantity = quantity;
    cart = { ...cart, items: [...cart.items] };
    notifyListeners();
  }
}

/** Gesamtsumme des Warenkorbs berechnen */
export function getCartTotal(): number {
  return cart.items.reduce((sum, item) => {
    const variant = getVariantById(item.productId, item.variantId);
    if (!variant) return sum;
    return sum + variant.price * item.quantity;
  }, 0);
}

/** Gesamtanzahl der Artikel im Warenkorb */
export function getCartItemCount(): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Warenkorb leeren */
export function clearCart(): void {
  cart = { items: [] };
  notifyListeners();
}
