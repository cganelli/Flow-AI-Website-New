import type { PlanSlug } from "./plans";

export type PlanComparisonContent = {
  diy: {
    time: string;
    calendar?: string;
    riskBullets: string[];
  };
  flow: {
    time: string;
    implementationOutput: string[];
    qualityAssurance: string[];
  };
};

const PLAN_COMPARISON: Record<PlanSlug, PlanComparisonContent> = {
  "lead-follow-up": {
    diy: {
      time: "16 to 30 hours",
      calendar: "2 to 5 weeks",
      riskBullets: [
        "Drafts sound off-brand, so you stop using them",
        "Follow-ups fail when inputs vary or data is missing",
        "The tracker goes stale, then becomes useless",
      ],
    },
    flow: {
      time: "7 days",
      implementationOutput: [
        "System design plus rollout timeline",
        "Connected lead intake from email and forms",
        "Lead details extracted into a clean tracker record",
        "Drafted follow-ups in your voice, with approval before sending",
        "Follow-up scheduling and reminders for no-response leads",
        "Stalled-lead alerts plus a weekly pipeline summary",
      ],
      qualityAssurance: [
        "Voice and tone guardrails for drafts",
        "Monitoring and exception handling for missing details and duplicates",
        "Daily digest plus weekly performance reporting",
      ],
    },
  },
  "support-triage": {
    diy: {
      time: "22 to 45 hours",
      calendar: "3 to 8 weeks",
      riskBullets: [
        "Replies drift off-policy or sound wrong",
        "Routing breaks when messages vary in wording",
        "The queue becomes messy, then ignored",
      ],
    },
    flow: {
      time: "7 days",
      implementationOutput: [
        "System design plus rollout timeline",
        "Centralized request queue from email and chat",
        "Requests labeled by topic, urgency, and sentiment",
        "Drafted replies grounded in your approved answers, with approval before sending",
        "Routing rules to the right person or team",
        "Escalations for urgent and aging requests, plus daily digest and weekly trends",
      ],
      qualityAssurance: [
        "Guardrails to keep replies on-policy and on-tone",
        "Monitoring and exception handling for misroutes and edge cases",
        "Daily and weekly reporting on response time, backlog, and repeat issues",
      ],
    },
  },
  "meeting-follow-up": {
    diy: {
      time: "12 to 24 hours",
      riskBullets: [
        "Output quality depends on messy notes",
        "Owners and due dates get missed, tasks stall",
        "Follow-ups do not go out consistently",
      ],
    },
    flow: {
      time: "7 days",
      implementationOutput: [
        "System design plus rollout timeline",
        "Meeting notes converted into action items with owners and due dates",
        "Drafted follow-up emails in your voice, with approval before sending",
        "Reminders and overdue nudges to owners",
        "Missing-owner and missing-date detection",
        "Weekly execution summary plus stuck alerts",
      ],
      qualityAssurance: [
        "Voice and tone guardrails for follow-ups",
        "Monitoring and exception handling for messy notes and ambiguous tasks",
        "Daily and weekly reporting on completion rates and overdue actions",
      ],
    },
  },
  "weekly-visibility": {
    diy: {
      time: "18 to 36 hours",
      calendar: "3 to 6 weeks",
      riskBullets: [
        "Inputs are incomplete, brief loses trust",
        "Blockers are missed, leaders get surprised",
        "The brief becomes noise, then stops getting read",
      ],
    },
    flow: {
      time: "7 days",
      implementationOutput: [
        "System design plus rollout timeline",
        "Automated weekly brief generation from your existing sources",
        "Risk and blocker flags with clear callouts",
        "Scheduled delivery to email or team chat",
        "Weekly trends summary and high-risk item list",
        "Review and approval step so leadership trusts the output",
      ],
      qualityAssurance: [
        "Consistent formatting and tone, every week",
        "Monitoring and exception handling for missing or stale source data",
        "Weekly reporting on coverage, risks, and response patterns",
      ],
    },
  },
  "handoff-tracker": {
    diy: {
      time: "10 to 22 hours",
      calendar: "2 to 4 weeks",
      riskBullets: [
        "Missing context causes rework and back-and-forth",
        "Ownership is unclear, work stalls",
        "Escalations become noisy, people ignore them",
      ],
    },
    flow: {
      time: "7 days",
      implementationOutput: [
        "System design plus rollout timeline",
        "Automated task creation and routing across steps",
        "Generated handoff notes with required context, with approval before sending",
        "Missing-info checks before a handoff completes",
        "Escalations for overdue steps and blocked stages",
        "Weekly bottleneck report with root cause categories",
      ],
      qualityAssurance: [
        "Guardrails to enforce required fields and clean handoffs",
        "Monitoring and exception handling for edge cases and stage drift",
        "Daily and weekly reporting on cycle time, overdue steps, and bottlenecks",
      ],
    },
  },
};

export function getPlanComparisonContent(slug: PlanSlug): PlanComparisonContent {
  return PLAN_COMPARISON[slug] ?? PLAN_COMPARISON["lead-follow-up"];
}
