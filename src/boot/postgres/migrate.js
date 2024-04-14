import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const { Client } = pg;

/**
 * @file Postgres migration module.
 * @module common/postgres/migrate
 * @description This module is responsible for migrating the Postgres database.
 * @requires module:pg
 * @requires module:drizzle-orm/node-postgres
 * @requires module:schema.js
 * @requires module:drizzle-orm/node-postgres/migrator
 * @param {object} params - The params object.
 * @param {import("pg").ClientConfig} params.pgConfig - The Postgres client configuration object.
 * @param {import("../../types/logger.js").Logger} params.logger - The logger object.
 * @returns {Promise<void>} The promise object.
 */
async function migratePostgres({ pgConfig, logger }) {
  try {
    const client = new Client(pgConfig);
    await client.connect();

    const pgclient = drizzle(client, { schema });
    logger.info("Drizzle initialized", "<DRIZZLE-MIGRATION>", { client });

    await migrate(pgclient, { migrationsFolder: "migrations" });
    logger.info("Postgres migrations complete", "<DRIZZLE-MIGRATION>", {
      migrationsFolder: "migrations"
    });

    client.end();
  } catch (error) {
    logger.error("Error creating a Postgres client", "<DRIZZLE-MIGRATION>", {
      error
    });
    throw new Error(`Error creating a Postgres client: ${error}`);
  }
}

export { migratePostgres };
