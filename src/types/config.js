/**
 * @typedef {object} Config
 * @property {string} [environment] - The current environment (development, production).
 * @property {object} httpApp - The HTTP application configuration.
 * @property {number} [httpApp.port=3000] - The port where the HTTP application will listen.
 * @property {object} httpServer - The HTTP server configuration.
 * @property {number} [httpServer.port=3000] - The port where the HTTP server will listen.
 * @property {object} postgres - The PostgreSQL database configuration.
 * @property {string} postgres.user - The PostgreSQL user.
 * @property {string} postgres.host - The PostgreSQL host.
 * @property {string} postgres.database - The PostgreSQL database.
 * @property {string} postgres.password - The PostgreSQL password.
 * @property {number} postgres.port - The PostgreSQL port.
 * @property {object} supabase - The Supabase configuration.
 * @property {string} supabase.url - The Supabase URL.
 * @property {string} supabase.key - The Supabase key.
 * @property {string} supabase.webhookSourceKey - The Supabase webhook source key.
 * @description The configuration object.
 * @global
 * @default
 */
