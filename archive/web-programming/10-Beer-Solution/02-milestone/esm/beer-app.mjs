import { createBeer, drinkBeer, rateBeer } from "./beer.mjs";
import { getBeers, getMostDrankBeer, getBestRatedBeers } from "./beers.mjs";

const nattheimerSpezial = createBeer({
  name: "Spezial",
  taste: "Good",
  brand: "Nattheimer",
});
const goldOchsenKellerbier = createBeer({
  name: "Kellerbier natürtrüb",
  taste: "Good",
  brand: "Ulmer Gold Ochsen",
});

drinkBeer(nattheimerSpezial);
drinkBeer(nattheimerSpezial);
drinkBeer(nattheimerSpezial);
rateBeer(5, goldOchsenKellerbier);

console.log("All Beers: ", getBeers());
console.log("Most Drank Beer: ", getMostDrankBeer());
console.log("Best Rated Beer: ", getBestRatedBeers());
