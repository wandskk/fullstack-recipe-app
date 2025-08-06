import { FavoriteModel } from "../models/favorite.model.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const FavoriteController = {
  addFavorite: asyncHandler(async (req, res) => {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    const favoriteData = {
      userId,
      recipeId,
      title,
      image: image || null,
      cookTime: cookTime || null,
      servings: servings || null,
    };

    const newFavorite = await FavoriteModel.addFavorite(favoriteData);

    res.status(201).json({
      success: true,
      data: newFavorite,
      message: "Recipe added to favorites successfully",
    });
  }),

  removeFavorite: asyncHandler(async (req, res) => {
    const { userId, recipeId } = req.params;

    await FavoriteModel.removeFavorite(userId, recipeId);

    res.status(200).json({
      success: true,
      message: "Favorite removed successfully",
    });
  }),

  getFavorites: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const favorites = await FavoriteModel.getFavorites(userId);

    res.status(200).json({
      success: true,
      data: favorites,
      message: "Favorites retrieved successfully",
    });
  }),
};
