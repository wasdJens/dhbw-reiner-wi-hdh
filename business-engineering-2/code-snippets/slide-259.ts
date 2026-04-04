// src/app/pages/product-detail/product-detail.page.ts
// Route: { path: "products/:productId", loadComponent: () => import(...) }
// Konfiguriert in app.config.ts mit withComponentInputBinding() →
// URL-Parameter werden DIREKT als input() gebunden – kein ActivatedRoute!

import { Component, computed, inject, input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-detail-page",
  imports: [RouterLink, /* weitere Komponenten */],
  templateUrl: "./product-detail.page.html",
  styleUrl: "./product-detail.page.css",
})
export default class ProductDetailPage {
  private productService = inject(ProductService);
  protected readonly router = inject(Router);

  // :productId aus der URL – direkt als input()! Kein ngOnInit, kein ActivatedRoute.
  // Funktioniert dank withComponentInputBinding() in app.config.ts
  productId = input.required<string>();

  // computed() = reaktiv abgeleiteter Wert
  product = computed(() => this.productService.getProductById(this.productId()));
  // getProductById("ceta-core")  → CetaCore
  // getProductById("ceta-level") → CetaLevel
  // getProductById("ceta-guard") → CetaGuard
  // getProductById("xyz")        → null
}