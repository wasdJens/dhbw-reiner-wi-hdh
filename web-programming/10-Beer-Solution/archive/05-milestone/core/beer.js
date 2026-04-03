/**
 * Selects all beers from the database
 * @param {Object} fastify - The fastify instance
 * @returns A list of all beers from the database or null in case of an error
 */
export function getBeers(fastify) {
  const statement = fastify.db.prepare(`SELECT * FROM beers`);

  try {
    const beers = statement.all();
    return beers;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * Retrieves a single beer by its id
 * @param {Object} fastify - The fastify instance
 * @param {number} id - The id of the beer to be retrieved
 * @returns The beer object or null in case of an error / not found
 */
export function getBeerById(fastify, id) {
  const statement = fastify.db.prepare(`SELECT * FROM beers WHERE id = ?`);

  try {
    const beer = statement.get(id);
    return beer;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * Retrieves a list of all beers with a rating of 4 or higher sorted by rating descending
 * @param {Object} fastify - The fastify instance
 * @returns A list of all beers with a rating of 4 or higher sorted by rating descending. Otherwise null in case of an error
 */
export function getBestRatedBeers(fastify) {
  const statement = fastify.db.prepare(
    `SELECT * FROM beers WHERE rating >= 4 ORDER BY rating DESC`
  );

  try {
    const beers = statement.all();
    return beers;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * Retrieves the beer which was drank the most
 * @param {Object} fastify - The fastify instance
 * @returns The beer which was drank the most or null in case of an error
 */
export function getMostDrankBeer(fastify) {
  const statement = fastify.db.prepare(
    `SELECT * FROM beers ORDER BY amount DESC LIMIT 1`
  );

  try {
    const beer = statement.get();
    return beer;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * Creates a new beer and adds it to the list of all beers
 * @param {Object} fastify - The fastify instance
 * @param {Object} beerProps - The initial values for the new beer which should be created
 * @param {string} beer.name - The name of the beer
 * @param {string} beer.taste - The taste of the beer
 * @param {string} beer.brand - The brand of the beer
 * @returns The created beer object or null in case of an error
 */
export function createBeer(fastify, beerProps) {
  const insertIntoStatement = fastify.db.prepare(
    `INSERT INTO beers (name, taste, brand, amount, rating) VALUES (?, ?, ?, ?, ?)`
  );
  const selectStatement = fastify.db.prepare(
    `SELECT * FROM beers WHERE id = ?`
  );

  const beerToCreate = {
    name: beerProps.name,
    taste: beerProps.taste,
    brand: beerProps.brand,
    amount: 0,
    rating: 1,
  };

  try {
    const { name, taste, brand, amount, rating } = beerToCreate;
    const info = insertIntoStatement.run(name, taste, brand, amount, rating);

    const createdBeer = selectStatement.get(info.lastInsertRowid);
    return createdBeer;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * For a given beer increases the amount by one
 * @param {number} id The id of the beer to be updated
 * @returns The updated beer object or null if the beer was not found
 */
export function drinkBeer(fastify, id) {
  const statement = fastify.db.prepare(
    `UPDATE beers SET amount = amount + 1 WHERE id = ?`
  );

  try {
    statement.run(id);
    const updatedBeer = getBeerById(fastify, id);
    return updatedBeer;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}

/**
 * For a given beer updates the rating based on the values between 1 and 5. If another rating is applied the update is skipped
 * @param {number} rating - The rating value must be between 1 and 5
 * @param {number} id - The id of the beer to be rated
 * @returns The updated beer object or null if the beer was not found. Also returns null if the rating is not between 1 and 5
 */
export function rateBeer(fastify, rating = 1, id) {
  const statement = fastify.db.prepare(
    `UPDATE beers SET rating = ? WHERE id = ?`
  );

  if (rating < 1 || rating > 5) {
    return null;
  }

  try {
    statement.run(rating, id);
    const updatedBeer = getBeerById(fastify, id);
    return updatedBeer;
  } catch (error) {
    fastify.log.error(error);
    return null;
  }
}
