import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analyticsStore";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password) {
    return false;
  }

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${password}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Dashboard password is missing or incorrect." },
      { status: 401 }
    );
  }

  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { error: "Unable to load analytics summary." },
      { status: 500 }
    );
  }
}
