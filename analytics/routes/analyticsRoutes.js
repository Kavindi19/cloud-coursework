const express = require("express");

const {
  createAnalyticsEvent,
  getAnalyticsEvents
} = require("../controllers/analyticsController");

const router = express.Router();

router.post("/", createAnalyticsEvent);
router.get("/", getAnalyticsEvents);

module.exports = router;