"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

type ImageSlotProps = {
  src?: string;
  alt: string;
  title: string;
  note: string;
  compact?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ImageSlot({
  src,
  alt,
  title,
  note,
  compact = false,
  className = "",
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
        // Native img keeps deployment simple and lets the fallback appear when the file is missing.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt}
          className={[
            "h-full min-h-[inherit] w-full object-cover",
            compact ? "aspect-[4/3]" : "aspect-[4/5]",
            imageClassName
          ].join(" ")}
          onError={() => setFailed(true)}
          src={src}
        />
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
