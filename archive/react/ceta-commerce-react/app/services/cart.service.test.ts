/**
 * Tests für den Cart Service
 *
 * Diese Tests prüfen die Warenkorb-Logik:
 * Hinzufügen, Entfernen, Mengen ändern, Gesamtsumme berechnen.
 */

import { describe, test, expect, beforeEach } from "vitest";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  getCartItemCount,
  clearCart,
} from "./cart.service";

// Vor jedem Test: Warenkorb leeren
beforeEach(() => {
  clearCart();
});

describe("cart.service", () => {
  test("leerer Warenkorb hat 0 Artikel", () => {
    expect(getCartItemCount()).toBe(0);
    expect(getCart().items.length).toBe(0);
  });

  test("addToCart fügt einen Artikel hinzu", () => {
    addToCart("ceta-core", "ceta-core-basic");
    expect(getCartItemCount()).toBe(1);
    expect(getCart().items[0].productId).toBe("ceta-core");
  });

  test("addToCart erhöht die Menge bei gleichem Artikel", () => {
    addToCart("ceta-core", "ceta-core-basic");
    addToCart("ceta-core", "ceta-core-basic");
    expect(getCartItemCount()).toBe(2);
    expect(getCart().items.length).toBe(1); // Nur 1 Eintrag, Menge = 2
  });

  test("verschiedene Varianten sind separate Einträge", () => {
    addToCart("ceta-core", "ceta-core-basic");
    addToCart("ceta-core", "ceta-core-pro");
    expect(getCart().items.length).toBe(2);
  });

  test("removeFromCart entfernt einen Artikel", () => {
    addToCart("ceta-core", "ceta-core-basic");
    removeFromCart("ceta-core", "ceta-core-basic");
    expect(getCartItemCount()).toBe(0);
  });

  test("updateQuantity ändert die Menge", () => {
    addToCart("ceta-core", "ceta-core-basic");
    updateQuantity("ceta-core", "ceta-core-basic", 5);
    expect(getCartItemCount()).toBe(5);
  });

  test("updateQuantity mit 0 entfernt den Artikel", () => {
    addToCart("ceta-core", "ceta-core-basic");
    updateQuantity("ceta-core", "ceta-core-basic", 0);
    expect(getCartItemCount()).toBe(0);
  });

  test("getCartTotal berechnet korrekte Summe", () => {
    addToCart("ceta-core", "ceta-core-basic"); // 249€
    const total = getCartTotal();
    expect(total).toBe(249);
  });

  test("getCartTotal mit Mengen", () => {
    addToCart("ceta-core", "ceta-core-basic", 2); // 2 × 249€
    expect(getCartTotal()).toBe(498);
  });

  test("clearCart leert den Warenkorb", () => {
    addToCart("ceta-core", "ceta-core-basic");
    addToCart("ceta-level", "ceta-level-pro");
    clearCart();
    expect(getCartItemCount()).toBe(0);
    expect(getCartTotal()).toBe(0);
  });
});
