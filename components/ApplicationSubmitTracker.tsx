"use client";

import { useEffect, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

export function ApplicationSubmitTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) {
      return;
    }

    tracked.current = true;
    trackMetaEvent("ApplicationSubmit", {
      source: "tally",
      funnel: "ai_health_business"
    });
    trackAnalyticsEvent({
      eventName: "ApplicationSubmit",
      funnel: "ai_health_business",
      pageSection: "success",
      source: "tally"
    });
  }, []);

  return null;
}
