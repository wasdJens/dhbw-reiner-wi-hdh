// src/app/app.routes.ts – Lazy Loading mit loadComponent()
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/home/home.page"),
  },
  {
    path: "products",
    loadComponent: () => import("./pages/products/products.page"),
  },
  {
    path: "products/:productId", // :productId wird per input() gelesen
    loadComponent: () => import("./pages/product-detail/product-detail.page"),
  },
  {
    path: "cart",
    loadComponent: () => import("./pages/cart/cart.page"),
  },
  {
    path: "maintenance",
    loadComponent: () => import("./pages/maintenance/maintenance.page"),
  },
  {
    path: "maintenance/new",
    loadComponent: () => import("./pages/maintenance-new/maintenance-new.page"),
  },
  {
    path: "about",
    loadComponent: () => import("./pages/about/about.page"),
  },
];