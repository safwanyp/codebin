import { getConfig } from "../boot/config/index.js";
import { getLogger } from "../boot/logger/index.js";
import { staticResponses } from "../static/responses.js";
import { toCustomResponse } from "../utils/index.js";
import { v4 as uuidv4 } from "uuid";

const config = getConfig();

const reqLoggerInjector = (req, _, next) => {
  req.loggerMetadata = { requestId: req.requestId };
  req.logger = getLogger({ config });
  next();
};

const notFound = (_, res, next) => {
  next({
    ...staticResponses.NOT_FOUND.body,
    status: staticResponses.NOT_FOUND.status
  });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (msg) => (error, req, res, next) => {
  const rewResponse = toCustomResponse(error);

  if (rewResponse.status < 500) {
    req.logger.debug(msg, error);
  } else {
    req.logger.error(msg, error);
  }
  res.status(rewResponse.status).json({
    type: rewResponse.type,
    code: rewResponse.code,
    message: rewResponse.message
  });
};

const requestIdInjector = (req, res, next) => {
  const requestId = uuidv4();
  res.set("X-Request-ID", requestId);
  req.requestId = requestId;

  if (req.get("X-Request-ID")) {
    next({
      type: "TODO",
      code: "request_id_not_allowed",
      message: `Header ${"X-Request-ID"} is not allowed in request`,
      links: {},
      status: 400
    });
    return;
  }

  next();
};

export { reqLoggerInjector, notFound, errorHandler, requestIdInjector };
