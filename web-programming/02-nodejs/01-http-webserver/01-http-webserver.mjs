import http from "node:http";

const server = http.createServer();

server.on("request", (request, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

server.listen(8080, () => {
  console.log(
    "Server is running on port 8080 - You can send http requests via the following url: http://localhost:8080"
  );
});
