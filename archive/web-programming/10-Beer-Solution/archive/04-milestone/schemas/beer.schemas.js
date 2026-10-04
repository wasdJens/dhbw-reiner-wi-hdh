const beerSchema = {
  $id: "beerSchema",
  type: "object",
  properties: {
    name: { type: "string" },
    taste: { type: "string" },
    brand: { type: "string" },
    amount: { type: "integer" },
    rating: { type: "integer" },
    id: { type: "integer" },
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
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
      required: ["id"],
    },
    body: { $ref: "beerSchema#" },
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
      400: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      }
    },
  },
};

const rateBeerOptions = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        rating: { type: "integer" },
      },
      required: ["rating"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
      400: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      }
    },
  },
};

const getBeersOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: { $ref: "beerSchema#" },
      },
    },
  },
};

const getBeerOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          beer: { $ref: "beerSchema#" },
        },
      },
    },
  },
}

export {
  beerSchema,
  createBeerOptions,
  drinkBeerOptions,
  rateBeerOptions,
  getBeersOptions,
  getBeerOptions,
};
