import http from "http";

/**
 * @function bootHttpServer
 * @description Boot the HTTP server
 * @param {object} params The parameters
 * @param {import("../../types/config.js").Config} params.config The configuration object
 * @param {import("../../types/logger.js").Logger} params.logger The logger
 * @param {import("express").Express} params.httpApp The Express application
 * @returns {Promise<object>} The promise object
 */
const bootHttpServer = ({ config, logger, httpApp }) =>
  new Promise((resolve, reject) => {
    logger.debug("<NO-REQUEST-ID>", "Starting server", {
      port: config.httpServer.port
    });

    const server = http.createServer(httpApp);

    return server
      .on("listening", () => {
        logger.info("<NO-REQUEST-ID>", "Server started", {
          // @ts-ignore
          port: server.address().port
        });
        logger.info("<NO-REQUEST-ID>", "Serving API specs at /docs", {});
        return resolve({});
      })
      .on("error", (error) => reject(error.message))
      .listen(config.httpServer.port);
  });

export { bootHttpServer };
