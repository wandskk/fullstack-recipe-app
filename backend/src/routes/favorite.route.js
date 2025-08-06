import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import {
  validateFavoriteData,
  validateUserId,
  validateFavoriteParams,
} from "../middleware/validation.js";
import { favoritesLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/", favoritesLimiter, validateFavoriteData, FavoriteController.addFavorite);

router.delete(
  "/:userId/:recipeId",
  favoritesLimiter,
  validateFavoriteParams,
  FavoriteController.removeFavorite
);

router.get("/:userId", favoritesLimiter, validateUserId, FavoriteController.getFavorites);

export { router as favoriteRoutes };
