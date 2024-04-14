const config = {
  environment: process.env.ENVIRONMENT,
  httpApp: {
    port: Number(process.env.PORT) || 3000
  },
  httpServer: {
    port: Number(process.env.PORT) || 3000
  },
  postgres: {
    user: String(process.env.POSTGRES_USER),
    host: String(process.env.POSTGRES_HOST),
    database: String(process.env.POSTGRES_DATABASE),
    password: String(process.env.POSTGRES_PASSWORD),
    port: Number(process.env.POSTGRES_PORT)
  },
  supabase: {
    url: String(process.env.SUPABASE_URL),
    key: String(process.env.SUPABASE_ANON_KEY),
    webhookSourceKey: String(process.env.SUPABASE_WEBHOOK_SOURCE_KEY)
  }
};

/**
 * @function getConfig
 * @description Get the configuration object
 * @returns {import("../../types/config.js").Config} The configuration object
 */
const getConfig = () => config;

export { getConfig };
