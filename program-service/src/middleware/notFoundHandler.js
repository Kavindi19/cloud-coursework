import AppError from "../utils/AppError.js";

const notFoundHandler = (req, res, next) => {
  next(
    new AppError(
      `Route ${req.method} ${req.originalUrl} was not found.`,
      404
    )
  );
};

export default notFoundHandler;