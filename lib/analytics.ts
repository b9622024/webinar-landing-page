"use client";

export type AnalyticsEventName =
  | "PageView"
  | "WebinarCTA"
  | "ViewContent"
  | "Lead"
  | "ClickLine"
  | "ApplicationSubmit"
  | "WebinarComplete";

export type AnalyticsPayload = {
  eventName: AnalyticsEventName;
  pageSection?: string;
  label?: string;
  path?: string;
  destination?: string;
  source?: string;
  funnel?: string;
  utm?: Record<string, string>;
};

export function trackAnalyticsEvent(payload: AnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    ...payload,
    path: payload.path || window.location.pathname,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString()
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }

  void fetch("/api/analytics/track", {
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    method: "POST"
  });
}
