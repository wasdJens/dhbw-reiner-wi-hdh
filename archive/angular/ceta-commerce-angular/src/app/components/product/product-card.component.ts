/**
 * ProductCard – Produktkarte für Übersichtsseiten
 *
 * DUMB COMPONENT: Zeigt ein Produkt als Karte an.
 * Bekommt alle Daten über input() – weiß nichts über Services oder Routing.
 *
 * Angular-Konzepte: input(), output(), inject(), @if, Component Composition
 */

import { Component, inject, input, output } from '@angular/core';
import type { Product } from '../../types';
import { ProductService } from '../../services/product.service';
import { CardComponent, CardBodyComponent, CardFooterComponent } from '../ui/card.component';
import { BadgeComponent } from '../ui/badge.component';
import { ButtonComponent } from '../ui/button.component';
import { PriceDisplayComponent } from './price-display.component';

@Component({
  selector: 'app-product-card',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    BadgeComponent,
    ButtonComponent,
    PriceDisplayComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private productService = inject(ProductService);

  product = input.required<Product>();
  variant = input<'featured' | 'compact'>('compact');
  viewDetails = output<string>();

  protected startingPrice(): number {
    return this.productService.getStartingPrice(this.product());
  }

  protected categoryEmoji(): string {
    const cat = this.product().category;
    if (cat === 'Sicherheit') return '🪖';
    if (cat === 'Vermessung') return '📐';
    if (cat === 'Sicherheitstechnik') return '🛡️';
    return '📦';
  }
}
