import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { ENV } from "./config/env.js";
import router from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { logInfo } from "./utils/logger.js";
import { specs } from "./config/swagger.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(generalLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", router);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logInfo("Server started", {
      port: PORT,
      environment: ENV.NODE_ENV,
      healthCheck: `http://localhost:${PORT}/api/health`,
      apiDocs: `http://localhost:${PORT}/api-docs`,
    });
  });
}

export { app };
