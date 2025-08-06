import Joi from "joi";

const favoriteSchema = Joi.object({
  userId: Joi.string().required().min(1).messages({
    "string.empty": "userId cannot be empty",
    "any.required": "userId is required",
  }),
  recipeId: Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+$/).message("recipeId must be a valid number")
  ).required().messages({
    "any.required": "recipeId is required",
  }),
  title: Joi.string().required().min(1).max(255).messages({
    "string.empty": "title cannot be empty",
    "string.max": "title cannot exceed 255 characters",
    "any.required": "title is required",
  }),
  image: Joi.string().uri().optional().allow(null, "").messages({
    "string.uri": "image must be a valid URL",
  }),
  cookTime: Joi.string().optional().allow(null, "").max(50).messages({
    "string.max": "cookTime cannot exceed 50 characters",
  }),
  servings: Joi.string().optional().allow(null, "").max(20).messages({
    "string.max": "servings cannot exceed 20 characters",
  }),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().required().min(1).messages({
    "string.empty": "userId cannot be empty",
    "any.required": "userId is required",
  }),
});

const favoriteParamsSchema = Joi.object({
  userId: Joi.string().required().min(1).messages({
    "string.empty": "userId cannot be empty",
    "any.required": "userId is required",
  }),
  recipeId: Joi.alternatives().try(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+$/).message("recipeId must be a valid number")
  ).required().messages({
    "any.required": "recipeId is required",
  }),
});

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errorMessages,
        timestamp: new Date().toISOString(),
      });
    }

    req[property] = value;
    next();
  };
};

export const validateFavoriteData = validate(favoriteSchema, "body");
export const validateUserId = validate(userIdParamSchema, "params");
export const validateFavoriteParams = validate(favoriteParamsSchema, "params");

export const validateRequest = (schema, property = "body") => {
  return validate(schema, property);
}; 