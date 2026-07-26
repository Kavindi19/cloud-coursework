import { Prisma } from "@prisma/client";

export function errorHandler(error, req, res, next) {
  console.error({
    message: error.message,
    stack: error.stack,
    method: req.method,
    path: req.originalUrl
  });

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "The requested event was not found."
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with the same unique value already exists."
      });
    }
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "An unexpected server error occurred."
        : error.message,
    ...(process.env.NODE_ENV === "development" && {
      error: error.message,
      stack: error.stack
    })
  });
}