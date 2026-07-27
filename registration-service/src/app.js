import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./config/swagger.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// General middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Root endpoint
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Registration Service API is running.",
  });
});

// Health-check endpoint
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    service: "registration-service",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Swagger API documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Registration CRUD routes
app.use("/api/registrations", registrationRoutes);

// Handle unknown routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;