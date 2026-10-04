import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing-page/landing-page.tsx"),
  route("beers", "routes/beers-page/beers-page.tsx"),
  route("beers/create", "routes/beer-create-page/beer-create-page.tsx"),
  route("beers/:id", "routes/beer-detail-page/beer-detail-page.tsx"),
] satisfies RouteConfig;
