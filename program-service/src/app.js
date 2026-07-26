import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import programRoutes from "./routes/programRoutes.js";
import swaggerDocument from "./config/swagger.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Program Service API is running.",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "program-service",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Swagger API documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: "Program Service API Documentation",
  })
);

// Program API routes
app.use("/api/programs", programRoutes);

// Must remain after all valid routes
app.use(notFoundHandler);

// Must remain last
app.use(errorHandler);

export default app;