import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";

const router = Router();

router.post("/", FavoriteController.addFavorite);
router.delete("/:userId/:recipeId", FavoriteController.removeFavorite);

export { router as favoriteRoutes };
