import { getConfig } from "./config/index.js";
import { createApp } from "./http-app/index.js";
import { bootHttpServer } from "./http-server/index.js";
import { getLogger } from "./logger/index.js";
import { getPgPool } from "./postgres/index.js";

const boot = async () => {
  const config = getConfig();
  const logger = getLogger({ config });
  const pgPool = getPgPool({ config, logger });
  const httpApp = createApp();
  const httpServer = await bootHttpServer({
    config,
    logger,
    httpApp
  });

  logger.info("<NO-REQUEST-ID>", "App booted", { config });

  return {
    config,
    logger,
    pgPool,
    httpApp,
    httpServer
  };
};

export { boot };
