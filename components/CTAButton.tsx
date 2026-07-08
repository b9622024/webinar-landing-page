"use client";

import type React from "react";
import { ArrowRight, CalendarDays, MessageCircle, UserCheck } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";

type CTAButtonProps = {
  children: React.ReactNode;
  href?: string;
  kind?: "webinar" | "line" | "lead";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const fallbackUrl = "#";

export function CTAButton({
  children,
  href,
  kind = "webinar",
  variant = "primary",
  className = ""
}: CTAButtonProps) {
  const url = href || fallbackUrl;

  function handleClick() {
    if (kind === "webinar") {
      trackMetaEvent("WebinarCTA", { label: String(children) });
      trackMetaEvent("ViewContent", { content_name: "Webinar schedule" });
    }

    if (kind === "line") {
      trackMetaEvent("ClickLine", { label: String(children) });
    }

    if (kind === "lead") {
      trackMetaEvent("Lead", { content_name: "One-on-one fit assessment" });
    }
  }

  const Icon = kind === "line" ? MessageCircle : kind === "lead" ? UserCheck : CalendarDays;

  return (
    <a
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-center text-base font-black transition duration-200 focus:outline-none focus:ring-4 focus:ring-olive-100",
        variant === "primary"
          ? "bg-olive-500 text-white shadow-button hover:bg-olive-600 hover:-translate-y-0.5"
          : "",
        variant === "secondary"
          ? "border border-olive-100 bg-white text-ink shadow-soft hover:border-olive-500 hover:-translate-y-0.5"
          : "",
        variant === "ghost"
          ? "text-olive-700 underline-offset-4 hover:underline"
          : "",
        className
      ].join(" ")}
      href={url}
      onClick={handleClick}
      rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
      target={url.startsWith("http") ? "_blank" : undefined}
    >
      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span>{children}</span>
      {variant !== "ghost" ? <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /> : null}
    </a>
  );
}
