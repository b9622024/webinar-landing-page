"use client";

export type MetaPixelEvent =
  | "PageView"
  | "ViewContent"
  | "WebinarCTA"
  | "ClickLine"
  | "ApplicationSubmit";

type Fbq = (
  command: "track" | "trackCustom",
  eventName: MetaPixelEvent,
  parameters?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function hasMetaPixel() {
  return Boolean(META_PIXEL_ID);
}

export function trackMetaEvent(
  eventName: MetaPixelEvent,
  parameters?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq || !hasMetaPixel()) {
    return;
  }

  if (
    eventName === "WebinarCTA" ||
    eventName === "ClickLine" ||
    eventName === "ApplicationSubmit"
  ) {
    window.fbq("trackCustom", eventName, parameters);
    return;
  }

  window.fbq("track", eventName, parameters);
}
