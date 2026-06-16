export const errorHandler = (err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

export const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

