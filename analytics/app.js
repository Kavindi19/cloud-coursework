const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Analytics Service is running"
  });
});

app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});