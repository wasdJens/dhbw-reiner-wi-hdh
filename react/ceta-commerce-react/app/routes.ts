import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:productId", "routes/product-detail.tsx"),
  route("cart", "routes/cart.tsx"),
  route("maintenance", "routes/maintenance.tsx"),
  route("maintenance/new", "routes/maintenance-new.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
