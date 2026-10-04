const beersModule = require('./beers.cjs');
const beerModule = require('./beer.cjs');

const nattheimerSpezial = beerModule.createBeer({
  name: "Spezial",
  taste: "Good",
  brand: "Nattheimer",
});
const goldOchsenKellerbier = beerModule.createBeer({
  name: "Kellerbier natürtrüb",
  taste: "Good",
  brand: "Ulmer Gold Ochsen",
});

beerModule.drinkBeer(nattheimerSpezial);
beerModule.drinkBeer(nattheimerSpezial);
beerModule.drinkBeer(nattheimerSpezial);
beerModule.rateBeer(5, goldOchsenKellerbier);

console.log("All Beers: ", beersModule.getBeers());
console.log("Most Drank Beer: ", beersModule.getMostDrankBeer());
console.log("Best Rated Beer: ", beersModule.getBestRatedBeers());
