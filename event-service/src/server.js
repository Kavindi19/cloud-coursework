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

// Kubernetes blue/green deployment colour.
// The value comes from event-blue-deployment.yaml or
// event-green-deployment.yaml.
const DEPLOYMENT_VERSION =
  process.env.DEPLOYMENT_VERSION || "local-development";

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
    message: "Event Service API is running.",
    deploymentColour: DEPLOYMENT_VERSION
  });
});

app.get("/health", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      service: "event-service",
      database: "connected",
      deploymentColour: DEPLOYMENT_VERSION,
      version: "Blue-Green Deployment Test v4",
      checkedAt: new Date().toISOString()
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
  console.log(`Deployment colour: ${DEPLOYMENT_VERSION}`);
  console.log("Blue-Green Deployment Test v3");
});

const shutdown = async () => {
  console.log("Shutting down Event Service...");

  try {
    await prisma.$disconnect();

    server.close(() => {
      console.log("Event Service stopped successfully.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error while shutting down Event Service:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);