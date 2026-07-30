const { createClient } = require("@clickhouse/client");

const clickhouse = createClient({
  url:
    process.env.CLICKHOUSE_URL ||
    "http://clickhouse.analytics.svc.cluster.local:8123",
  username: process.env.CLICKHOUSE_USER || "admin",
  password:
    process.env.CLICKHOUSE_PASSWORD || "CourseworkClickHouse123",
  database: process.env.CLICKHOUSE_DATABASE || "analytics"
});

const allowedEventTypes = [
  "EVENT_CLICK",
  "EVENT_VIEW",
  "REGISTRATION_ATTEMPT",
  "REGISTRATION_SUCCESS"
];

const createAnalyticsEvent = async (req, res) => {
  try {
    const {
      eventType,
      page,
      eventId,
      eventName,
      category,
      userEmail,
      sessionId
    } = req.body;

    if (!eventType || !page) {
      return res.status(400).json({
        success: false,
        message: "eventType and page are required"
      });
    }

    if (!allowedEventTypes.includes(eventType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid eventType. Allowed values: ${allowedEventTypes.join(
          ", "
        )}`
      });
    }

    await clickhouse.insert({
      table: "web_analytics",
      values: [
        {
          event_type: eventType,
          page,
          event_id: Number(eventId) || 0,
          user_email: userEmail || "",
          event_name: eventName || "",
          category: category || "",
          session_id: sessionId || ""
        }
      ],
      format: "JSONEachRow"
    });

    return res.status(201).json({
      success: true,
      message: "Analytics event recorded successfully",
      eventType
    });
  } catch (error) {
    console.error("ClickHouse insert error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record analytics event",
      error: error.message
    });
  }
};

const getAnalyticsEvents = async (req, res) => {
  try {
    const resultSet = await clickhouse.query({
      query: `
        SELECT
          id,
          event_type,
          page,
          event_id,
          event_name,
          category,
          user_email,
          session_id,
          timestamp
        FROM web_analytics
        ORDER BY timestamp DESC
        LIMIT 100
      `,
      format: "JSONEachRow"
    });

    const data = await resultSet.json();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.error("ClickHouse query error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve analytics events",
      error: error.message
    });
  }
};

module.exports = {
  createAnalyticsEvent,
  getAnalyticsEvents
};