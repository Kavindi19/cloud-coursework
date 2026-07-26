export function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found.`
  });
}