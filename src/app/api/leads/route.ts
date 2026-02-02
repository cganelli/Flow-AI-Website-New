import { type NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

type LeadEventType = "lead_captured" | "kit_requested";

type LeadPayload = {
  event_type: LeadEventType;
  email: string;
  answers: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
  };
  plan_key: string;
  plan_name: string;
  createdAt: string;
  pagePath: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  userAgent?: string;
};

const allowedEventTypes: LeadEventType[] = ["lead_captured", "kit_requested"];

const allowedOrigins = [
  "https://thisisflowai.com",
  "https://www.thisisflowai.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    return allowedOrigins.some((allowed) => origin.startsWith(allowed));
  }

  if (referer) {
    return allowedOrigins.some((allowed) => referer.startsWith(allowed));
  }

  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = await checkRateLimit(clientId, 5, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
        },
      },
    );
  }

  if (!validateOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Invalid origin" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Partial<LeadPayload> | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const answers = body?.answers ?? {};
  const eventType = safeString(body.event_type, 32) as LeadEventType;
  const email = safeString(body.email, 254);

  if (!allowedEventTypes.includes(eventType)) {
    return NextResponse.json({ ok: false, error: "Invalid event_type" }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  const payload: LeadPayload = {
    event_type: eventType,
    email,
    answers: {
      q1: safeString(
        (answers as { q1?: string; q1Role?: string }).q1 ?? (answers as { q1Role?: string }).q1Role,
        200,
      ),
      q2: safeString(
        (answers as { q2?: string; q2Goal?: string }).q2 ?? (answers as { q2Goal?: string }).q2Goal,
        200,
      ),
      q3: safeString(
        (answers as { q3?: string; q3Pileup?: string }).q3 ?? (answers as { q3Pileup?: string }).q3Pileup,
        200,
      ),
      q4: safeString(
        (answers as { q4?: string; q4Start?: string }).q4 ?? (answers as { q4Start?: string }).q4Start,
        200,
      ),
      q5: safeString(
        (answers as { q5?: string; q5Lost?: string }).q5 ?? (answers as { q5Lost?: string }).q5Lost,
        200,
      ),
    },
    plan_key: safeString(body.plan_key, 120),
    plan_name: safeString(body.plan_name, 200),
    createdAt: new Date().toISOString(),
    pagePath: safeString(body.pagePath, 200) || "/lead-magnet",
    utm: body.utm
      ? {
          source: safeString(body.utm.source, 120),
          medium: safeString(body.utm.medium, 120),
          campaign: safeString(body.utm.campaign, 120),
          content: safeString(body.utm.content, 120),
          term: safeString(body.utm.term, 120),
        }
      : undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Lead webhook failed:", error);
    }
  } else {
    console.log("Lead payload received", {
      event_type: payload.event_type,
      plan_key: payload.plan_key,
      pagePath: payload.pagePath,
      hasEmail: Boolean(payload.email),
    });
  }

  // Response: { ok: true } to allow client flows to continue immediately.
  return NextResponse.json({ ok: true });
}
