import { FavoriteModel } from "../models/favorite.model.js";

export const FavoriteController = {
  addFavorite: async (req, res) => {
    try {
      const { userId, recipeId, title, image, cookTime, servings } = req.body;

      if (!userId || !recipeId || !title) {
        return res.status(400).json({
          success: false,
          error:
            "Missing required fields: userId, recipeId, and title are required",
        });
      }

      const favoriteData = {
        userId,
        recipeId,
        title,
        image: image || null,
        cookTime: cookTime || null,
        servings: servings || null,
      };

      const newFavorite = await FavoriteModel.add(favoriteData);

      res.status(201).json({
        success: true,
        data: newFavorite,
        message: "Recipe added to favorites successfully",
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};
