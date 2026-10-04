import {
  createBeerOptions,
  drinkBeerOptions,
  getBeerOptions,
  getBeersOptions,
  rateBeerOptions,
} from "../schemas/beer.schemas.js";
import { createBeer, drinkBeer, rateBeer } from "../core/beer.js";
import {
  getBestRatedBeers,
  getMostDrankBeer,
  getBeers,
  getBeerById,
} from "../core/beers.js";

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
    const beers = getBeers();

    return beers;
  });

  fastify.post("/", createBeerOptions, async (request, reply) => {
    const beerProps = request.body;

    const beer = createBeer(beerProps);

    reply.code(201);
    return { beer: beer };
  });

  fastify.get("/best", getBeersOptions, async (request, reply) => {
    const beers = getBestRatedBeers();

    return beers;
  });

  fastify.get("/most", getBeerOptions, async (request, reply) => {
    const beer = getMostDrankBeer();

    if (!beer) {
      reply.code(400);
      return { error: "No beers available yet" };
    }

    return { beer: beer };
  });

  fastify.post("/:id/drink", drinkBeerOptions, async (request, reply) => {
    const id = parseInt(request.params.id, 10);

    const updatedBeer = drinkBeer(id);
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

    const updatedBeer = rateBeer(rating, id);
    if (!updatedBeer) {
      reply.code(400);
      return { error: "Beer not found" };
    }

    return { beer: updatedBeer };
  });

  fastify.get("/:id", getBeerOptions, async (request, reply) => {
    const id = parseInt(request.params.id, 10);

    const beer = getBeerById(id);
    if (!beer) {
      reply.code(400);
      return { error: "Beer not found" };
    }

    return { beer: beer };
  });
}

export { beerRoutes };
