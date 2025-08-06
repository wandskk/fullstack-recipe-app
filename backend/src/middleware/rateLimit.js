import rateLimit from "express-rate-limit";

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const generalLimiter = createRateLimiter(
  15 * 60 * 1000,
  100,
  "Too many requests from this IP, please try again later."
);

export const authLimiter = createRateLimiter(
  15 * 60 * 1000,
  5,
  "Too many authentication attempts, please try again later."
);

export const favoritesLimiter = createRateLimiter(
  15 * 60 * 1000,
  50,
  "Too many favorites requests, please try again later."
);

export const strictLimiter = createRateLimiter(
  15 * 60 * 1000,
  10,
  "Too many requests, please try again later."
); 