import {
  createBeerOptions,
  drinkBeerOptions,
  rateBeerOptions,
} from "../schemas/beer.schemas.js";

import { createBeer, drinkBeer, rateBeer } from "../core/beer.js";

async function beerRoutes(fastify, options) {
  fastify.post("/createBeer", createBeerOptions, async (request, reply) => {
    const beerProps = request.body;

    const beer = createBeer(beerProps);

    reply.code(201);
    return { beer: beer };
  });

  fastify.post("/drinkBeer", drinkBeerOptions, async (request, reply) => {
    const beer = request.body;

    const updatedBeer = drinkBeer(beer);

    return { beer: updatedBeer };
  });

  fastify.post("/rateBeer", rateBeerOptions, async (request, reply) => {
    const rating = request.body.rating;
    const beer = request.body.beer;

    const updatedBeer = rateBeer(rating, beer);

    return { beer: updatedBeer };
  });
}

export { beerRoutes };
