import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe App API",
      version: "1.0.0",
      description: "API documentation for the Recipe App backend",
      contact: {
        name: "API Support",
        email: "support@recipeapp.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Favorite: {
          type: "object",
          required: ["userId", "recipeId", "title"],
          properties: {
            userId: {
              type: "string",
              description: "User ID",
              example: "user-123",
            },
            recipeId: {
              type: "integer",
              description: "Recipe ID",
              example: 123,
            },
            title: {
              type: "string",
              description: "Recipe title",
              example: "Chocolate Cake",
            },
            image: {
              type: "string",
              description: "Recipe image URL",
              example: "https://example.com/image.jpg",
            },
            cookTime: {
              type: "string",
              description: "Cooking time",
              example: "30 minutes",
            },
            servings: {
              type: "string",
              description: "Number of servings",
              example: "4 servings",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              description: "Error message",
            },
            details: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Validation error details",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              description: "Response data",
            },
            message: {
              type: "string",
              description: "Success message",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

export const specs = swaggerJsdoc(options); 