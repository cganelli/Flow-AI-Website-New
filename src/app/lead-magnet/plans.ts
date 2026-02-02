export type PlanKey =
  | "lead-follow-up-system"
  | "support-triage-system"
  | "meeting-follow-up-system"
  | "weekly-visibility-system"
  | "handoff-tracker-system";

export type Plan = {
  key: PlanKey;
  name: string;
  oneLiner: string;
  topOpportunity: string;
  planDays: { label: string; text: string }[];
  diy: {
    time: string;
    calendar: string;
    youNeed: string[];
    steps: string[];
    risks: string[];
    promptTemplates: string[];
  };
  build: {
    outputs: string[];
    qualityAssurance: string[];
  };
};

export const plans: Record<PlanKey, Plan> = {
  "lead-follow-up-system": {
    key: "lead-follow-up-system",
    name: "Lead follow-up system",
    topOpportunity: "Lead follow-up system",
    oneLiner: "Follow up fast, keep deals moving, stop leads going cold.",
    planDays: [
      {
        label: "Day 1",
        text: "Capture new leads from email and forms into one tracker, with a clear next step.",
      },
      {
        label: "Day 3",
        text: "Draft the first reply in your voice and apply follow-up timing rules by lead type.",
      },
      { label: "Day 7", text: "Stalled-lead alerts plus a weekly pipeline summary." },
    ],
    diy: {
      time: "16 to 30 hours",
      calendar: "2 to 5 weeks",
      youNeed: [
        "Access to your lead sources (email, forms, messages)",
        "A tracker (sheet or database) with required fields",
        "20 real lead examples plus 3 to 5 strong past replies",
      ],
      steps: [
        "List every lead entry point and decide what is in scope.",
        "Create a single tracker and define required fields and statuses.",
        "Clean duplicates and missing data, then set a consistent naming format.",
        "Write follow-up templates for common scenarios.",
        "Create an extraction prompt to pull lead details and intent.",
        "Create a drafting prompt that follows your templates and tone.",
        "Define 2 to 3 follow-up sequences and timing rules.",
        "Build a daily review routine to approve drafts and update status.",
        "Add stalled-lead rules and a weekly summary routine.",
      ],
      risks: [
        "Drafts sound off-brand, so you stop using them",
        "Follow-ups fail when inputs vary or data is missing",
        "The tracker goes stale, then becomes useless",
      ],
      promptTemplates: [
        "Extract lead details and intent from this message into the tracker fields.",
        "Draft the first reply using our follow-up templates and tone.",
        "Summarize stalled leads and list the next action for each.",
      ],
    },
    build: {
      outputs: [
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
  "support-triage-system": {
    key: "support-triage-system",
    name: "Support triage system",
    topOpportunity: "Support triage system",
    oneLiner: "Route requests fast, draft replies, reduce response delays.",
    planDays: [
      {
        label: "Day 1",
        text: "Centralize inbound requests into one queue and label by topic and urgency.",
      },
      {
        label: "Day 3",
        text: "Draft replies using your approved answers and route to the right owner.",
      },
      {
        label: "Day 7",
        text: "Escalations plus daily backlog digest and weekly trends summary.",
      },
    ],
    diy: {
      time: "22 to 45 hours",
      calendar: "3 to 8 weeks",
      youNeed: [
        "Access to support sources (email, contact form, chat)",
        "A shared queue (helpdesk, shared inbox, or tracker)",
        "An approved answer library, even if incomplete",
      ],
      steps: [
        "Pull 50 to 100 recent requests.",
        "Group them into 8 to 12 categories.",
        "Define urgency rules and what triggers escalation.",
        "Write approved answers for the top 10 to 20 questions.",
        "Create a labeling prompt for category and urgency.",
        "Create a reply prompt that uses only approved answers.",
        "Add a human review step before sending replies.",
        "Build daily routines for clearing backlog and updating outcomes.",
        "Track response time, backlog, and repeat issues weekly.",
      ],
      risks: [
        "Replies drift off-policy or sound wrong",
        "Routing breaks when messages vary in wording",
        "The queue becomes messy, then ignored",
      ],
      promptTemplates: [
        "Label this request by category and urgency using the approved list.",
        "Draft a reply using only approved answers, with a friendly tone.",
        "Summarize daily backlog status with key risks.",
      ],
    },
    build: {
      outputs: [
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
  "meeting-follow-up-system": {
    key: "meeting-follow-up-system",
    name: "Meeting follow-up system",
    topOpportunity: "Meeting follow-up system",
    oneLiner: "Turn meetings into tasks, reminders, and follow-ups.",
    planDays: [
      {
        label: "Day 1",
        text: "Convert meeting notes into action items with owners and due dates.",
      },
      {
        label: "Day 3",
        text: "Draft follow-up emails in your voice and schedule reminders automatically.",
      },
      { label: "Day 7", text: "Stuck detection plus a weekly completion summary." },
    ],
    diy: {
      time: "12 to 24 hours",
      calendar: "2 to 4 weeks",
      youNeed: [
        "A consistent meeting notes format",
        "A task tracker the team uses",
        "10 examples of real meeting notes",
      ],
      steps: [
        "Standardize your meeting notes template.",
        "Define what counts as a decision vs an action item.",
        "Define required fields for actions: owner, due date, next step.",
        "Create a prompt to extract decisions and action items from notes.",
        "Create a prompt to draft follow-up emails in your tone.",
        "Define reminder timing and escalation rules for overdue items.",
        "Add a review step so tasks and emails are correct before sending.",
        "Build a daily routine to ensure owners and due dates are valid.",
        "Send weekly summaries and tune what gets flagged as stuck.",
      ],
      risks: [
        "Output quality depends on messy notes",
        "Owners and due dates get missed, tasks stall",
        "Follow-ups do not go out consistently",
      ],
      promptTemplates: [
        "Extract decisions and action items from these meeting notes.",
        "Draft a follow-up email in our tone with next steps and owners.",
        "Summarize overdue actions and highlight blockers.",
      ],
    },
    build: {
      outputs: [
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
  "weekly-visibility-system": {
    key: "weekly-visibility-system",
    name: "Weekly visibility system",
    topOpportunity: "Weekly visibility system",
    oneLiner: "Collect updates automatically and send one weekly brief.",
    planDays: [
      {
        label: "Day 1",
        text: "Define the weekly brief template and identify update sources.",
      },
      {
        label: "Day 3",
        text: "Auto-collect updates and generate the first draft brief.",
      },
      {
        label: "Day 7",
        text: "Risk and blocker flags plus scheduled delivery.",
      },
    ],
    diy: {
      time: "18 to 36 hours",
      calendar: "3 to 6 weeks",
      youNeed: [
        "A weekly brief template (doc or email format)",
        "Access to where work is tracked (tasks, docs, sheets)",
        "One person to review the brief before it goes out",
      ],
      steps: [
        "Define the weekly brief format, sections, and success metrics.",
        "Identify where updates live across tools and people.",
        "Decide who owns each section and when updates are due.",
        "Create a prompt to summarize raw updates into your brief format.",
        "Create a prompt to flag blockers, risks, and slipping dates.",
        "Add a review step so the brief stays accurate and trusted.",
        "Create a schedule to gather updates and publish the brief.",
        "Establish a habit for leaders to reply with decisions and priorities.",
        "Tune the template after 2 to 3 weekly cycles.",
      ],
      risks: [
        "Inputs are incomplete, brief loses trust",
        "Blockers are missed, leaders get surprised",
        "The brief becomes noise, then stops getting read",
      ],
      promptTemplates: [
        "Summarize these updates into the weekly brief format.",
        "Flag blockers, risks, and slipping dates from this list.",
        "Draft the weekly trends summary with top risks.",
      ],
    },
    build: {
      outputs: [
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
  "handoff-tracker-system": {
    key: "handoff-tracker-system",
    name: "Handoff tracker system",
    topOpportunity: "Handoff tracker system",
    oneLiner: "Track owners and due dates, reduce handoff delays.",
    planDays: [
      {
        label: "Day 1",
        text: "Map one handoff and define the required info to hand off cleanly.",
      },
      {
        label: "Day 3",
        text: "Auto-create the next task and generate the handoff note.",
      },
      {
        label: "Day 7",
        text: "Escalations plus a weekly bottleneck report.",
      },
    ],
    diy: {
      time: "10 to 22 hours",
      calendar: "2 to 4 weeks",
      youNeed: [
        "A shared tracker for the handoff (task tool or sheet)",
        "Clear stages, owners, and definition of done",
        "10 examples of past handoffs",
      ],
      steps: [
        "Pick one revenue-critical handoff that causes delays.",
        "Map the steps, owners, approvals, and definitions of done.",
        "Define required fields before a handoff is valid.",
        "Create a prompt to generate the handoff note from tracker fields.",
        "Create a prompt to detect missing info and request it.",
        "Set due dates and escalation timing for each stage.",
        "Add a review step so handoffs do not ship incomplete.",
        "Create a weekly routine to review bottlenecks and late stages.",
        "Tune rules so escalations are useful, not noisy.",
      ],
      risks: [
        "Missing context causes rework and back-and-forth",
        "Ownership is unclear, work stalls",
        "Escalations become noisy, people ignore them",
      ],
      promptTemplates: [
        "Generate a handoff note from these tracker fields.",
        "Detect missing info and request what is needed to proceed.",
        "Summarize weekly bottlenecks and likely root causes.",
      ],
    },
    build: {
      outputs: [
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
