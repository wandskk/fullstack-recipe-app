import { Router } from "express";
import { favoriteRoutes } from "./favorite.route.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/favorite", favoriteRoutes);

export default router;
