/**
 * Products Page – Produktübersicht
 *
 * SMART COMPONENT: Verwaltet Suchbegriff-State und lädt Produkte über den Service.
 *
 * Angular-Konzepte: signal(), computed(), inject(), model()
 */

import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { ProductCardComponent } from '../../components/product/product-card.component';
import { ProductGridComponent } from '../../components/product/product-grid.component';
import { InputComponent } from '../../components/ui/input.component';

@Component({
  selector: 'app-products-page',
  imports: [PageHeaderComponent, ProductCardComponent, ProductGridComponent, InputComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
})
export default class ProductsPage {
  private router = inject(Router);
  private productService = inject(ProductService);

  searchTerm = signal('');

  products = computed(() => {
    const term = this.searchTerm().trim();
    return term.length > 0
      ? this.productService.searchProducts(term)
      : this.productService.getAllProducts();
  });

  handleViewDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
