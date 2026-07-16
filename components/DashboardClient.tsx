"use client";

import { RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { AnalyticsEvent, AnalyticsSection, AnalyticsSummary, DailyAnalytics } from "@/lib/analyticsStore";

type LoadState = "idle" | "loading" | "ready" | "error";

const eventLabels: Record<AnalyticsEvent, string> = {
  ApplicationSubmit: "問卷送出",
  ClickLine: "LINE 點擊",
  Lead: "潛在顧客",
  PageView: "LP 瀏覽",
  ViewContent: "查看研討會",
  WebinarCTA: "預約按鈕點擊",
  WebinarComplete: "研討會看完"
};

const sectionLabels: Record<AnalyticsSection, string> = {
  footer: "底部 CTA",
  header: "Header CTA",
  hero: "首屏 CTA",
  line: "LINE",
  mid: "中段 CTA",
  sticky: "手機 sticky",
  success: "感謝頁"
};

function percent(numerator: number, denominator: number) {
  if (!denominator) {
    return "0%";
  }

  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-TW").format(value);
}

export function DashboardClient() {
  const [password, setPassword] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem("dashboard-password") || "";
  });
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");

  const loadSummary = useCallback(async (nextPassword = password) => {
    setState("loading");
    setError("");

    try {
      const response = await fetch("/api/analytics/summary", {
        headers: {
          Authorization: `Bearer ${nextPassword}`
        }
      });

      if (!response.ok) {
        throw new Error("密碼不正確，或 Vercel 尚未設定 DASHBOARD_PASSWORD。");
      }

      const data = (await response.json()) as AnalyticsSummary;
      setSummary(data);
      setState("ready");
      window.localStorage.setItem("dashboard-password", nextPassword);
    } catch (err) {
      setState("error");
      setSummary(null);
      setError(err instanceof Error ? err.message : "讀取 Dashboard 失敗。");
    }
  }, [password]);

  const ranges = useMemo(() => {
    if (!summary) {
      return [];
    }

    return [
      { label: "今天", value: summary.ranges.today },
      { label: "近 7 天", value: summary.ranges.last7Days },
      { label: "近 30 天", value: summary.ranges.last30Days }
    ];
  }, [summary]);

  return (
    <div className="min-h-screen px-0 py-8 sm:py-12">
      <main className="container-page">
        <div className="flex flex-col gap-6 border-b border-olive-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-wheat">PRIVATE DASHBOARD</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-ink sm:text-6xl">
              LP 數據分析
            </h1>
            <p className="mt-3 max-w-2xl text-base font-bold leading-8 text-muted">
              查看 Landing Page 瀏覽、預約按鈕、LINE 點擊，以及問卷送出後回到感謝頁的數據。
            </p>
          </div>

          <form
            className="flex w-full flex-col gap-3 rounded-brand border border-olive-100 bg-white p-4 shadow-soft sm:max-w-md sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void loadSummary();
            }}
          >
            <input
              className="min-h-12 flex-1 rounded-full border border-olive-100 bg-cream px-4 text-base font-bold text-ink outline-none focus:border-olive-500 focus:ring-4 focus:ring-olive-100"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="輸入 Dashboard 密碼"
              type="password"
              value={password}
            />
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-olive-500 px-5 text-base font-black text-white shadow-button transition hover:-translate-y-0.5 hover:bg-olive-600"
              type="submit"
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              更新
            </button>
          </form>
        </div>

        {state === "error" ? (
          <div className="mt-8 rounded-brand border border-olive-100 bg-white p-5 text-base font-bold leading-8 text-muted shadow-soft">
            {error}
          </div>
        ) : null}

        {state === "loading" ? (
          <div className="mt-8 rounded-brand border border-olive-100 bg-white p-5 text-base font-black text-muted shadow-soft">
            正在讀取數據...
          </div>
        ) : null}

        {summary ? (
          <>
            {!summary.configured ? (
              <div className="mt-8 rounded-brand border border-olive-100 bg-white p-5 text-base font-bold leading-8 text-muted shadow-soft">
                尚未設定雲端資料庫環境變數。請在 Vercel 新增
                `UPSTASH_REDIS_REST_URL` 與 `UPSTASH_REDIS_REST_TOKEN` 後重新部署。
              </div>
            ) : null}

            <section className="mt-8 grid gap-4 lg:grid-cols-3">
              {ranges.map((range) => (
                <RangeCard data={range.value} key={range.label} title={range.label} />
              ))}
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.85fr]">
              <DailyTable daily={summary.daily} />
              <SectionBreakdown data={summary.ranges.last30Days} />
            </section>

            <p className="mt-6 text-sm font-bold text-muted">
              最後更新：{new Date(summary.generatedAt).toLocaleString("zh-TW")}
            </p>
          </>
        ) : (
          <div className="mt-8 rounded-brand border border-olive-100 bg-white p-5 text-base font-bold leading-8 text-muted shadow-soft">
            請輸入 Dashboard 密碼查看數據。
          </div>
        )}
      </main>
    </div>
  );
}

