import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import {
  validateFavoriteData,
  validateUserId,
  validateFavoriteParams,
} from "../middleware/validation.js";

const router = Router();

router.post("/", validateFavoriteData, FavoriteController.addFavorite);
router.delete(
  "/:userId/:recipeId",
  validateFavoriteParams,
  FavoriteController.removeFavorite
);
router.get("/:userId", validateUserId, FavoriteController.getFavorites);

export { router as favoriteRoutes };
