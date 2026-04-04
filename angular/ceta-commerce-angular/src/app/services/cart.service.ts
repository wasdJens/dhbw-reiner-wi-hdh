/**
 * Cart Service – Warenkorbverwaltung mit Angular Signals
 *
 * Der Warenkorb nutzt signal() für reaktiven State.
 * Abgeleitete Werte (Anzahl, Gesamtpreis) werden mit computed() berechnet.
 *
 * Angular-Konzepte: signal(), computed(), inject()
 */

import { computed, Injectable, signal } from '@angular/core';
import type { Cart } from '../types';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly productService = new ProductService();

  /** Reaktiver Warenkorb-State */
  readonly cart = signal<Cart>({ items: [] });

  /** Abgeleiteter Wert: Gesamtanzahl der Artikel */
  readonly cartItemCount = computed(() =>
    this.cart().items.reduce((sum, item) => sum + item.quantity, 0),
  );

  /** Abgeleiteter Wert: Gesamtsumme */
  readonly cartTotal = computed(() =>
    this.cart().items.reduce((sum, item) => {
      const variant = this.productService.getVariantById(item.productId, item.variantId);
      if (!variant) return sum;
      return sum + variant.price * item.quantity;
    }, 0),
  );

  /** Artikel zum Warenkorb hinzufügen */
  addToCart(productId: string, variantId: string, quantity: number = 1): void {
    this.cart.update((cart) => {
      const existing = cart.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (existing) {
        return {
          items: cart.items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return { items: [...cart.items, { productId, variantId, quantity }] };
    });
  }

  /** Artikel aus dem Warenkorb entfernen */
  removeFromCart(productId: string, variantId: string): void {
    this.cart.update((cart) => ({
      items: cart.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId),
      ),
    }));
  }

  /** Menge eines Artikels ändern */
  updateQuantity(productId: string, variantId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId, variantId);
      return;
    }

    this.cart.update((cart) => ({
      items: cart.items.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      ),
    }));
  }

  /** Warenkorb leeren */
  clearCart(): void {
    this.cart.set({ items: [] });
  }
}
