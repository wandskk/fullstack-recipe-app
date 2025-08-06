import { logInfo, logError } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
    };

    if (res.statusCode >= 400) {
      logError("Request failed", null, logData);
    } else {
      logInfo("Request completed", logData);
    }
  });

  next();
};

export const errorLogger = (err, req, res, next) => {
  logError("Unhandled error", err, {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get("User-Agent"),
    ip: req.ip || req.connection.remoteAddress,
  });
  next(err);
}; 