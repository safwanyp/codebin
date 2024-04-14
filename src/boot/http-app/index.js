import express from "express";
import helmet from "helmet";
import {
  errorHandler,
  notFound,
  reqLoggerInjector,
  requestIdInjector
} from "../../middlewares/index.js";
import { healthHandler } from "../../http-handlers/health/index.js";
import router from "../../router/index.js";

const app = express();

/**
 * @function createApp
 * @description Create the Express application
 * @returns {import("express").Express} The Express application
 */
const createApp = () => {
  return app
    .disable("x-powered-by")
    .use(express.json())
    .use(helmet())
    .use(reqLoggerInjector)
    .use(requestIdInjector)
    .use("/api/v1", router)
    .get("/health", healthHandler)
    .get("*", notFound)
    .use(errorHandler);
};

export { createApp };
