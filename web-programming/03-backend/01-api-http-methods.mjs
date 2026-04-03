import http from "node:http";

const server = http.createServer();
const beers = [];

function addBeer(beer) {
  beers.push(beer);
}

server.on("request", (request, res) => {
  res.setHeader("content-type", "application/json");

  if (request.url === "/beers") {
    if (request.method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify(beers));
    }
    if (request.method === "POST") {
      res.statusCode = 201;
      const nattheimerSpezial = createBeer({
        name: "Spezial",
        taste: "Good",
        brand: "Nattheimer",
      });
      res.end(JSON.stringify(nattheimerSpezial));
    }
  }
});

server.listen(8080, () => {
  console.log(
    "Server is running on port 8080 - You can send http requests via the following url: http://localhost:8080"
  );
});

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
