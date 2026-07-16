export const analyticsEvents = [
  "PageView",
  "WebinarCTA",
  "ViewContent",
  "Lead",
  "ClickLine",
  "ApplicationSubmit",
  "WebinarComplete"
] as const;

export const analyticsSections = ["header", "hero", "mid", "footer", "sticky", "line", "success"] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];
export type AnalyticsSection = (typeof analyticsSections)[number];

export type StoredAnalyticsEvent = {
  eventName: AnalyticsEvent;
  pageSection?: string;
  label?: string;
  path?: string;
  destination?: string;
  source?: string;
  funnel?: string;
  referrer?: string;
  timestamp?: string;
  utm?: Record<string, string>;
};

export type DailyAnalytics = {
  date: string;
  events: Record<AnalyticsEvent, number>;
  sections: Record<AnalyticsSection, number>;
};

export type AnalyticsSummary = {
  configured: boolean;
  generatedAt: string;
  ranges: {
    today: DailyAnalytics;
    last7Days: DailyAnalytics;
    last30Days: DailyAnalytics;
  };
  daily: DailyAnalytics[];
};

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const keyPrefix = "analytics:v1";
const ttlSeconds = 60 * 60 * 24 * 180;

export function hasAnalyticsStore() {
  return Boolean(redisUrl && redisToken);
}

function isAnalyticsEvent(eventName: unknown): eventName is AnalyticsEvent {
  return typeof eventName === "string" && analyticsEvents.includes(eventName as AnalyticsEvent);
}

function isSection(section: string | undefined): section is AnalyticsSection {
  return Boolean(section && analyticsSections.includes(section as AnalyticsSection));
}

function getTaipeiDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Taipei",
    year: "numeric"
  }).formatToParts(date);

  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function shiftDate(date: string, days: number) {
  const base = new Date(`${date}T00:00:00+08:00`);
  base.setUTCDate(base.getUTCDate() + days);
  return getTaipeiDate(base);
}

function emptyDaily(date: string): DailyAnalytics {
  return {
    date,
    events: Object.fromEntries(analyticsEvents.map((event) => [event, 0])) as Record<AnalyticsEvent, number>,
    sections: Object.fromEntries(analyticsSections.map((section) => [section, 0])) as Record<AnalyticsSection, number>
  };
}

function eventKey(date: string, eventName: AnalyticsEvent) {
  return `${keyPrefix}:${date}:event:${eventName}`;
}

function sectionKey(date: string, section: AnalyticsSection) {
  return `${keyPrefix}:${date}:section:${section}`;
}

async function redisPipeline(commands: Array<Array<string | number>>) {
  if (!redisUrl || !redisToken) {
    return [];
  }

  const response = await fetch(`${redisUrl}/pipeline`, {
    body: JSON.stringify(commands),
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(`Analytics store request failed: ${response.status}`);
  }

  return response.json() as Promise<Array<{ result: string | number | null }>>;
}

export async function recordAnalyticsEvent(payload: StoredAnalyticsEvent) {
  if (!hasAnalyticsStore() || !isAnalyticsEvent(payload.eventName)) {
    return;
  }

  const date = getTaipeiDate();
  const commands: Array<Array<string | number>> = [
    ["INCR", eventKey(date, payload.eventName)],
    ["EXPIRE", eventKey(date, payload.eventName), ttlSeconds]
  ];

  if (isSection(payload.pageSection)) {
    commands.push(
      ["INCR", sectionKey(date, payload.pageSection)],
      ["EXPIRE", sectionKey(date, payload.pageSection), ttlSeconds]
    );
  }

  await redisPipeline(commands);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const today = getTaipeiDate();
  const dates = Array.from({ length: 30 }, (_, index) => shiftDate(today, -index));

  if (!hasAnalyticsStore()) {
    const empty = emptyDaily(today);
    return {
      configured: false,
      daily: dates.map((date) => emptyDaily(date)),
      generatedAt: new Date().toISOString(),
      ranges: {
        today: empty,
        last7Days: empty,
        last30Days: empty
      }
    };
  }

  const commands = dates.flatMap((date) => [
    ...analyticsEvents.map((event) => ["GET", eventKey(date, event)] as Array<string | number>),
    ...analyticsSections.map((section) => ["GET", sectionKey(date, section)] as Array<string | number>)
  ]);
  const results = await redisPipeline(commands);
  let cursor = 0;

  const daily = dates.map((date) => {
    const item = emptyDaily(date);

    analyticsEvents.forEach((event) => {
      item.events[event] = Number(results[cursor]?.result || 0);
      cursor += 1;
    });

    analyticsSections.forEach((section) => {
      item.sections[section] = Number(results[cursor]?.result || 0);
      cursor += 1;
    });

    return item;
  });

  return {
    configured: true,
    daily,
    generatedAt: new Date().toISOString(),
    ranges: {
      today: rollup(daily.slice(0, 1), "今天"),
      last7Days: rollup(daily.slice(0, 7), "近 7 天"),
      last30Days: rollup(daily, "近 30 天")
    }
  };
}

function rollup(items: DailyAnalytics[], label: string) {
  const total = emptyDaily(label);

  items.forEach((item) => {
    analyticsEvents.forEach((event) => {
      total.events[event] += item.events[event];
    });
    analyticsSections.forEach((section) => {
      total.sections[section] += item.sections[section];
    });
  });

  return total;
}
