import { FavoriteModel } from "../models/favorite.model.js";

export const FavoriteController = {
  addFavorite: async (req, res) => {
    try {
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
    } catch (error) {
      console.log("Error adding favorite:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  removeFavorite: async (req, res) => {
    try {
      const { userId, recipeId } = req.params;

      await FavoriteModel.removeFavorite(userId, recipeId);

      res.status(200).json({
        success: true,
        message: "Favorite removed successfully",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getFavorites: async (req, res) => {
    try {
      const { userId } = req.params;
      const favorites = await FavoriteModel.getFavorites(userId);

      res.status(200).json({
        success: true,
        data: favorites,
        message: "Favorites retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
