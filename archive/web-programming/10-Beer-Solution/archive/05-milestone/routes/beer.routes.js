import {
  createBeerOptions,
  drinkBeerOptions,
  getBeerOptions,
  getBeersOptions,
  rateBeerOptions,
} from "../schemas/beer.schemas.js";
import {
  createBeer,
  drinkBeer,
  getBeerById,
  getBeers,
  rateBeer,
  getBestRatedBeers,
  getMostDrankBeer,
} from "../core/beer.js";

/**
 * Includes the routes for the `/beer` endpoint.
 *
 * With this route the user can:
 * - Get a list of all beers
 * - Create a new beer
 * - Get a list of the best rated beers
 * - Get the most drank beer
 * - Drink a beer
 * - Rate a beer
 * - Get a single beer
 */
async function beerRoutes(fastify, options) {
  fastify.get("/", getBeersOptions, async (request, reply) => {
    const beers = getBeers(fastify);

    if (!beers) {
      reply.code(500);
      return { error: "Could not get beers" };
    }

    return beers;
  });

  fastify.post("/", createBeerOptions, async (request, reply) => {
    const beerProps = request.body;

    const beer = createBeer(fastify, beerProps);

    if (!beer) {
      reply.code(500);
      return { error: "Could not create beer" };
    }

    reply.code(201);
    return { beer: beer };
  });

  fastify.get("/best", getBeersOptions, async (request, reply) => {
    const beers = getBestRatedBeers(fastify);

    if (!beers) {
      reply.code(500);
      return { error: "Could not get best rated beers" };
    }

    return beers;
  });

  fastify.get("/most", getBeerOptions, async (request, reply) => {
    const beer = getMostDrankBeer(fastify);

    if (!beer) {
      reply.code(400);
      return { error: "No beers available yet" };
    }

    return { beer: beer };
  });

  fastify.post("/:id/drink", drinkBeerOptions, async (request, reply) => {
    const id = parseInt(request.params.id, 10);

    const updatedBeer = drinkBeer(fastify, id);
    if (!updatedBeer) {
      reply.code(400);
      return { error: "Beer not found" };
    }

    return { beer: updatedBeer };
  });

  fastify.post("/:id/rate", rateBeerOptions, async (request, reply) => {
    const rating = request.body.rating;
    const id = parseInt(request.params.id, 10);

    if (rating < 1 || rating > 5) {
      reply.code(400);
      return { error: "Invalid rating - Allowed values are between 1 and 5" };
    }

    const updatedBeer = rateBeer(fastify, rating, id);
    if (!updatedBeer) {
      reply.code(400);
      return { error: "Beer not found or invalid rating" };
    }

    return { beer: updatedBeer };
  });

  fastify.get("/:id", getBeerOptions, async (request, reply) => {
    const id = parseInt(request.params.id, 10);

    const beer = getBeerById(fastify, id);
    if (!beer) {
      reply.code(400);
      return { error: "Beer not found" };
    }

    return { beer: beer };
  });
}

export { beerRoutes };
