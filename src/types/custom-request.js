/**
 * @typedef {import('express').Request & {
 *  supabase: import("@supabase/supabase-js").SupabaseClient,
 *  requestId: string,
 *  logger: import("./logger.js").Logger,
 *  pgPool: import("pg").Pool
 * }} CustomRequest
 */
