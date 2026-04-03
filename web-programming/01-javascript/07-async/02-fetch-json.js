const fetchPromise = fetch("http://localhost:3000/");

fetchPromise
  .then((response) => response.json())
  .then((beers) => {
    console.log(beers);
  });

console.log("Fetch JSON Sample");
