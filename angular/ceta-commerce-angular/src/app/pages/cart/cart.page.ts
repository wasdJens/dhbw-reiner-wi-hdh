/**
 * Cart Page – Warenkorb
 *
 * SMART COMPONENT: Verwaltet den Warenkorb-State über den Cart Service.
 * Dank Signals reagiert die UI automatisch auf Änderungen.
 *
 * Angular-Konzepte: inject(), signal/computed (vom Service), @if, @for
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { CartItemRowComponent } from '../../components/cart/cart-item-row.component';
import { CartSummaryComponent } from '../../components/cart/cart-summary.component';
import { ButtonComponent } from '../../components/ui/button.component';

@Component({
  selector: 'app-cart-page',
  imports: [PageHeaderComponent, CartItemRowComponent, CartSummaryComponent, ButtonComponent],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css',
})
export default class CartPage {
  protected readonly router = inject(Router);
  protected readonly cartService = inject(CartService);
  protected readonly productService = inject(ProductService);
}
