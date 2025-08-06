import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import router from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { logInfo } from "./utils/logger.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(generalLimiter);

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  logInfo("Server started", {
    port: PORT,
    environment: ENV.NODE_ENV,
    healthCheck: `http://localhost:${PORT}/api/health`,
  });
});
