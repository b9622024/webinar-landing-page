import {
  ArrowDownRight,
  CalendarDays,
  Check,
  CircleX,
  Clock3,
  Sparkles
} from "lucide-react";
import type React from "react";
import { CTAButton } from "@/components/CTAButton";
import { ImageSlot } from "@/components/ImageSlot";
import { siteContent } from "@/data/content";
import { LINE_URL, WEBINAR_URL } from "@/data/links";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-olive-100 bg-white px-4 py-2 text-sm font-black text-olive-700 shadow-soft">
      <Sparkles aria-hidden="true" className="h-4 w-4" />
      {children}
    </div>
  );
}

export default function Home() {
  const content = siteContent;

  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-olive-100/90 bg-cream/90 backdrop-blur-xl">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <a className="min-w-0" href="#top" aria-label={content.brand.name}>
            <p className="truncate text-base font-black leading-tight sm:text-lg">
              {content.brand.name}
            </p>
            <p className="hidden text-xs font-bold text-muted sm:block">{content.brand.kicker}</p>
          </a>
          <CTAButton
            href={WEBINAR_URL}
            pageSection="header"
            className="hidden px-5 py-3 text-sm sm:inline-flex"
          >
            {content.cta.primary}
          </CTAButton>
        </div>
      </header>

      <section id="top" className="pb-12 pt-10 sm:pt-14 lg:pb-16">
        <div className="container-page">
          <div className="max-w-4xl">
            <SectionLabel>{content.hero.eyebrow}</SectionLabel>
            <h1 className="max-w-3xl text-[2.18rem] font-black leading-[1.18] tracking-normal text-ink sm:text-6xl lg:text-[4.05rem]">
              <span className="block">{content.hero.titleLines[0]}</span>
              <span className="mt-2 block">
                用
                <span className="mx-1 rounded-xl bg-olive-50 px-2 text-olive-700">
                  數位產品
                </span>
                與
                <span className="mx-1 rounded-xl bg-olive-50 px-2 text-olive-700">
                  AI 測驗
                </span>
              </span>
              <span className="mt-2 block">
                打造
                <span className="text-olive-700">陌生人主動詢問</span>
                的
                <span className="whitespace-nowrap text-olive-700">AI 健康副業</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-muted sm:text-xl sm:leading-10">
              這場
              <strong className="font-black text-ink">約 35 分鐘</strong>
              的
              <strong className="font-black text-ink">免費線上說明會</strong>
              ，會帶你看懂如何運用數位產品與 AI 減脂測驗，讓陌生人從願意了解、主動對話，到進入健康解析與陪跑服務。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton href={WEBINAR_URL} pageSection="hero" className="w-full sm:w-auto">
                {content.cta.primary}
              </CTAButton>
              <p className="text-center text-sm font-bold text-muted sm:text-left">
                {content.cta.note}
              </p>
            </div>
            <div className="mt-4 flex items-start gap-2 text-sm font-black leading-7 text-muted">
              <CalendarDays aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-olive-600" />
              <span>{content.hero.scheduleNote}</span>
            </div>
            <p className="mt-4 max-w-2xl rounded-2xl border border-olive-100 bg-white/70 px-4 py-3 text-sm font-bold leading-7 text-muted">
              {content.hero.trustNote}
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page rounded-[28px] border border-olive-100 bg-white p-5 shadow-soft sm:p-8">
          <SectionLabel>一開始不用具備</SectionLabel>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">
            {content.notRequired.title}
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.notRequired.items.map((item) => (
              <div
                className="rounded-brand border border-olive-100 bg-cream/70 p-5 text-lg font-black shadow-sm"
                key={item}
              >
                <Check aria-hidden="true" className="mb-4 h-6 w-6 text-olive-600" />
                {item}
              </div>
            ))}
          </div>
          <p className="mt-7 rounded-2xl bg-olive-50 px-5 py-4 text-center text-lg font-black text-olive-700">
            {content.notRequired.note}
          </p>
          <div className="mt-7 text-center">
            <CTAButton href={WEBINAR_URL} pageSection="mid" className="w-full sm:w-auto">
              {content.cta.primary}
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <SectionLabel>適合的人，比人數更重要</SectionLabel>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">
            {content.audience.title}
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <AudienceCard positive title={content.audience.fit.title} items={content.audience.fit.items} />
            <AudienceCard title={content.audience.notFit.title} items={content.audience.notFit.items} />
          </div>
          <p className="mt-7 text-center text-2xl font-black leading-relaxed text-ink">
            {content.audience.footer}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <SectionLabel>線上研討會裡的五個懸念</SectionLabel>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                {content.seminar.title}
              </h2>
              <p className="mt-3 text-lg text-muted">{content.seminar.subtitle}</p>
            </div>
            <CTAButton
              href={WEBINAR_URL}
              pageSection="mid"
              variant="secondary"
              className="sm:self-center"
            >
              {content.cta.case}
            </CTAButton>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.seminar.cards.map((card, index) => (
              <article
                className="flex min-h-[220px] flex-col justify-between rounded-brand border border-olive-100 bg-white p-5 shadow-soft"
                key={card}
              >
                <span className="text-sm font-black tracking-[0.18em] text-wheat">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-black leading-8">{card}</h3>
                <ArrowDownRight aria-hidden="true" className="mt-6 h-6 w-6 text-olive-600" />
              </article>
            ))}
          </div>
          <div className="mt-7 text-center">
            <CTAButton href={WEBINAR_URL} pageSection="mid" className="w-full sm:w-auto">
              {content.cta.primary}
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <SectionLabel>真實夥伴案例</SectionLabel>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              {content.partnerStory.title}
            </h2>
            <p className="mt-4 text-lg leading-9 text-muted">{content.partnerStory.subtitle}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.partnerStory.stats.map((stat) => (
                <div className="rounded-brand border border-olive-100 bg-white p-5 shadow-soft" key={stat.label}>
                  <p className="text-4xl font-black text-olive-700">{stat.value}</p>
                  <p className="mt-2 font-bold text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-brand border border-olive-100 bg-olive-50 p-5">
              <p className="text-sm font-black text-olive-700">結果</p>
              <p className="mt-2 text-xl font-black leading-8">{content.partnerStory.result}</p>
            </div>
            <CTAButton href={WEBINAR_URL} pageSection="mid" className="mt-6 w-full sm:w-auto">
              {content.cta.story}
            </CTAButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.partnerStory.images.map((image) => (
              <ImageSlot
                compact
                key={image}
                src={`/images/${image}`}
                alt="真實夥伴案例截圖"
                label={image.includes("result") ? "夥伴結果" : "夥伴案例"}
                title={`/public/images/${image}`}
                note="真實對話或成果截圖 placeholder"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page grid gap-6 rounded-[28px] border border-olive-100 bg-white p-5 shadow-soft sm:p-8 lg:grid-cols-[.86fr_1.14fr] lg:items-start">
          <ImageSlot
            src={content.speaker.image}
            alt={content.speaker.name}
            title="/public/images/chongming.png"
            note="主講人照片 placeholder"
            imageClassName="object-cover object-top"
          />
          <div>
            <SectionLabel>主講人</SectionLabel>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              {content.speaker.name}
            </h2>
            <p className="mt-3 text-lg font-black text-olive-700">
              {content.speaker.roles.join("｜")}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {content.speaker.credentials.map((item, index) => (
                <article
                  className="rounded-brand border border-olive-100 bg-cream/70 p-5"
                  key={item.title}
                >
                  <p className="text-sm font-black tracking-[0.18em] text-wheat">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-black leading-8 text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm font-bold leading-7 text-muted">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-7 rounded-brand border border-olive-100 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-2xl font-black leading-9 text-ink">
                {content.speaker.story.title}
              </h3>
              <div className="mt-4 grid gap-4 text-base font-bold leading-8 text-muted">
                {content.speaker.story.paragraphs.map((paragraph, index) => (
                  <p
                    className={index === 3 ? "text-lg font-black text-olive-700" : ""}
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

            <blockquote className="mt-6 border-l-4 border-olive-500 bg-olive-50 px-5 py-5">
                <p className="text-xl font-black leading-9 text-ink sm:text-2xl sm:leading-10">
                  {content.speaker.quoteLines.map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </p>
            </blockquote>
              <div className="mt-6">
                <CTAButton href={WEBINAR_URL} pageSection="mid" className="w-full sm:w-auto">
                  {content.cta.primary}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <SectionLabel>不用現在決定</SectionLabel>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">
            {content.process.title}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {content.process.steps.map((step, index) => (
              <article className="rounded-brand border border-olive-100 bg-white p-6 shadow-soft" key={step.title}>
                <p className="text-sm font-black tracking-[0.18em] text-wheat">
                  STEP {index + 1}
                </p>
                <h3 className="mt-5 text-2xl font-black leading-9">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-white px-5 py-4 text-center text-lg font-black shadow-soft">
            {content.process.note}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">{content.faq.title}</h2>
          <div className="mt-7 grid gap-4">
            {content.faq.items.map((item) => (
              <article className="rounded-brand border border-olive-100 bg-white p-5 shadow-soft sm:p-6" key={item.question}>
                <h3 className="text-xl font-black leading-8">{item.question}</h3>
                <p className="mt-2 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 text-center">
            <CTAButton href={WEBINAR_URL} pageSection="footer" className="w-full sm:w-auto">
              {content.cta.primary}
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="pb-28 pt-10 sm:pb-16">
        <div className="container-page rounded-[30px] border border-olive-100 bg-white p-6 text-center shadow-soft sm:p-10">
          <Clock3 aria-hidden="true" className="mx-auto h-10 w-10 text-olive-600" />
          <h2 className="mt-5 text-3xl font-black leading-tight sm:text-6xl">
            {content.finalCta.title}
            <span className="mt-3 block text-olive-700">{content.finalCta.secondLine}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-muted">
            {content.finalCta.text}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black text-muted">
            {content.finalCta.details.map((detail) => (
              <span className="rounded-full border border-olive-100 bg-cream px-4 py-2" key={detail}>
                {detail}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href={WEBINAR_URL} pageSection="footer" className="w-full sm:w-auto">
              {content.cta.primary}
            </CTAButton>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-7 text-muted">
            {content.legalDisclosure}
          </p>

          <div className="mx-auto mt-10 max-w-2xl border-t border-olive-100 pt-8">
            <h3 className="text-xl font-black text-ink">{content.finalCta.lineHelp.title}</h3>
            <p className="mx-auto mt-2 max-w-xl text-base leading-8 text-muted">
              {content.finalCta.lineHelp.text}
            </p>
            <CTAButton href={LINE_URL} kind="line" variant="secondary" className="mt-5 px-5 py-3 text-sm">
              {content.finalCta.lineHelp.cta}
            </CTAButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-olive-100 py-8 text-center text-sm font-bold text-muted">
        <p>{content.brand.name}｜{content.brand.kicker}</p>
        <p className="mx-auto mt-4 max-w-3xl px-4 leading-7">{content.legalDisclosure}</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-cream via-cream/95 to-cream/0 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-7 sm:hidden">
        <CTAButton href={WEBINAR_URL} pageSection="sticky" className="w-full">
          {content.cta.mobile}
        </CTAButton>
      </div>
    </main>
  );
}

function AudienceCard({
  title,
  items,
  positive = false
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <article className="rounded-[28px] border border-olive-100 bg-white p-5 shadow-soft sm:p-7">
      <div
        className={[
          "mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black",
          positive ? "bg-olive-50 text-olive-700" : "bg-cream text-muted"
        ].join(" ")}
      >
        {positive ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <CircleX aria-hidden="true" className="h-4 w-4" />
        )}
        {title}
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li className="flex items-start gap-3 text-base font-bold leading-7 text-muted" key={item}>
            <span
              className={[
                "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                positive
                  ? "border-olive-100 bg-olive-50 text-olive-600"
                  : "border-olive-100 bg-white text-muted"
              ].join(" ")}
            >
              {positive ? (
                <Check aria-hidden="true" className="h-4 w-4" />
              ) : (
                <CircleX aria-hidden="true" className="h-4 w-4" />
              )}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
