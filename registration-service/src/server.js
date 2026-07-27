import "dotenv/config";
import app from "./app.js";
import prisma, { pool } from "./config/prisma.js";

const PORT = Number(process.env.PORT) || 3003;

let server;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log(
      "Registration Service connected to PostgreSQL."
    );

    server = app.listen(PORT, () => {
      console.log(
        `Registration Service running on port ${PORT}`
      );

      console.log(
        `Health check: http://localhost:${PORT}/health`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start Registration Service:",
      error
    );

    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      await pool.end();

      console.log("Registration Service stopped.");
      process.exit(0);
    });
  } else {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();