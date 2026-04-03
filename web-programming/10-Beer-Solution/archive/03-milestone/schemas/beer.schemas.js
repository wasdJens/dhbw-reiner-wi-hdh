const beerSchema = {
  $id: "beerSchema",
  type: "object",
  properties: {
    name: { type: "string" },
    taste: { type: "string" },
    brand: { type: "string" },
    amount: { type: "integer" },
    rating: { type: "integer" },
  },
};

const createBeerOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        taste: { type: "string" },
        brand: { type: "string" },
      },
      required: ["name", "taste", "brand"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
    },
  },
};

const drinkBeerOptions = {
  schema: {
    body: { $ref: "beerSchema#" },
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
    },
  },
};

const rateBeerOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        rating: { type: "integer" },
        beer: { $ref: "beerSchema#" },
      },
      required: ["rating", "beer"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
    },
  },
};

export { beerSchema, createBeerOptions, drinkBeerOptions, rateBeerOptions };
