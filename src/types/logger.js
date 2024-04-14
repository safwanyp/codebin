/**
 * @callback LogFunction
 * @param {string} requestId - The ID of the request.
 * @param {string} message - The message to log.
 * @param {object} metadata - Additional metadata to log.
 */

/**
 * @typedef {object} Logger
 * @property {LogFunction} info - Function to log informational messages.
 * @property {LogFunction} warn - Function to log warning messages.
 * @property {LogFunction} error - Function to log error messages.
 * @property {LogFunction} debug - Function to log debug messages.
 */
