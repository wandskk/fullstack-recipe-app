import request from "supertest";
import { app } from "../server.js";

describe("Validation Middleware", () => {
  describe("Favorite Data Validation", () => {
    test("should pass validation with valid data", async () => {
      const validData = {
        userId: "test-user-123",
        recipeId: 123,
        title: "Test Recipe",
        image: "https://example.com/image.jpg",
        cookTime: "30 minutes",
        servings: "4 servings",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(validData)
        .expect(201);

      expect(response.body.success).toBe(true);
    });

    test("should fail validation with missing userId", async () => {
      const invalidData = {
        recipeId: 123,
        title: "Test Recipe",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details).toContain("userId is required");
    });

    test("should fail validation with missing recipeId", async () => {
      const invalidData = {
        userId: "test-user-123",
        title: "Test Recipe",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details).toContain("recipeId is required");
    });

    test("should fail validation with missing title", async () => {
      const invalidData = {
        userId: "test-user-123",
        recipeId: 123,
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details).toContain("title is required");
    });

    test("should fail validation with invalid image URL", async () => {
      const invalidData = {
        userId: "test-user-123",
        recipeId: 123,
        title: "Test Recipe",
        image: "invalid-url",
      };

      const response = await request(app)
        .post("/api/favorites")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.details).toContain("image must be a valid URL");
    });
  });

  describe("Parameter Validation", () => {
    test("should fail validation with invalid userId parameter", async () => {
      const response = await request(app)
        .get("/api/favorites/")
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    test("should fail validation with invalid recipeId parameter", async () => {
      const response = await request(app)
        .delete("/api/favorites/test-user/invalid-recipe")
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
    });
  });
}); 