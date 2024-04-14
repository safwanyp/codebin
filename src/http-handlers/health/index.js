const healthHandler = async (req, res) => {
  req.logger.info(req.requestId, "Health check", {});
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "ok" }));
};

export { healthHandler };
