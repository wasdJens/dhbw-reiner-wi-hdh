import Fastify from "fastify";
import cors from '@fastify/cors'
import { beerRoutes } from "./routes/beer.routes.js";
import { beerSchema } from "./schemas/beer.schemas.js";
import dbConnector from "./database/database.js";

const fastify = Fastify({
  logger: true,
});

fastify.addSchema(beerSchema);

// CORS integration for Frontend Development
fastify.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
});

fastify.register(dbConnector);
fastify.register(beerRoutes, { prefix: "/beer" });

try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