function RangeCard({ data, title }: { data: DailyAnalytics; title: string }) {
  const views = data.events.PageView;
  const cta = data.events.WebinarCTA;
  const applications = data.events.ApplicationSubmit;

  return (
    <article className="rounded-brand border border-olive-100 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-black text-ink">{title}</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="LP 瀏覽" value={views} />
        <Metric label="預約點擊" value={cta} />
        <Metric label="CTA 點擊率" textValue={percent(cta, views)} />
        <Metric label="問卷送出" value={applications} />
      </div>
      <div className="mt-5 rounded-2xl bg-olive-50 px-4 py-3 text-sm font-black leading-7 text-olive-700">
        預約到問卷送出率：{percent(applications, cta)}
      </div>
    </article>
  );
}

function Metric({
  label,
  textValue,
  value
}: {
  label: string;
  textValue?: string;
  value?: number;
}) {
  return (
    <div className="rounded-2xl border border-olive-100 bg-cream/70 p-4">
      <p className="text-xs font-black text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-ink">{textValue || formatNumber(value || 0)}</p>
    </div>
  );
}

function DailyTable({ daily }: { daily: DailyAnalytics[] }) {
  return (
    <section className="overflow-hidden rounded-brand border border-olive-100 bg-white shadow-soft">
      <div className="border-b border-olive-100 p-5">
        <h2 className="text-2xl font-black text-ink">最近 30 天</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-cream text-xs font-black text-muted">
            <tr>
              <th className="px-4 py-3">日期</th>
              <th className="px-4 py-3">瀏覽</th>
              <th className="px-4 py-3">預約點擊</th>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">LINE</th>
              <th className="px-4 py-3">問卷送出</th>
              <th className="px-4 py-3">CTA 率</th>
            </tr>
          </thead>
          <tbody>
            {daily.map((day) => (
              <tr className="border-t border-olive-100" key={day.date}>
                <td className="px-4 py-3 font-black text-ink">{day.date}</td>
                <td className="px-4 py-3 font-bold text-muted">{formatNumber(day.events.PageView)}</td>
                <td className="px-4 py-3 font-bold text-muted">{formatNumber(day.events.WebinarCTA)}</td>
                <td className="px-4 py-3 font-bold text-muted">{formatNumber(day.events.Lead)}</td>
                <td className="px-4 py-3 font-bold text-muted">{formatNumber(day.events.ClickLine)}</td>
                <td className="px-4 py-3 font-bold text-muted">{formatNumber(day.events.ApplicationSubmit)}</td>
                <td className="px-4 py-3 font-bold text-muted">
                  {percent(day.events.WebinarCTA, day.events.PageView)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SectionBreakdown({ data }: { data: DailyAnalytics }) {
  return (
    <section className="rounded-brand border border-olive-100 bg-white p-5 shadow-soft">
      <h2 className="text-2xl font-black text-ink">CTA 區塊表現</h2>
      <p className="mt-2 text-sm font-bold text-muted">近 30 天各位置點擊數</p>
      <div className="mt-5 grid gap-3">
        {(Object.keys(sectionLabels) as AnalyticsSection[]).map((section) => (
          <div
            className="flex items-center justify-between gap-4 rounded-2xl border border-olive-100 bg-cream/70 px-4 py-3"
            key={section}
          >
            <span className="text-sm font-black text-muted">{sectionLabels[section]}</span>
            <span className="text-xl font-black text-ink">{formatNumber(data.sections[section])}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-olive-50 px-4 py-3 text-sm font-bold leading-7 text-olive-700">
        「研討會看完」需要 WebinarKit 提供完成頁導回、Webhook 或匯出資料後才能自動累積。
      </div>
    </section>
  );
}
