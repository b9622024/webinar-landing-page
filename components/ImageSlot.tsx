"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

type ImageSlotProps = {
  src?: string;
  alt: string;
  title: string;
  note: string;
  label?: string;
  compact?: boolean;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
};

export function ImageSlot({
  src,
  alt,
  title,
  note,
  label,
  compact = false,
  className = "",
  frameClassName = "",
  imageClassName = ""
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);
  const shouldShowImage = Boolean(src) && !failed;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-brand border border-olive-100 bg-white shadow-soft",
        compact ? "min-h-[180px]" : "min-h-[430px]",
        className
      ].join(" ")}
    >
      {shouldShowImage ? (
        <figure className="flex h-full min-h-[inherit] flex-col bg-white">
          <div
            className={[
              "flex flex-1 items-center justify-center bg-neutral-950 p-3",
              compact ? "min-h-[180px] aspect-[4/3]" : "min-h-[430px] aspect-[4/5]",
              frameClassName
            ].join(" ")}
          >
            {/* Native img keeps deployment simple and lets the fallback appear when the file is missing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={alt}
              className={["max-h-full max-w-full object-contain", imageClassName].join(" ")}
              onError={() => setFailed(true)}
              src={src}
            />
          </div>
          {label ? (
            <figcaption className="border-t border-olive-100 bg-white px-4 py-3 text-center text-sm font-black tracking-[0.12em] text-olive-700">
              {label}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(237,244,239,.95),rgba(255,255,255,.9)_45%,rgba(250,248,241,.95))]" />
          <div className="absolute left-5 top-5 h-24 w-24 rounded-full border border-olive-100 bg-white/70" />
          <div className="absolute bottom-5 right-5 h-32 w-32 rounded-full border border-wheat/50 bg-white/60" />
          <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-olive-600 shadow-soft">
              <ImageIcon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black text-ink">{title}</p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-muted">{note}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
