import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 3002;

let server;

async function startServer() {
  try {
    // Verify that the database connection works
    await prisma.$connect();

    console.log("Program Service connected to PostgreSQL.");

    server = app.listen(PORT, () => {
      console.log(`Program Service running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start Program Service:", error);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down Program Service...`);

  try {
    if (server) {
      server.close(async () => {
        await prisma.$disconnect();
        console.log("Database connection closed.");
        process.exit(0);
      });
    } else {
      await prisma.$disconnect();
      process.exit(0);
    }
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();