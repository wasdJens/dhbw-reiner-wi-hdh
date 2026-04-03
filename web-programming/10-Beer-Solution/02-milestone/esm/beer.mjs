import { addBeer } from "./beers.mjs";

/**
 * Creates a new beer and adds it to the list of all beers
 * @param {Object} beerProps - The initial values for the new beer which should be created
 * @param {string} beer.name - The name of the beer
 * @param {string} beer.taste - The taste of the beer
 * @param {string} beer.brand - The brand of the beer
 * @returns The created beer
 */
function createBeer(beerProps) {
  const beer = {
    name: beerProps.name,
    taste: beerProps.taste,
    brand: beerProps.brand,
    amount: 0,
    rating: 1,
  };

  addBeer(beer);

  return beer;
}

/**
 * For a given beer increases the amount by one
 * @param {Object} beer The beer to be increased
 * @returns The updated beer object
 */
function drinkBeer(beer) {
  beer.amount++;
  return beer;
}

/**
 * For a given beer updates the rating based on the values between 1 and 5. If another rating is applied the update is skipped
 * @param {number} rating - The rating value must be between 1 and 5
 * @param {Object} beer - The beer which should be rated
 * @returns
 */
function rateBeer(rating = 1, beer) {
  if (rating >= 1 && rating <= 5) {
    beer.rating = rating;
  }
  return beer;
}

export { createBeer, drinkBeer, rateBeer };
