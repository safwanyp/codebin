import winston from "winston";
import WinstonCloudwatch from "winston-cloudwatch";

/**
 * @function getLogger
 * @description Creates a logger object
 * @param {object} params The parameters
 * @param {import("../../types/config.js").Config} params.config The configuration object
 * @returns {import("../../types/logger.js").Logger} The logger object
 */
const getLogger = ({ config }) => {
  let transports = [];
  const format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.logstash()
  );
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };

  if (config.environment === "production") {
    const cloudwatchConfig = {
      logGroupName: process.env.AWS_CLOUDWATCH_LOG_GROUP_NAME,
      logStreamName: `${process.env.AWS_CLOUDWATCH_LOG_STREAM_NAME}-${config.environment}`,
      awsRegion: process.env.AWS_REGION
    };
    transports = [new WinstonCloudwatch(cloudwatchConfig)];
  } else {
    transports = [new winston.transports.Console()];
  }

  const baseLogger = winston.createLogger({
    levels,
    format,
    transports
  });

  /**
   * @constant logger
   * @description The logger object
   * @type {import("../../types/logger.js").Logger}
   */
  const logger = {
    debug: (requestId, msg, metadata) => {
      baseLogger.debug(msg, {
        ...metadata,
        ...{ requestId, environment: config.environment }
      });
    },
    info: (requestId, msg, metadata) => {
      baseLogger.info(msg, {
        ...metadata,
        ...{ requestId, environment: config.environment }
      });
    },
    warn: (requestId, msg, metadata) => {
      baseLogger.warn(msg, {
        ...metadata,
        ...{ requestId, environment: config.environment }
      });
    },
    error: (requestId, msg, metadata) => {
      baseLogger.error(msg, {
        ...metadata,
        ...{ requestId, environment: config.environment }
      });
    }
  };

  return logger;
};

export { getLogger };
