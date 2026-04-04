/**
 * Home Page – Startseite von Ceta Commerce
 *
 * SMART COMPONENT: Lädt Produkte über den Service und orchestriert Dumb Components.
 * Zeigt Hero-Section, Produkthighlights und Wartungs-CTA.
 *
 * Angular-Konzepte: inject(), Router.navigate()
 */

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product/product-card.component';
import { ProductGridComponent } from '../../components/product/product-grid.component';
import { ButtonComponent } from '../../components/ui/button.component';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, ProductGridComponent, ButtonComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {
  protected readonly router = inject(Router);
  private productService = inject(ProductService);

  readonly products = this.productService.getAllProducts();

  handleViewDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
