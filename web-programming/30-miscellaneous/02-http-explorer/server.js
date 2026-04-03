import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:3000", "http://localhost:4200"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
});

fastify.all("/ping", (request, reply) => {
  console.log(request.method);
  if (request.method === "OPTIONS") {
    reply
      .header("allow", "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS")
      .status(204)
      .send();
  } else {
    const response = {
      message: "Pong",
      method: request.method,
    };

    reply.send(response);
  }
});

fastify.get("/header", (request, reply) => {
  reply.header("x-custom-header", "A custom response header");

  const response = {
    message: "This endpoint returns all sent client headers",
    clientHeaders: request.headers,
    serverHeaders: reply.header,
  };
  reply.send(response);
});

fastify.post("/body", (request, reply) => {
  const requestBody = request.body;

  const response = {
    message: "This endpoint returns the client body",
    receivedBody: requestBody,
  };
  reply.send(response);
});

fastify.post("/status", (request, reply) => {
  const response = {
    message:
      "Modify the status code in the client body to return different status codes",
    supportedCodes: "200, 201, 301, 400, 401, 403, 404, 500, 503",
  };

  switch (request.body.status) {
    case 200:
      reply.status(200);
      break;
    case 201:
      reply.status(201);
      break;
    case 301:
      reply.status(301);
      break;
    case 400:
      reply.status(400);
      break;
    case 401:
      reply.status(401);
      break;
    case 403:
      reply.status(403);
      break;
    case 404:
      reply.status(404);
      break;
    case 500:
      reply.status(500);
      break;
    case 503:
      reply.status(503);
      break;
    default:
      reply.status(400);
  }

  reply.send(response);
});

try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
