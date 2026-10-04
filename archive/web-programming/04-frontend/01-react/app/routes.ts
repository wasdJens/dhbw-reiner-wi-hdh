import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("second-page", "./routes/second-page.tsx"),
  route("beers", "./routes/beers/beers.tsx", [
    route(":beerId", "./routes/beers/beer-detail.tsx"),
  ]),
  route("beers-server", "./routes/beers-server/beers-server.tsx"),
  route("beers-create", "./routes/beers-server/beers-create.tsx"),
] satisfies RouteConfig;
