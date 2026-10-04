import Fastify from "fastify";
import { beerRoutes } from "./routes/beer.routes.js";
import { beerSchema } from "./schemas/beer.schemas.js";

const fastify = Fastify({
  logger: true,
});

fastify.addSchema(beerSchema);
fastify.register(beerRoutes, { prefix: "/beer" });

try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
