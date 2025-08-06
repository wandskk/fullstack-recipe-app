import request from "supertest";
import { app } from "../server.js";

describe("Health Check", () => {
  test("GET /api/health should return 200", async () => {
    const response = await request(app).get("/api/health");
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "Server is running");
    expect(response.body).toHaveProperty("timestamp");
  });

  test("GET /api/nonexistent should return 404", async () => {
    const response = await request(app).get("/api/nonexistent");
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("error");
  });
}); 