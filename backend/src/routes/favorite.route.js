import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", FavoriteController.addFavorite);

export { router as favoriteRoutes };
