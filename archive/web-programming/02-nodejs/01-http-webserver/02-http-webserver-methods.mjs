import http from "node:http";

const server = http.createServer();

server.on("request", (request, res) => {
  res.setHeader("content-type", "application/json");
  switch (request.method) {
    case "GET":
      res.writeHead(200);
      res.end(JSON.stringify({ message: "GET request received" }));
      break;
    case "POST":
      res.writeHead(200);
      res.end(JSON.stringify({ message: "POST request received" }));
      break;
    case "PUT":
      res.writeHead(200);
      res.end(JSON.stringify({ message: "PUT request received" }));
      break;
    case "DELETE":
      res.writeHead(200);
      res.end(JSON.stringify({ message: "DELETE request received" }));
      break;
    default:
      res.writeHead(405);
      res.end(
        JSON.stringify({ message: `Method ${request.method} not allowed` })
      );
      break;
  }
});

server.listen(8080, () => {
  console.log(
    "Server is running on port 8080 - You can send http requests via the following url: http://localhost:8080"
  );
});
