import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";

export const FavoriteModel = {
  add: async (favoriteData) => {
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
};
