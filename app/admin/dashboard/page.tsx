import type { Metadata } from "next";
import { DashboardClient } from "@/components/DashboardClient";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false
  },
  title: "LP 數據分析 Dashboard｜可樂吉健康研究所"
};

export default function DashboardPage() {
  return <DashboardClient />;
}
