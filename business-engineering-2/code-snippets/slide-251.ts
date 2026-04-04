// app/routes.ts – Routen konfigurieren (file-based, kein JSX nötig)
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // /
  route("products", "routes/products.tsx"), // /products
  route("products/:productId", "routes/product-detail.tsx"), // /products/ceta-core
  route("cart", "routes/cart.tsx"), // /cart
  route("maintenance", "routes/maintenance.tsx"), // /maintenance
  route("maintenance/new", "routes/maintenance-new.tsx"), // /maintenance/new
  route("about", "routes/about.tsx"), // /about
] satisfies RouteConfig;