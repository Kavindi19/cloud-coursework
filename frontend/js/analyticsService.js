(function () {
  const ANALYTICS_API = "/api/analytics";

  function getSessionId() {
    let sessionId = sessionStorage.getItem("analyticsSessionId");

    if (!sessionId) {
      sessionId =
        "session-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 10);

      sessionStorage.setItem("analyticsSessionId", sessionId);
    }

    return sessionId;
  }

  async function trackAnalyticsEvent({
    eventType,
    page,
    eventId = 0,
    eventName = "",
    category = "",
    userEmail = ""
  }) {
    try {
      const response = await fetch(ANALYTICS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventType,
          page,
          eventId: Number(eventId) || 0,
          eventName,
          category,
          userEmail,
          sessionId: getSessionId()
        })
      });

      if (!response.ok) {
        console.error(
          "Analytics request failed:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      // Analytics failure should not stop the main application.
      console.error("Analytics tracking error:", error);
    }
  }

  window.trackAnalyticsEvent = trackAnalyticsEvent;
})();