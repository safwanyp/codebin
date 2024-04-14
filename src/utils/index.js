import { staticResponses } from "../static/responses.js";

const prepError = (e) => {
  if (typeof e === "string") {
    return {
      message: e
    };
  }

  if (e instanceof Error) {
    return {
      message: e.message,
      stack: e.stack
    };
  }

  return e;
};

const toCustomResponse = (e) => {
  if (!e) {
    return e;
  }

  const preparedError = prepError(e);

  const defaultError = {
    status: staticResponses.INTERNAL_SERVER_ERROR.status,
    type: staticResponses.INTERNAL_SERVER_ERROR.body.type,
    code: staticResponses.INTERNAL_SERVER_ERROR.body.code,
    message: staticResponses.INTERNAL_SERVER_ERROR.body.message
  };

  const error = {
    ...defaultError,
    ...preparedError
  };

  return error.type === staticResponses.INTERNAL_SERVER_ERROR.body.type
    ? {
        status: staticResponses.INTERNAL_SERVER_ERROR.status,
        ...staticResponses.INTERNAL_SERVER_ERROR.body
      }
    : error;
};

export { toCustomResponse };
