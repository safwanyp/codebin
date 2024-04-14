import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migratePostgres } from "./migrate.js";

const { Pool } = pg;

const getPgPool = ({ config, logger }) => {
  const pgConfig = {
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port
  };

  const pool = new Pool(pgConfig);

  migratePostgres({ pgConfig, logger });

  const db = drizzle(pool);

  return db;
};

export { getPgPool };
