import { addBeer, getBeerById } from "./beers.js";

let id = 0;

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
    id: id++,
  };

  addBeer(beer);

  return beer;
}

/**
 * For a given beer increases the amount by one
 * @param {number} id The id of the beer to be updated
 * @returns The updated beer object or null if the beer was not found
 */
function drinkBeer(id) {
  const storedBeer = getBeerById(id);
  if (storedBeer) {
    storedBeer.amount++;
    return storedBeer;
  } else {
    return null;
  }
}

/**
 * For a given beer updates the rating based on the values between 1 and 5. If another rating is applied the update is skipped
 * @param {number} rating - The rating value must be between 1 and 5
 * @param {number} id - The id of the beer to be rated
 * @returns
 */
function rateBeer(rating = 1, id) {
  const storedBeer = getBeerById(id);
  if (storedBeer) {
    if (rating >= 1 && rating <= 5) {
      storedBeer.rating = rating;
      return storedBeer;
    }
    return storedBeer;
  } else {
    return null;
  } 
}

export { createBeer, drinkBeer, rateBeer };
