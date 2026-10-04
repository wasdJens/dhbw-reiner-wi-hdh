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

//
// Testing our program
//

// Create two beers
const nattheimerSpezial = createBeer({
  name: "Spezial",
  taste: "Ok",
  brand: "Nattheimer",
});
const goldOchsenKellerbier = createBeer({
  name: "Kellerbier natürtrüb",
  taste: "🤢",
  brand: "Ulmer Gold Ochsen",
});

drinkBeer(nattheimerSpezial);
drinkBeer(nattheimerSpezial);
drinkBeer(nattheimerSpezial);
rateBeer(5, goldOchsenKellerbier);

console.log("All Beers: ", getBeers());
console.log("Most Drank Beer: ", getMostDrankBeer());
console.log("AI: Best Rated Beer: ", getBestRatedBeers());
