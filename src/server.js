import { boot } from "./boot/index.js";

boot();

process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught Exception thrown", err);
    process.exit(1);
  })
  .on("SIGINT", () => {
    console.info("SIGINT signal received.");
    process.exit(0);
  })
  .on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    process.exit(0);
  })
  .on("exit", (code) => {
    console.info("Process exited with code", code);
  });
