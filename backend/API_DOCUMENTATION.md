# Recipe App API Documentation

## Overview

The Recipe App API provides endpoints for managing user favorites. This API is built with Node.js, Express, and uses Neon database with Drizzle ORM.

## Base URL

```
http://localhost:5001/api
```

## Authentication

Currently, the API doesn't require authentication. All endpoints are publicly accessible.

## Rate Limiting

- **General endpoints:** 100 requests per 15 minutes
- **Favorites endpoints:** 50 requests per 15 minutes
- **Authentication endpoints:** 5 requests per 15 minutes

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error details"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Endpoints

### Health Check

#### GET /health

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Favorites

#### POST /favorites

Add a recipe to user favorites.

**Request Body:**
```json
{
  "userId": "user-123",
  "recipeId": 123,
  "title": "Chocolate Cake",
  "image": "https://example.com/image.jpg",
  "cookTime": "30 minutes",
  "servings": "4 servings"
}
```

**Required Fields:**
- `userId` (string): User ID
- `recipeId` (integer): Recipe ID
- `title` (string): Recipe title

**Optional Fields:**
- `image` (string): Recipe image URL
- `cookTime` (string): Cooking time
- `servings` (string): Number of servings

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": "user-123",
    "recipeId": 123,
    "title": "Chocolate Cake",
    "image": "https://example.com/image.jpg",
    "cookTime": "30 minutes",
    "servings": "4 servings",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Recipe added to favorites successfully"
}
```

#### GET /favorites/{userId}

Get all favorites for a specific user.

**Parameters:**
- `userId` (string): User ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userId": "user-123",
      "recipeId": 123,
      "title": "Chocolate Cake",
      "image": "https://example.com/image.jpg",
      "cookTime": "30 minutes",
      "servings": "4 servings",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Favorites retrieved successfully"
}
```

#### DELETE /favorites/{userId}/{recipeId}

Remove a recipe from user favorites.

**Parameters:**
- `userId` (string): User ID
- `recipeId` (integer): Recipe ID

**Response:**
```json
{
  "success": true,
  "message": "Favorite removed successfully"
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Validation Errors

When validation fails, the API returns detailed error messages:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "userId is required",
    "recipeId must be a valid number",
    "title cannot be empty"
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Interactive Documentation

Access the interactive API documentation at:
```
http://localhost:5001/api-docs
```

This provides a Swagger UI interface where you can:
- View all available endpoints
- Test API calls directly
- See request/response schemas
- Understand data models

## Development

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5001
DATABASE_URL=your_neon_database_url
NODE_ENV=development
```

## Database Schema

### Favorites Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| userId | TEXT | User ID |
| recipeId | INTEGER | Recipe ID |
| title | TEXT | Recipe title |
| image | TEXT | Recipe image URL |
| cookTime | TEXT | Cooking time |
| servings | TEXT | Number of servings |
| createdAt | TIMESTAMP | Creation timestamp |

## Security Features

- **Rate Limiting:** Prevents abuse and DDoS attacks
- **Input Validation:** Validates all incoming data
- **Error Handling:** Comprehensive error handling
- **Logging:** Structured logging for monitoring
- **CORS:** Cross-origin resource sharing enabled

## Performance

- **Database:** Optimized queries with Drizzle ORM
- **Caching:** Ready for Redis integration
- **Logging:** Structured logging with Winston
- **Monitoring:** Health check endpoints available 