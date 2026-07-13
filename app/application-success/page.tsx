import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ApplicationSubmitTracker } from "@/components/ApplicationSubmitTracker";
import { CTAButton } from "@/components/CTAButton";
import { LINE_URL } from "@/data/links";

export const metadata: Metadata = {
  title: "申請表已送出｜可樂吉健康研究所",
  description:
    "我已經收到你的申請資料，接下來會依照內容評估是否適合安排一對一事業適性評估。"
};

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen px-0 py-10 sm:py-14">
      <ApplicationSubmitTracker />

      <section className="container-page flex min-h-[calc(100vh-7rem)] items-center justify-center">
        <div className="w-full max-w-3xl rounded-[30px] border border-olive-100 bg-white p-6 text-center shadow-soft sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive-50 text-olive-600">
            <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
          </div>

          <p className="mt-6 text-sm font-black tracking-[0.18em] text-wheat">
            APPLICATION RECEIVED
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-6xl">
            申請表已送出
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-9 text-muted sm:text-xl">
            我已經收到你的申請資料，接下來會依照內容評估是否適合安排一對一事業適性評估。
          </p>

          <div className="mx-auto mt-7 max-w-2xl rounded-brand border border-olive-100 bg-cream/70 p-5 text-left sm:p-6">
            <p className="text-base font-bold leading-8 text-muted">
              這不是報名加入，也不是保證錄取。這是一個雙向了解的評估流程，我會依照你的現況、動機、過去經驗與可投入時間，判斷是否適合安排下一步。
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href={LINE_URL} kind="line" className="w-full sm:w-auto">
              加入 LINE 與我聯繫
            </CTAButton>
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-olive-100 bg-white px-6 py-4 text-center text-base font-black text-ink shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-olive-500 focus:outline-none focus:ring-4 focus:ring-olive-100 sm:w-auto"
              href="/"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5 shrink-0" />
              回到說明會頁面
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
