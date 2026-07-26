import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import prisma from "./config/prisma.js";
import { swaggerDocument } from "./config/swagger.js";

const app = express();

const PORT = process.env.PORT || 3001;

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
    message: "Event Service API is running."
  });
});

app.get("/health", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      service: "event-service",
      database: "connected"
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/events", eventRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Event Service running on http://localhost:${PORT}`);
  console.log(`Swagger documentation: http://localhost:${PORT}/api-docs`);
});

const shutdown = async () => {
  console.log("Shutting down Event Service...");

  await prisma.$disconnect();

  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);