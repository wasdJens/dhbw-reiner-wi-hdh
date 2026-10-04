const beers = [];

/**
 * Takes a beer object and adds it to the list of already existing beers.
 * @param {Object} beer
 */
function addBeer(beer) {
  beers.push(beer);
}

/**
 * Returns the current list of all beers
 * @returns A list of beers
 */
function getBeers() {
  return beers;
}

/**
 * Returns a list of beers that have a rating better or equal of 4
 * @returns A filtered list of beers if no beers are found empty array is returned
 */
function getBestRatedBeers() {
  const bestRated = beers.filter((beer) => beer.rating >= 4);
  return bestRated;
}

/**
 * Compares each beer in the list of all beers for the amount property.
 * The beer with the highest amount is returned.
 * If the length of the list of beers is 0 null is returned
 * @returns A single beer or null if list is empty
 */
function getMostDrankBeer() {
  if (beers.length === 0) {
    return null;
  } else {
    let mostDrankBeer = beers[0];

    for (let i = 1; i < beers.length; i++) {
      if (beers[i].amount > mostDrankBeer.amount) {
        mostDrankBeer = beers[i];
      }
    }

    return mostDrankBeer;
  }
}

export { addBeer, getBeers, getBestRatedBeers, getMostDrankBeer };
