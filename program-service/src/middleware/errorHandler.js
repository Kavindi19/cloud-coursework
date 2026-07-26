const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "The requested program was not found.",
    });
  }

  if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with the same unique value already exists.",
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "An internal server error occurred."
        : error.message,
  });
};

export default errorHandler;