import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import {
  validateFavoriteData,
  validateUserId,
  validateFavoriteParams,
} from "../middleware/validation.js";
import { favoritesLimiter } from "../middleware/rateLimit.js";

const router = Router();

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a recipe to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: Recipe added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.post("/", favoritesLimiter, validateFavoriteData, FavoriteController.addFavorite);

/**
 * @swagger
 * /favorites/{userId}/{recipeId}:
 *   delete:
 *     summary: Remove a recipe from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:userId/:recipeId",
  favoritesLimiter,
  validateFavoriteParams,
  FavoriteController.removeFavorite
);

/**
 * @swagger
 * /favorites/{userId}:
 *   get:
 *     summary: Get all favorites for a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Favorite'
 *                 message:
 *                   type: string
 *                   example: "Favorites retrieved successfully"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get("/:userId", favoritesLimiter, validateUserId, FavoriteController.getFavorites);

export { router as favoriteRoutes };
