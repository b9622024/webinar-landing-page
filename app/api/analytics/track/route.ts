import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analyticsStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await recordAnalyticsEvent(payload);
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
