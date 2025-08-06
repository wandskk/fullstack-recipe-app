import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import router from "./routes/index.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
  console.log(`📱 Environment: ${ENV.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
