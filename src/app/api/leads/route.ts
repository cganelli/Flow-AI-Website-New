// Lead capture API: accept POST with lead/kit/pdf_download payload; optionally forward to LEAD_WEBHOOK_URL.
import { type NextRequest, NextResponse } from "next/server";

export type LeadEventType = "lead_captured" | "kit_requested" | "pdf_download";

export type LeadPayload = {
  event_type: LeadEventType;
  email: string;
  firstName?: string;
  lastName?: string;
  websiteUrl?: string;
  answers: { q1: string; q2: string; q3: string; q4: string; q5: string };
  plan_key: string;
  plan_name: string;
  createdAt: string; // ISO
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

export async function POST(request: NextRequest) {
  let payload: LeadPayload | Record<string, unknown>;
  try {
    const body = await request.json();
    if (body.event_type === "pdf_download") {
      payload = body as Record<string, unknown>;
    } else {
      payload = {
        event_type: body.event_type,
        email: body.email ?? "",
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        websiteUrl: body.websiteUrl ?? undefined,
        answers: {
          q1: body.answers?.q1 ?? "",
          q2: body.answers?.q2 ?? "",
          q3: body.answers?.q3 ?? "",
          q4: body.answers?.q4 ?? "",
          q5: body.answers?.q5 ?? "",
        },
        plan_key: body.plan_key ?? "",
        plan_name: body.plan_name ?? "",
        createdAt: body.createdAt ?? new Date().toISOString(),
        pagePath: body.pagePath ?? "",
        utm: body.utm,
        userAgent: request.headers.get("user-agent") ?? undefined,
      };
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[leads] Webhook failed:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[leads] Webhook error:", err);
    }
  } else {
    console.log("[leads] Payload (no webhook):", JSON.stringify(payload, null, 2));
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
