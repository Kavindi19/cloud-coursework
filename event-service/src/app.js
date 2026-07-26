import express from "express";
import eventRoutes from "./routes/eventRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger.js";

const app = express();

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
    message: "Event Service API is running."
  });
});

app.use("/api/events", eventRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;