"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function getUtm(searchParams: URLSearchParams) {
  return utmKeys.reduce<Record<string, string>>((acc, key) => {
    const value = searchParams.get(key);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedPath.current === path) {
      return;
    }

    lastTrackedPath.current = path;
    trackAnalyticsEvent({
      eventName: "PageView",
      path,
      utm: getUtm(searchParams)
    });
  }, [pathname, searchParams]);

  return null;
}
