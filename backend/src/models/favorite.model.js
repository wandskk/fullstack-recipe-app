import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

export const FavoriteModel = {
  addFavorite: async (favoriteData) => {
    try {
      const newFavorite = await db
        .insert(favoritesTable)
        .values(favoriteData)
        .returning();
      return newFavorite[0];
    } catch (error) {
      throw new Error(`Failed to create favorite: ${error.message}`);
    }
  },
  removeFavorite: async (userId, recipeId) => {
    try {
      const result = await db
        .delete(favoritesTable)
        .where(
          and(
            eq(favoritesTable.userId, userId),
            eq(favoritesTable.recipeId, parseInt(recipeId))
          )
        )
        .returning();

      if (result.length === 0) {
        throw new Error("Favorite not found");
      }
    } catch (error) {
      throw new Error(`Failed to remove favorite: ${error.message}`);
    }
  },
};
