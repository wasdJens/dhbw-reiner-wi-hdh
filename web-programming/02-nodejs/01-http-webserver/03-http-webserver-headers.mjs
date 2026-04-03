import http from "node:http";

const car = {
  name: "EQS",
  hersteller: "Mercedes Benz",
  farbe: "Schwarz",
};

const server = http.createServer();

server.on("request", (request, res) => {
  const acceptHeader = request.headers["accept"];

  // Client did not specify an accept header - Fallback to 300 (Agent Driven Negotiation)
  if (!acceptHeader || acceptHeader.includes("text/*")) {
    res.writeHead(300);
    res.end();
  } else if (acceptHeader) {
    // Client prefers HTML
    if (acceptHeader.includes("text/html")) {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(`
              <html>
        <head><title>Auto</title></head>
        <body>
          <h1>Auto Informationen</h1>
          <p>Name: ${car.name}</p>
          <p>Hersteller: ${car.hersteller}</p>
          <p>Farbe: ${car.farbe}</p>
        </body>
      </html>
        `);
    }
    // Client prefers JSON
    if (acceptHeader.includes("application/json")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          name: car.name,
          hersteller: car.hersteller,
          farbe: car.farbe,
        })
      );
    }
  }
});

server.listen(8080, () => {
  console.log(
    "Server is running on port 8080 - You can send http requests via the following url: http://localhost:8080"
  );
});
