import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<LeadPayload> | null;

  const answers = body?.answers ?? {};
  const payload: LeadPayload = {
    event_type: (body?.event_type ?? "lead_captured") as LeadEventType,
    email: body?.email ?? "",
    answers: {
      q1: (answers as { q1?: string; q1Role?: string }).q1 ?? (answers as { q1Role?: string }).q1Role ?? "",
      q2: (answers as { q2?: string; q2Goal?: string }).q2 ?? (answers as { q2Goal?: string }).q2Goal ?? "",
      q3: (answers as { q3?: string; q3Pileup?: string }).q3 ?? (answers as { q3Pileup?: string }).q3Pileup ?? "",
      q4: (answers as { q4?: string; q4Start?: string }).q4 ?? (answers as { q4Start?: string }).q4Start ?? "",
      q5: (answers as { q5?: string; q5Lost?: string }).q5 ?? (answers as { q5Lost?: string }).q5Lost ?? "",
    },
    plan_key: body?.plan_key ?? "",
    plan_name: body?.plan_name ?? "",
    createdAt: body?.createdAt ?? new Date().toISOString(),
    pagePath: body?.pagePath ?? "/lead-magnet",
    utm: body?.utm,
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
    console.log("Lead payload:", payload);
  }

  // Response: { ok: true } to allow client flows to continue immediately.
  return NextResponse.json({ ok: true });
}
