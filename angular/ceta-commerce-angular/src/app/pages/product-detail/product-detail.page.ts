/**
 * Product Detail Page – Produktdetailseite mit Variantenauswahl
 *
 * SMART COMPONENT: Nutzt Route-Parameter (:productId), verwaltet ausgewählte Variante,
 * und ermöglicht das Hinzufügen zum Warenkorb.
 *
 * Angular-Konzepte: inject(), input() (route param), signal(), computed(), @if
 */

import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { VariantPickerComponent } from '../../components/product/variant-picker.component';
import { FeatureListComponent } from '../../components/product/feature-list.component';
import { PriceDisplayComponent } from '../../components/product/price-display.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    RouterLink,
    PageHeaderComponent,
    VariantPickerComponent,
    FeatureListComponent,
    PriceDisplayComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './product-detail.page.html',
  styleUrl: './product-detail.page.css',
})
export default class ProductDetailPage {
  protected readonly router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  /** Route parameter bound via withComponentInputBinding() */
  productId = input.required<string>();

  product = computed(() => this.productService.getProductById(this.productId()));

  selectedVariantId = signal('');

  selectedVariant = computed(() => {
    const p = this.product();
    if (!p) return null;
    // Default to first variant if none selected
    const id = this.selectedVariantId() || p.variants[0]?.id || '';
    return p.variants.find((v) => v.id === id) ?? null;
  });

  addedToCart = signal(false);

  protected categoryEmoji = computed(() => {
    const cat = this.product()?.category;
    if (cat === 'Sicherheit') return '🪖';
    if (cat === 'Vermessung') return '📐';
    if (cat === 'Sicherheitstechnik') return '🛡️';
    return '📦';
  });

  handleAddToCart(): void {
    const p = this.product();
    const v = this.selectedVariant();
    if (!p || !v || !v.inStock) return;

    this.cartService.addToCart(p.id, v.id);
    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }
}
