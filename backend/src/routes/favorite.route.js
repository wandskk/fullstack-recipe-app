import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", FavoriteController.addFavorite);
router.delete("/:userId/:recipeId", FavoriteController.removeFavorite);
router.get("/:userId", FavoriteController.getFavorites);

export { router as favoriteRoutes };
