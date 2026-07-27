const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Registration was not found.",
    });
  }

  if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with the supplied values already exists.",
    });
  }

  const statusCode = error.statusCode || 500;

  const response = {
    success: false,
    message:
      statusCode === 500
        ? "An unexpected internal server error occurred."
        : error.message,
  };

  if (error.details) {
    response.details = error.details;
  }

  if (
    process.env.NODE_ENV === "development" &&
    statusCode === 500
  ) {
    response.error = error.message;
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;