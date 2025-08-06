const createAppError = (message, statusCode = 500, isOperational = true) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  Error.captureStackTrace(error, createAppError);
  return error;
};

const createValidationError = (message) => {
  return createAppError(message, 400);
};

const createNotFoundError = (message = 'Resource not found') => {
  return createAppError(message, 404);
};

const createUnauthorizedError = (message = 'Unauthorized') => {
  return createAppError(message, 401);
};

const createForbiddenError = (message = 'Forbidden') => {
  return createAppError(message, 403);
};

const createConflictError = (message = 'Conflict') => {
  return createAppError(message, 409);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = createNotFoundError(message);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = createConflictError(message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = createValidationError(message);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = createUnauthorizedError(message);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = createUnauthorizedError(message);
  }

  const errorResponse = {
    success: false,
    error: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json(errorResponse);
  }

  res.status(500).json(errorResponse);
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const notFoundHandler = (req, res, next) => {
  const error = createNotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

export {
  createAppError,
  createValidationError,
  createNotFoundError,
  createUnauthorizedError,
  createForbiddenError,
  createConflictError,
  errorHandler,
  asyncHandler,
  notFoundHandler
}; 