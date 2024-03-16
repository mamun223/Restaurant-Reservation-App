/**
 * Express API error handler.
 */
function errorHandler(error, request, response, next) {
  const { status = 400, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

module.exports = errorHandler;
