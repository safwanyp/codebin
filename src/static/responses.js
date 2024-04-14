const staticResponses = Object.freeze({
  INVALID_AUTHORIZATION: {
    status: 403,
    body: {
      type: "auth",
      code: "invalid_authorization",
      message: "Request is unauthorized"
    }
  },
  NOT_FOUND: {
    status: 404,
    body: {
      type: "resource",
      code: "not_found",
      message: "Resource not found"
    }
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    body: {
      type: "api",
      code: "too_many_requests",
      message: "Too Many Requests"
    }
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    body: {
      type: "internal_server_error",
      code: "internal_server_error",
      message: "Internal server error"
    }
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    body: {
      type: "api",
      code: "service_unavailable",
      message: "Service is unavailable"
    }
  }
});

export { staticResponses };
