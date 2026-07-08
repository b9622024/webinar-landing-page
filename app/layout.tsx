import type { Metadata, Viewport } from "next";
import type React from "react";
import { MetaPixel } from "@/components/MetaPixel";
import { siteContent } from "@/data/content";
import "./globals.css";

const metadataBase = new URL(
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
);

export const metadata: Metadata = {
  metadataBase,
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: siteContent.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "AI 健康副業免費線上說明會"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [siteContent.seo.ogImage]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5ef"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
