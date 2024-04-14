/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/boot/postgres/schema.js",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    user: String(process.env.POSTGRES_USER),
    host: String(process.env.POSTGRES_HOST),
    database: String(process.env.POSTGRES_DATABASE),
    password: String(process.env.POSTGRES_PASSWORD),
    port: Number(process.env.POSTGRES_PORT)
  },
  verbose: true,
  strict: true
};
