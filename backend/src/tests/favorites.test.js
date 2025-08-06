import request from "supertest";
import { app } from "../server.js";

describe("Favorites API", () => {
  const testFavorite = {
    userId: "test-user-123",
    recipeId: 123,
    title: "Test Recipe",
    image: "https://example.com/image.jpg",
    cookTime: "30 minutes",
    servings: "4 servings",
  };

  describe("POST /api/favorites", () => {
    test("should create a new favorite with valid data", async () => {
      const response = await request(app)
        .post("/api/favorites")
        .send(testFavorite)
        .expect(201);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message", "Recipe added to favorites successfully");
      expect(response.body.data).toHaveProperty("userId", testFavorite.userId);
      expect(response.body.data).toHaveProperty("recipeId", testFavorite.recipeId);
      expect(response.body.data).toHaveProperty("title", testFavorite.title);
    });

    test("should return 400 for missing required fields", async () => {
      const invalidFavorite = {
        userId: "test-user-123",
        title: "Test Recipe",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidFavorite)
        .expect(400);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "Validation failed");
      expect(response.body).toHaveProperty("details");
    });

    test("should return 400 for invalid recipeId", async () => {
      const invalidFavorite = {
        ...testFavorite,
        recipeId: "invalid-id",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidFavorite)
        .expect(400);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "Validation failed");
    });
  });

  describe("GET /api/favorites/:userId", () => {
    test("should return user favorites", async () => {
      const response = await request(app)
        .get(`/api/favorites/${testFavorite.userId}`)
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("message", "Favorites retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("should return 400 for invalid userId", async () => {
      const response = await request(app)
        .get("/api/favorites/")
        .expect(404);

      expect(response.body).toHaveProperty("success", false);
    });
  });

  describe("DELETE /api/favorites/:userId/:recipeId", () => {
    test("should delete a favorite", async () => {
      const response = await request(app)
        .delete(`/api/favorites/${testFavorite.userId}/${testFavorite.recipeId}`)
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "Favorite removed successfully");
    });

    test("should return 400 for invalid parameters", async () => {
      const response = await request(app)
        .delete("/api/favorites/invalid-user/invalid-recipe")
        .expect(400);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "Validation failed");
    });
  });
}); 