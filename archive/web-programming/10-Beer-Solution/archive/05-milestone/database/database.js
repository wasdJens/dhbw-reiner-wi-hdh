import fp from "fastify-plugin";
import Database from "better-sqlite3";

// Defines where sqlite will store the database on the given path on the filesystem
const filePath = "./database/beer.db";

// Defines the SQL statement to create the beer table
const createTableStatement = `
  CREATE TABLE IF NOT EXISTS beers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    taste VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    rating INTEGER NOT NULL
  );
`;

/**
 * Adds a plugin to the fastify instance and creates the database instance.
 * You only need to call this once in the main register flow (server.js)
 * @param {object} fastify - The fastify instance
 * @param {object} options - The fastify plugin options
 * @param {function} next - The fastify next callback
 */
function dbConnector(fastify, options, next) {
  // Creates a new database instance
  const db = new Database(filePath);

  // Creates the beer table if it does not exist
  db.exec(createTableStatement);

  // Adds the database instance to the fastify instance
  fastify.decorate("db", db);

  // Closes the database connection when the server is closed
  fastify.addHook("onClose", (fastify, done) => {
    db.close();
    done();
  });

  next();
}

/**
 * Exposes the plugin to fastify using the `fp` plugin helper
 */
export default fp(dbConnector);
