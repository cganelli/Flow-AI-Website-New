export type PlanSlug =
  | "lead-follow-up"
  | "support-triage"
  | "meeting-follow-up"
  | "weekly-visibility"
  | "handoff-tracker";

export type PlanMeta = {
  slug: PlanSlug;
  name: string;
  oneLiner: string;
};

export type PlanPreviewDay = {
  dayLabel: string;
  title: string;
  bullets: string[];
};

export type PlanDayStep = {
  stepNumber: 1 | 2 | 3;
  title: string;
  goal: string;
  whatYouWillPaste: string;
  exampleInput: string;
  promptAsksQuestionsFirst: string;
  howToUseChecklist: string[];
  doneChecklist: string[];
};

export type PlanFullDay = {
  dayLabel: string;
  title: string;
  summary: string;
  steps: PlanDayStep[];
};

export type PlanContent = {
  meta: PlanMeta;
  previewDays: PlanPreviewDay[];
  fullDays: PlanFullDay[];
};

/** Exact Q2 option label -> slug. Match submission.answers.a2WorkPilesUp to these labels. */
const Q2_LABEL_TO_SLUG: Record<string, PlanSlug> = {
  "Lead follow-up and pipeline": "lead-follow-up",
  "Customer questions and support": "support-triage",
  "Scheduling, reminders, follow-ups": "meeting-follow-up",
  "Status updates, reports, dashboards": "weekly-visibility",
  "Approvals, handoffs, task tracking": "handoff-tracker",
};

const DEFAULT_SLUG: PlanSlug = "lead-follow-up";

export function selectPlanFromQ2(q2Answer: string): PlanMeta {
  const slug = Q2_LABEL_TO_SLUG[q2Answer] ?? DEFAULT_SLUG;
  return getPlanBySlug(slug).meta;
}

export function getPlanBySlug(slug: PlanSlug): PlanContent {
  const content = PLAN_BY_SLUG[slug];
  if (!content) {
    return PLAN_BY_SLUG[DEFAULT_SLUG];
  }
  return content;
}

export type PlanKey = "plan1" | "plan2" | "plan3" | "plan4" | "plan5";

const SLUG_TO_PLAN_KEY: Record<PlanSlug, PlanKey> = {
  "lead-follow-up": "plan1",
  "support-triage": "plan2",
  "meeting-follow-up": "plan3",
  "weekly-visibility": "plan4",
  "handoff-tracker": "plan5",
};

export function getPlanKeyFromSlug(slug: PlanSlug): PlanKey {
  return SLUG_TO_PLAN_KEY[slug] ?? "plan1";
}

function step(
  stepNumber: 1 | 2 | 3,
  title: string,
  goal: string,
  whatYouWillPaste: string,
  exampleInput: string,
  promptAsksQuestionsFirst: string,
  howToUse: string[],
  done: string[]
): PlanDayStep {
  return {
    stepNumber,
    title,
    goal,
    whatYouWillPaste,
    exampleInput,
    promptAsksQuestionsFirst,
    howToUseChecklist: howToUse,
    doneChecklist: done,
  };
}

function previewDay(dayLabel: string, title: string, bullets: string[]): PlanPreviewDay {
  return { dayLabel, title, bullets };
}

function fullDay(
  dayLabel: string,
  title: string,
  summary: string,
  steps: PlanDayStep[]
): PlanFullDay {
  return { dayLabel, title, summary, steps };
}

/** Build the "Copy and paste prompt" body: Task, questions first, then output. Reduces repetition. */
export function recipeBlock(params: {
  task: string;
  questions: string[];
  output: string;
  notesLabel?: string;
  notesPlaceholder?: string;
}): string {
  const { task, questions, output, notesLabel = "My notes:", notesPlaceholder = "[Paste]" } = params;
  const questionBlock = questions.length
    ? `Ask me these questions first.\n${questions.map((q, i) => `${i + 1}) ${q}`).join("\n")}\nAfter I answer, produce these outputs.\n`
    : "";
  const notesBlock = notesLabel || notesPlaceholder ? `\n${notesLabel}\n${notesPlaceholder}` : "";
  return `Task: ${task}\n${questionBlock}${output}${notesBlock}`;
}

/** Label example content by type for consistency (roofing vs accounting by day). */
export function exampleBlock(type: "roofing" | "accounting", content: string): string {
  return content.trim();
}

// Placeholder step for v1 (same structure, minimal copy)
const PLACEHOLDER_STEP = step(
  1,
  "Step title",
  "Goal for this step.",
  "What you will paste.",
  "Example input text.",
  "Task: Do X.\nAsk me these questions first.\n1) Question one?\n2) Question two?\nThen output: A, B, C.\n[Paste]",
  ["1) Paste.", "2) Run.", "3) Save."],
  ["I completed this step."]
);

const PLACEHOLDER_DAY = fullDay("Day 1", "Day title", "Day summary.", [
  { ...PLACEHOLDER_STEP, stepNumber: 1 },
  { ...PLACEHOLDER_STEP, stepNumber: 2, title: "Step 2" },
  { ...PLACEHOLDER_STEP, stepNumber: 3, title: "Step 3" },
]);

const PLACEHOLDER_PREVIEW_DAY = previewDay("Day 1", "Day title", [
  "Step 1: Do A",
  "Step 2: Do B",
  "Step 3: Do C",
]);

const SEVEN_PLACEHOLDER_PREVIEW_DAYS: PlanPreviewDay[] = Array.from(
  { length: 7 },
  (_, i) => ({
    ...PLACEHOLDER_PREVIEW_DAY,
    dayLabel: `Day ${i + 1}`,
    title: `Day ${i + 1} title`,
  })
);

const SEVEN_PLACEHOLDER_FULL_DAYS: PlanFullDay[] = Array.from({ length: 7 }, (_, i) => ({
  ...PLACEHOLDER_DAY,
  dayLabel: `Day ${i + 1}`,
  title: `Day ${i + 1} title`,
  summary: `Day ${i + 1} summary.`,
}));

// ——— Plan 1: Lead follow-up system ———
const LEAD_FOLLOW_UP_DAY_1_STEPS: PlanDayStep[] = [
  step(
    1,
    "Identify lead sources",
    "List every place leads show up, then pick what to include this week.",
    "A list of where leads arrive today.",
    exampleBlock(
      "roofing",
      `Email inbox: owner@roofco.com

Website form: Request a Quote
Google Business Profile messages`
    ),
    recipeBlock({
      task: "Identify lead sources for my business and choose what to include in week 1.",
      questions: [
        "What is your business type?",
        "What are the top 3 services you sell?",
        "What is your service area?",
        "What are your business hours?",
        "Who replies to new leads today?",
        "List every place leads arrive.",
      ],
      output:
        "A. Up to 3 in-scope sources for week 1 and why.\n" +
        "B. Out-of-scope sources and why.\n" +
        "C. A daily copy routine for each in-scope source.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Fill answers.", "2) Run.", "3) Save outputs in one doc."],
    ["You have up to 3 in-scope sources and a daily copy routine."]
  ),
  step(
    2,
    "Collect real lead examples",
    "Build a starter set of real leads and label them.",
    "10 to 20 real lead messages.",
    exampleBlock(
      "roofing",
      `Lead 1
Source: Website form
Message: Leaking near chimney, need repair this week.`
    ),
    recipeBlock({
      task: "Turn my real leads into a labeled set with a missing-info checklist.",
      questions: [
        "What is your most common lead request?",
        "What is your average sale size range?",
        "What next step do you want for most leads?",
      ],
      output:
        "A table with: Lead ID, source, what they want, urgency, lead type, missing info, best next step.\n" +
        "Then an 8-question missing info checklist.\n" +
        "Leads in this format:\nLead 1\nSource:\nMessage:",
      notesLabel: "Leads:",
      notesPlaceholder: "[Paste 10 to 20 leads]",
    }),
    ["1) Paste leads.", "2) Run.", "3) Save table and checklist."],
    ["You have labeled examples and the missing info checklist."]
  ),
  step(
    3,
    "Define your tracker fields",
    "Create a simple tracker you will keep using.",
    "Your current follow-up process in plain language.",
    exampleBlock("roofing", "We reply when we notice leads. We forget follow-ups."),
    recipeBlock({
      task: "Design my lead tracker with columns, statuses, and a daily routine.",
      questions: [
        "What next step do you want for most leads?",
        "How fast do you want first response?",
        "What counts as booked for you?",
        "What counts as closed won?",
        "List 3 reasons leads stall.",
      ],
      output:
        "A. Exactly 10 tracker columns with required vs optional.\n" +
        "B. Exactly 6 statuses with entry and exit rules.\n" +
        "C. A 10-minute daily routine.",
      notesLabel: "My process today:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste your current process.", "2) Run.", "3) Build the tracker exactly as output."],
    ["Tracker exists with 10 columns and 6 statuses."]
  ),
];

const LEAD_FOLLOW_UP_DAY_2_STEPS: PlanDayStep[] = [
  step(
    1,
    "Standardize naming rules",
    "One naming standard for names, companies, and sources.",
    "10 messy tracker examples.",
    exampleBlock(
      "accounting",
      `Name: mike s, Company: acme inc, Source: email
Name: Michael Smith, Company: ACME, Source: web form`
    ),
    recipeBlock({
      task: "Create naming rules and correct my examples.",
      questions: [
        "Do you prefer full names or first name only?",
        "Do you track company on every lead?",
      ],
      output:
        "A. Naming rules for name, company, source.\n" +
        "B. Corrected versions of each example.",
      notesLabel: "Examples:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste examples.", "2) Run.", "3) Apply rules to new entries."],
    ["You have rules plus corrected examples."]
  ),
  step(
    2,
    "Define status rules",
    "Make status changes consistent.",
    "Your 6 status names.",
    exampleBlock("accounting", "New, Contacted, Waiting, Scheduled, Won, Lost"),
    recipeBlock({
      task: "Define entry and exit rules for each status.",
      questions: [
        "What action moves a lead from New to Contacted?",
        "What action moves a lead to Scheduled?",
        "What action moves a lead to Won?",
      ],
      output: "Entry and exit rules for each status, one line each.",
      notesLabel: "Statuses:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste statuses.", "2) Run.", "3) Add the rules to your tracker doc."],
    ["Each status has entry and exit rules."]
  ),
  step(
    3,
    "Clean a batch",
    "Clean 20 rows fast.",
    "20 tracker rows.",
    exampleBlock("accounting", "Row: Name blank, Email present, Status New, Last contact blank"),
    recipeBlock({
      task: "Clean these tracker rows and tell me what to fix.",
      questions: [
        "Do you want to delete duplicates or merge them?",
        "Which field is your unique ID, email or phone?",
      ],
      output:
        "A. Duplicate candidates.\n" +
        "B. Missing fields per row.\n" +
        "C. Fixes per row.",
      notesLabel: "Rows:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste rows.", "2) Run.", "3) Apply fixes in your tracker."],
    ["Rows are clean and consistent."]
  ),
];

const LEAD_FOLLOW_UP_DAY_3_STEPS: PlanDayStep[] = [
  step(
    1,
    "Create reply templates",
    "Create 3 templates you reuse.",
    "3 past replies you sent that worked.",
    exampleBlock("roofing", "Paste 3 replies that got a booked inspection."),
    recipeBlock({
      task: "Create 3 reply templates from my past replies.",
      questions: [
        "What next step do you want, call, inspection, quote?",
        "What days and hours are available?",
        "What is one line you say often?",
      ],
      output:
        "3 templates: General inquiry, pricing request, urgent request.\n" +
        "Rules: under 120 words, one next step, max 2 questions.",
      notesLabel: "Past replies:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste replies.", "2) Run.", "3) Save templates in your doc."],
    ["You have 3 templates saved."]
  ),
  step(
    2,
    "Extract a lead summary",
    "Turn one message into a clean summary for your tracker.",
    "One lead message.",
    exampleBlock("roofing", "Need roof repair, leak, want estimate, prefers mornings."),
    recipeBlock({
      task: "Extract a lead summary from one message.",
      questions: [
        "Do you travel to the lead location?",
        "Do you require photos before scheduling?",
      ],
      output:
        "Name, what they want, urgency, missing info, best next step, follow-up date.",
      notesLabel: "Message:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste message.", "2) Run.", "3) Paste output into your tracker."],
    ["Lead record is complete enough to reply."]
  ),
  step(
    3,
    "Draft the reply",
    "Draft one reply that gets a next step.",
    "Lead summary and your templates.",
    exampleBlock("roofing", "Urgent leak, missing address, wants visit this week."),
    recipeBlock({
      task: "Draft one reply using my lead summary and templates.",
      questions: [
        "What is your earliest available appointment window?",
        "Do you want to offer a phone call option?",
      ],
      output:
        "One reply under 120 words.\n" +
        "Rules: one next step, max 2 questions, match my templates.\n" +
        "Inputs:\nLead summary:\nTemplates:",
      notesLabel: "Inputs:",
      notesPlaceholder: "Lead summary:\n[Paste]\nTemplates:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review, edit, send."],
    ["Reply is ready with one next step."]
  ),
];

const LEAD_FOLLOW_UP_DAY_4_STEPS: PlanDayStep[] = [
  step(
    1,
    "Define lead types",
    "Define hot, warm, cold in plain language.",
    "5 example leads or patterns.",
    exampleBlock(
      "accounting",
      `Hot: controller needs urgent cleanup before audit.
Warm: ongoing bookkeeping inquiry.
Cold: price shopping email.`
    ),
    recipeBlock({
      task: "Define hot, warm, cold lead types with criteria and examples.",
      questions: [
        "What is your typical sales cycle in days?",
        "What is your normal response window?",
      ],
      output: "Hot, warm, cold criteria plus examples.",
      notesLabel: "Examples:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste examples.", "2) Run.", "3) Label each lead type in your tracker."],
    ["You have lead type rules written down."]
  ),
  step(
    2,
    "Write a 3-touch sequence",
    "Write 3 follow-ups for one lead type.",
    "One lead type and your service.",
    exampleBlock("accounting", "Lead type: warm\nService: monthly bookkeeping"),
    recipeBlock({
      task: "Create a 3-touch follow-up sequence for one lead type.",
      questions: [
        "What outcome do you promise?",
        "What proof do you have, one sentence?",
      ],
      output:
        "Touch 1, 2, 3 messages.\n" +
        "Rules: each touch shorter than the prior, polite, one next step.",
      notesLabel: "Inputs:",
      notesPlaceholder: "Lead type:\nService:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save messages as templates."],
    ["You have one full follow-up sequence."]
  ),
  step(
    3,
    "Set timing rules",
    "Decide when to send each touch.",
    "Business hours and lead type definitions.",
    exampleBlock("accounting", "Mon to Fri 9 to 5. No weekends."),
    recipeBlock({
      task: "Set timing rules for Touch 1, 2, 3 by lead type.",
      questions: [
        "Do you send messages on weekends?",
        "What time of day do you reply to leads?",
      ],
      output: "Timing for Touch 1, 2, 3 by lead type.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add timing rules to your tracker doc."],
    ["Timing rules exist for each lead type."]
  ),
];

const LEAD_FOLLOW_UP_DAY_5_STEPS: PlanDayStep[] = [
  step(
    1,
    "Build a daily checklist",
    "A checklist you run every weekday.",
    "Time available and lead volume.",
    exampleBlock("roofing", "Two blocks. 9am 15 minutes, 4pm 15 minutes. 5 leads per day."),
    recipeBlock({
      task: "Create a daily lead follow-up checklist.",
      questions: [
        "Who runs this, owner, admin, sales?",
        "What is your daily lead count range?",
      ],
      output:
        "A 10-minute checklist and a 30-minute checklist.\n" +
        "Each in numbered steps.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Put it on your calendar."],
    ["Checklist scheduled on your calendar."]
  ),
  step(
    2,
    "Create review rules",
    "A simple checklist before sending any message.",
    "Your rules and red lines.",
    exampleBlock("roofing", "Always ask for address. Do not promise same-day. Keep tone friendly."),
    recipeBlock({
      task: "Create a review checklist and red-flag list before sending.",
      questions: [
        "What details must be present before scheduling?",
        "What promises do you avoid?",
      ],
      output: "A 7-point review checklist and a red-flag list.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run checklist before sending."],
    ["Review rules saved and followed."]
  ),
  step(
    3,
    "Run a live test batch",
    "Process today's leads end-to-end.",
    "5 new leads from today.",
    exampleBlock("roofing", "Lead 1 Source: Google message Message: Need gutters quote."),
    recipeBlock({
      task: "Process each lead: summary, reply draft, lead type, follow-up date.",
      questions: [
        "Are these leads already answered?",
        "Do you want calls or email replies first?",
      ],
      output:
        "For each lead: Summary, reply draft, lead type, follow-up date.",
      notesLabel: "Leads:",
      notesPlaceholder: "[Paste 5 leads]",
    }),
    ["1) Paste leads.", "2) Run.", "3) Review drafts, send, update tracker."],
    ["Tracker updated and replies sent."]
  ),
];

const LEAD_FOLLOW_UP_DAY_6_STEPS: PlanDayStep[] = [
  step(
    1,
    "Define stalled rules",
    "Decide when a lead is stalled by status.",
    "Your sales cycle timing.",
    exampleBlock("accounting", "If no reply in 3 business days, stalled. If quote sent and no reply in 5 days, stalled."),
    recipeBlock({
      task: "Define stalled definitions by status and re-engagement approach.",
      questions: [
        "Time from first contact to booked step?",
        "Time from quote to yes or no?",
      ],
      output: "Stalled definitions by status plus re-engagement approach.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add rules to your tracker doc."],
    ["You have stalled rules for each status."]
  ),
  step(
    2,
    "Build a stalled list from your tracker",
    "Identify stalled leads fast.",
    "Rows with status and last contact date.",
    exampleBlock("accounting", "Name, status, last contact date, next step, follow-up date"),
    recipeBlock({
      task: "Identify stalled leads and next actions.",
      questions: [
        "Which statuses count as active?",
        "Do you want to exclude Lost leads?",
      ],
      output:
        "Stalled leads, why stalled, next action, new follow-up date.",
      notesLabel: "Tracker rows:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste rows.", "2) Run.", "3) Update follow-up dates and next steps."],
    ["Stalled list created and acted on."]
  ),
  step(
    3,
    "Draft a re-engagement message",
    "One short message to restart the thread.",
    "One stalled lead summary.",
    exampleBlock("roofing", "Homeowner asked for estimate, no reply for 6 days, missing address."),
    recipeBlock({
      task: "Draft one re-engagement message under 70 words with one next step.",
      questions: [
        "Do you want to offer two time windows?",
        "Do you want to request photos?",
      ],
      output: "One message under 70 words, one next step.",
      notesLabel: "Stalled lead summary:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste summary.", "2) Run.", "3) Review and send."],
    ["Re-engagement message sent and logged."]
  ),
];

const LEAD_FOLLOW_UP_DAY_7_STEPS: PlanDayStep[] = [
  step(
    1,
    "Pick 5 weekly metrics",
    "Track five numbers each week.",
    "What \"good week\" means.",
    exampleBlock("roofing", "More booked inspections, faster first response, fewer stale leads."),
    recipeBlock({
      task: "Pick 5 weekly metrics with definitions and how to count them.",
      questions: [
        "Main weekly goal, booked calls, quotes, sales?",
        "Biggest weekly leak?",
      ],
      output: "5 metrics with definitions and how to count them.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Track them weekly in one spot."],
    ["Five metrics defined and tracked."]
  ),
  step(
    2,
    "Write a weekly summary template",
    "One update under 150 words.",
    "Your five metrics.",
    exampleBlock("roofing", "New leads, replies sent, booked inspections, quotes sent, wins"),
    recipeBlock({
      task: "Create a weekly summary template under 150 words, easy to skim.",
      questions: [
        "Who reads this, owner, manager, leadership?",
        "What one action should the team focus on next week?",
      ],
      output: "Weekly template under 150 words.",
      notesLabel: "Inputs:",
      notesPlaceholder: "Metrics:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Fill it every week."],
    ["Weekly template saved."]
  ),
  step(
    3,
    "Create next-week priorities",
    "Pick the top 5 actions for next week.",
    "This week's summary.",
    exampleBlock("roofing", "Paste your filled weekly summary."),
    recipeBlock({
      task: "Turn my weekly summary into next-week priorities.",
      questions: [
        "What is your capacity next week, low, normal, high?",
        "Any vacations or constraints?",
      ],
      output: "Top 5 actions sorted by impact, with a due day.",
      notesLabel: "Weekly summary:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste summary.", "2) Run.", "3) Put top 2 on your calendar."],
    ["Next-week priorities scheduled."]
  ),
];

const LEAD_FOLLOW_UP_PREVIEW_DAYS: PlanPreviewDay[] = [
  previewDay("Day 1", "Prep and set up", [
    "Identify lead sources",
    "Collect real lead examples",
    "Define your tracker fields",
  ]),
  previewDay("Day 2", "Clean and standardize", [
    "Standardize naming rules",
    "Define status rules",
    "Clean a batch",
  ]),
  previewDay("Day 3", "First replies", [
    "Create reply templates",
    "Extract a lead summary",
    "Draft the reply",
  ]),
  previewDay("Day 4", "Follow-up sequences", [
    "Define lead types",
    "Write a 3-touch sequence",
    "Set timing rules",
  ]),
  previewDay("Day 5", "Daily review routine", [
    "Build a daily checklist",
    "Create review rules",
    "Run a live test batch",
  ]),
  previewDay("Day 6", "Stalled-lead alerts", [
    "Define stalled rules",
    "Build a stalled list from your tracker",
    "Draft a re-engagement message",
  ]),
  previewDay("Day 7", "Weekly pipeline summary", [
    "Pick 5 weekly metrics",
    "Write a weekly summary template",
    "Create next-week priorities",
  ]),
];

const LEAD_FOLLOW_UP_FULL_DAYS: PlanFullDay[] = [
  fullDay("Day 1", "Prep and set up", "Set up one tracker, gather real examples, save your starter prompts.", LEAD_FOLLOW_UP_DAY_1_STEPS),
  fullDay("Day 2", "Clean and standardize", "Remove duplicates, standardize naming, lock status rules.", LEAD_FOLLOW_UP_DAY_2_STEPS),
  fullDay("Day 3", "First replies", "Write templates, extract lead info, draft replies.", LEAD_FOLLOW_UP_DAY_3_STEPS),
  fullDay("Day 4", "Follow-up sequences", "Create 3-touch sequences and timing rules.", LEAD_FOLLOW_UP_DAY_4_STEPS),
  fullDay("Day 5", "Daily review routine", "Add a routine that keeps leads moving every weekday.", LEAD_FOLLOW_UP_DAY_5_STEPS),
  fullDay("Day 6", "Stalled-lead alerts", "Define stalled, list stalled leads, draft re-engagement.", LEAD_FOLLOW_UP_DAY_6_STEPS),
  fullDay("Day 7", "Weekly pipeline summary", "Pick metrics, write a weekly summary, set next-week priorities.", LEAD_FOLLOW_UP_DAY_7_STEPS),
];

// ——— Plan 2: Support triage system ———
const SUPPORT_DAY_1_STEPS: PlanDayStep[] = [
  step(
    1,
    "Pick your support sources",
    "Choose one source for week 1.",
    "A list of where customers ask for help today.",
    exampleBlock(
      "roofing",
      `Email: support@roofco.com
Website form: Contact Us
Google Business Profile messages
Facebook messages`
    ),
    recipeBlock({
      task: "Identify support sources and choose one for week 1.",
      questions: [
        "What is your business type?",
        "Who answers support today?",
        "Business hours for support replies?",
        "List every place support requests arrive.",
      ],
      output:
        "A. One in-scope source for week 1 and why.\n" +
        "B. Out-of-scope sources and why.\n" +
        "C. A daily copy routine for the in-scope source.",
      notesLabel: "My notes:",
      notesPlaceholder: "Business type:\nSupport owner:\nSupport hours:\nSources list:",
    }),
    ["1) Fill My notes.", "2) Run.", "3) Save outputs in one doc."],
    ["One source picked for week 1.", "Daily copy routine written down."]
  ),
  step(
    2,
    "Collect real requests",
    "Build a starter set of real requests.",
    "30 to 50 real messages from the in-scope source.",
    exampleBlock(
      "roofing",
      `Request 1
Channel: Email
Message: Active leak in living room, need help today.
Request 2
Channel: Google message
Message: Do you offer free estimates?`
    ),
    recipeBlock({
      task: "Turn my requests into a table with best next action.",
      questions: [
        "What is your top priority, speed, accuracy, or reducing repeats?",
        "What is your top risk area, refunds, safety, pricing, legal?",
      ],
      output:
        "A table with: Request ID, Channel, What they want (one sentence), Urgency guess (low, medium, high), Missing info to request, Best next action.\n" +
        "Requests format: Request 1 Channel: Message:",
      notesLabel: "Requests:",
      notesPlaceholder: "[Paste 30 to 50 requests]",
    }),
    ["1) Paste 30 to 50 requests.", "2) Run.", "3) Save the table."],
    ["Starter set saved.", "Each request has a best next action."]
  ),
  step(
    3,
    "Define urgent",
    "Decide what needs fast handling.",
    "Your business rules and examples of high-risk issues.",
    exampleBlock("roofing", "Urgent: active leak, safety hazard, water damage spreading, customer threatens cancellation today."),
    recipeBlock({
      task: "Define urgent triggers and immediate action.",
      questions: [
        "What issues involve safety?",
        "What issues involve money, refunds, cancellations?",
        "What issues involve warranties or insurance?",
      ],
      output:
        "A. Urgent triggers list, 8 items max.\n" +
        "B. Examples for each trigger.\n" +
        "C. Immediate action for urgent requests, who owns it and target response time.",
      notesLabel: "My notes:",
      notesPlaceholder: "Rules:\nExamples:",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save urgent triggers.", "4) Use them before drafting replies."],
    ["Urgent triggers written down.", "Immediate action defined."]
  ),
];

const SUPPORT_DAY_2_STEPS: PlanDayStep[] = [
  step(
    1,
    "Create categories",
    "Create 8 to 12 categories that cover most requests.",
    "The starter set table or a list of request summaries.",
    exampleBlock("accounting", "Invoice status, vendor setup, expense policy, payroll issue, month-end close, access request, reporting request, exception approval."),
    recipeBlock({
      task: "Create 8 to 12 categories with definitions and examples.",
      questions: [
        "Do you want categories by topic or by team?",
        "Do you want one category for other?",
      ],
      output:
        "A. 8 to 12 categories.\n" +
        "B. 2 examples per category.\n" +
        "C. A one-line definition per category.",
      notesLabel: "Input summaries:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save category list.", "4) Label every new request with one category."],
    ["Category list saved.", "Labels used on new requests."]
  ),
  step(
    2,
    "Set urgency rules",
    "Define low, medium, high in plain language.",
    "Your category list and urgent triggers.",
    exampleBlock("accounting", "High: payroll failure, access outage, compliance deadline. Medium: invoice dispute, exception request. Low: status update request."),
    recipeBlock({
      task: "Define urgency rules and map category to default urgency.",
      questions: [
        "Target response time for high urgency?",
        "Target response time for medium urgency?",
        "Target response time for low urgency?",
      ],
      output:
        "A. Rules for low, medium, high.\n" +
        "B. A mapping of category to default urgency.\n" +
        "C. A short note for when to override urgency.",
      notesLabel: "Categories:",
      notesPlaceholder: "[Paste]\nUrgent triggers:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save rules.", "4) Apply urgency to every request."],
    ["Urgency rules saved.", "Each request gets an urgency label."]
  ),
  step(
    3,
    "Set escalation rules",
    "Route sensitive issues to the right owner.",
    "Team roles and what each person owns.",
    exampleBlock("accounting", "AP owns invoices. Payroll lead owns payroll. Controller owns policy exceptions. IT owns access issues."),
    recipeBlock({
      task: "Define escalation triggers, owners, and internal escalation message template.",
      questions: [
        "Who owns billing and payments?",
        "Who owns policy exceptions?",
        "Who owns access and security issues?",
        "Who handles angry messages?",
      ],
      output:
        "A. Escalation triggers list.\n" +
        "B. Owner per trigger.\n" +
        "C. A short internal escalation message template.",
      notesLabel: "Team roles:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save escalation map.", "4) Escalate before replying when trigger hits."],
    ["Escalation triggers saved.", "Owners defined."]
  ),
];

const SUPPORT_DAY_3_STEPS: PlanDayStep[] = [
  step(
    1,
    "Identify top questions",
    "Pick the first 10 to 15 questions to standardize.",
    "30 to 50 request snippets.",
    exampleBlock("roofing", "Do you do emergency repairs, do you work with insurance, how much for replacement, do you offer financing, when is next availability."),
    recipeBlock({
      task: "Identify top 15 questions and suggest top 10 to write answers for first.",
      questions: [
        "Which questions drive revenue?",
        "Which questions drive risk?",
        "Which questions show up daily?",
      ],
      output:
        "A. Top 15 questions with counts.\n" +
        "B. A suggested top 10 to write answers for first.",
      notesLabel: "Snippets:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste snippets.", "2) Run.", "3) Save top 10 list.", "4) Write answers for top 10 next."],
    ["Top 10 questions list saved."]
  ),
  step(
    2,
    "Draft approved answers",
    "Write answers that match your rules and tone.",
    "Your policy notes, pricing notes, service area, hours, and any red lines.",
    exampleBlock("roofing", "Service area is Nassau and Suffolk. Hours Mon to Fri 8 to 5. No same-day promise. Estimates after inspection. Financing available."),
    recipeBlock({
      task: "Draft 10 approved answers under 120 words each, clear next step, no guarantees.",
      questions: [
        "What promises do you avoid?",
        "What info needs confirmation before committing?",
        "What is your preferred next step, call, inspection, quote?",
      ],
      output: "10 approved answers.",
      notesLabel: "Notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste notes.", "2) Run.", "3) Save answers in one doc.", "4) Use only these for reply drafts."],
    ["Approved answers doc exists with 10 answers."]
  ),
  step(
    3,
    "Do-not-answer list",
    "Define topics that require manual review.",
    "Your risk areas.",
    exampleBlock("roofing", "Insurance claim outcomes, structural safety advice, legal threats, refund disputes, pricing exceptions."),
    recipeBlock({
      task: "Create do-not-answer list, safe fallback sentence, and rule for when to call or escalate.",
      questions: [
        "Which topics require owner approval?",
        "Which topics involve legal, financial, safety?",
      ],
      output:
        "A. Do-not-answer topics list.\n" +
        "B. A safe fallback sentence for uncovered topics.\n" +
        "C. A rule for when to call or escalate.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save list at top of your answers doc.", "4) Use fallback when needed."],
    ["Do-not-answer list saved.", "Fallback sentence saved."]
  ),
];

const SUPPORT_DAY_4_STEPS: PlanDayStep[] = [
  step(
    1,
    "Label one request",
    "Label category, urgency, sentiment, next action.",
    "One message.",
    exampleBlock("accounting", "Message: This invoice is past due and I need proof of payment today."),
    recipeBlock({
      task: "Label this request: category, urgency, sentiment, missing info, best next action, escalate, owner.",
      questions: [
        "Paste your category list.",
        "Paste your urgency rules.",
      ],
      output:
        "Category:\nUrgency:\nSentiment:\nMissing info:\nBest next action:\nEscalate yes or no:\nOwner:",
      notesLabel: "Message:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run on new messages.", "4) Log label in your queue."],
    ["Message labeled with owner and next action."]
  ),
  step(
    2,
    "Draft reply using approved answers only",
    "Draft a reply grounded in your approved answer library.",
    "Approved answers plus the message.",
    exampleBlock("accounting", "Approved answer exists for invoice status and proof of payment request."),
    recipeBlock({
      task: "Draft a reply using only Approved Answers. If not covered, write: I'm confirming and will follow up shortly.",
      questions: [
        "Do you want short reply or detailed reply?",
        "What is the next step you want, provide invoice number, confirm details, schedule call?",
      ],
      output: "Draft reply.",
      notesLabel: "Approved Answers:",
      notesPlaceholder: "[Paste]\nMessage:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review draft.", "4) Send only after review."],
    ["Draft matches approved answers.", "Next step is clear."]
  ),
  step(
    3,
    "Reply review checklist",
    "A checklist before you send.",
    "Your tone rules and red lines.",
    exampleBlock("accounting", "Tone polite and firm. Confirm invoice number. Do not admit fault. Do not promise same-day payment."),
    recipeBlock({
      task: "Create a 7-point review checklist and a red-flag list for rewrites.",
      questions: [
        "Top 3 mistakes you want to avoid?",
        "Required details every reply must include?",
      ],
      output: "A 7-point review checklist. A red-flag list for rewrites.",
      notesLabel: "Notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run checklist for every send."],
    ["Checklist saved.", "Used on every reply."]
  ),
];

const SUPPORT_DAY_5_STEPS: PlanDayStep[] = [
  step(
    1,
    "Build routing map",
    "Map category and urgency to an owner.",
    "Categories and team roles.",
    exampleBlock("roofing", "Scheduling to office manager. Warranty to owner. Estimates to sales. Active leaks to on-call tech."),
    recipeBlock({
      task: "Create a routing table: Category, default urgency, owner, escalation owner.",
      questions: [
        "Who handles urgent issues?",
        "Who handles billing and refunds?",
        "Who handles scheduling?",
      ],
      output: "Routing table.",
      notesLabel: "Categories:",
      notesPlaceholder: "[Paste]\nTeam roles:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save table.", "4) Use it during triage."],
    ["Routing table saved.", "Owners assigned."]
  ),
  step(
    2,
    "Create a daily queue routine",
    "A repeatable daily routine.",
    "Available time blocks and staffing.",
    exampleBlock("roofing", "Two blocks daily. 8:30am 30 minutes. 3:30pm 30 minutes. One person replies."),
    recipeBlock({
      task: "Create a triage routine in numbered steps. Includes label, escalate, draft, review, send, log.",
      questions: [
        "Target response time for urgent and non-urgent?",
        "Do you want one daily digest?",
      ],
      output: "A triage routine in numbered steps.",
      notesLabel: "Details:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Put routine on calendar.", "4) Follow it daily."],
    ["Routine scheduled.", "Routine followed for one day."]
  ),
  step(
    3,
    "Live test batch",
    "Process 10 real requests end-to-end.",
    "10 new messages.",
    exampleBlock("roofing", "10 messages copied from your inbox."),
    recipeBlock({
      task: "For each message output: Label, owner, draft reply, escalation yes or no.",
      questions: [
        "Any messages already answered?",
        "Any urgent issues today?",
      ],
      output: "For each message: Label, owner, draft reply, escalation yes or no.",
      notesLabel: "Messages:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste messages.", "2) Run.", "3) Review drafts.", "4) Send.", "5) Log status."],
    ["10 requests processed.", "Queue updated."]
  ),
];

const SUPPORT_DAY_6_STEPS: PlanDayStep[] = [
  step(
    1,
    "Define aging rules",
    "Define when a request is aging by urgency.",
    "Response targets.",
    exampleBlock("accounting", "High target 2 hours. Medium target 24 hours. Low target 3 business days."),
    recipeBlock({
      task: "Define aging thresholds for high, medium, low and what action triggers at each threshold.",
      questions: [
        "Do you pause aging on weekends?",
        "Quiet hours for escalation messages?",
      ],
      output: "Aging thresholds for high, medium, low. What action triggers at each threshold.",
      notesLabel: "Targets:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save thresholds.", "4) Use them in your daily digest."],
    ["Aging thresholds saved."]
  ),
  step(
    2,
    "Create daily digest format",
    "One daily list of what must be handled.",
    "Categories, urgency rules, aging thresholds.",
    exampleBlock("accounting", "Digest sections: urgent open, aging open, blocked, repeats, escalations sent."),
    recipeBlock({
      task: "Create a digest template with exact sections and order.",
      questions: [
        "Who reads the digest?",
        "Morning, afternoon, or both?",
      ],
      output: "A digest template with exact sections and order.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Fill once daily.", "4) Share with owners."],
    ["Digest template saved."]
  ),
  step(
    3,
    "Draft escalation templates",
    "Write three internal escalation messages.",
    "Escalation owners and triggers.",
    exampleBlock("accounting", "Payroll issues escalate to payroll lead then controller."),
    recipeBlock({
      task: "Draft first nudge, second nudge, manager escalation.",
      questions: [
        "Escalation path, peer then manager, or manager first?",
        "Tone preference, direct or soft?",
      ],
      output: "First nudge, second nudge, manager escalation.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use only when aging threshold hits."],
    ["Escalation templates saved."]
  ),
];

const SUPPORT_DAY_7_STEPS: PlanDayStep[] = [
  step(
    1,
    "Write weekly trends summary",
    "Summarize top drivers of support volume.",
    "Category counts and examples.",
    exampleBlock("roofing", "Estimate requests 30. Scheduling 20. Warranty 5. Active leaks 4."),
    recipeBlock({
      task: "Summarize top 5 trends with one driver each.",
      questions: [
        "Which category causes the most back-and-forth?",
        "Which category risks revenue loss?",
      ],
      output: "Top 5 trends with one driver each.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review weekly."],
    ["Trends summary written."]
  ),
  step(
    2,
    "Pick prevention fixes",
    "Choose three fixes for next week.",
    "The trends summary.",
    exampleBlock("roofing", "Many customers ask the same pricing and availability questions."),
    recipeBlock({
      task: "Output 3 fixes with owner, due day, and expected impact.",
      questions: [
        "What changes are easiest this week?",
        "What changes require approval?",
      ],
      output: "3 fixes with owner, due day, and expected impact.",
      notesLabel: "Trends summary:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Assign owners.", "4) Track completion."],
    ["3 fixes assigned."]
  ),
  step(
    3,
    "Update approved answers",
    "Add five new answers to reduce repeats.",
    "Gaps found this week.",
    exampleBlock("roofing", "Gap: insurance question. Gap: warranty coverage. Gap: financing steps."),
    recipeBlock({
      task: "Draft 5 approved answers under 120 words.",
      questions: [
        "Any topics that require owner approval?",
        "Any topics you refuse to answer by message?",
      ],
      output: "5 approved answers under 120 words.",
      notesLabel: "Gaps:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to answers doc."],
    ["Answer library updated."]
  ),
];

const SUPPORT_PREVIEW_DAYS: PlanPreviewDay[] = [
  previewDay("Day 1", "Prep and set up", [
    "Pick your support sources",
    "Collect real requests",
    "Define urgent",
  ]),
  previewDay("Day 2", "Categories and rules", [
    "Create categories",
    "Set urgency rules",
    "Set escalation rules",
  ]),
  previewDay("Day 3", "Approved answers starter", [
    "Identify top questions",
    "Draft approved answers",
    "Set a do-not-answer list",
  ]),
  previewDay("Day 4", "Draft replies with guardrails", [
    "Label the request",
    "Draft from approved answers",
    "Review before sending",
  ]),
  previewDay("Day 5", "Routing and daily routine", [
    "Build routing map",
    "Create daily queue routine",
    "Live test batch",
  ]),
  previewDay("Day 6", "Escalations and digests", [
    "Define aging rules",
    "Create daily digest format",
    "Draft escalation templates",
  ]),
  previewDay("Day 7", "Trends and prevention", [
    "Write weekly trends summary",
    "Pick prevention fixes",
    "Update approved answers",
  ]),
];

const SUPPORT_FULL_DAYS: PlanFullDay[] = [
  fullDay("Day 1", "Prep and set up", "Pick one support source, collect real examples, define urgent.", SUPPORT_DAY_1_STEPS),
  fullDay("Day 2", "Categories and rules", "Create categories, urgency rules, escalation rules.", SUPPORT_DAY_2_STEPS),
  fullDay("Day 3", "Approved answers starter", "Identify top questions, draft answers, set do-not-answer list.", SUPPORT_DAY_3_STEPS),
  fullDay("Day 4", "Draft replies with guardrails", "Label the request, draft from approved answers, review before sending.", SUPPORT_DAY_4_STEPS),
  fullDay("Day 5", "Routing and daily routine", "Assign owners, run daily triage, test on a live batch.", SUPPORT_DAY_5_STEPS),
  fullDay("Day 6", "Escalations and digests", "Aging rules, daily digest, escalation templates.", SUPPORT_DAY_6_STEPS),
  fullDay("Day 7", "Trends and prevention", "Weekly trends, top fixes, update answer library.", SUPPORT_DAY_7_STEPS),
];

// ——— Plan 3: Meeting follow-up system ———

const MEETING_DAY_1_STEPS: PlanDayStep[] = [
  step(
    1,
    "Pick one meeting type",
    "Start with one meeting type only.",
    "A list of meeting types and what breaks after each.",
    exampleBlock("roofing", "Sales handoff meeting. Install scheduling meeting. Weekly ops meeting."),
    recipeBlock({
      task: "Choose one meeting type for week 1 and define success for week 1 in 3 bullets.",
      questions: [
        "Which meeting leads to the most missed follow-ups?",
        "Which meeting affects revenue most?",
        "Who owns the follow-up today?",
      ],
      output:
        "Output A: One meeting type for week 1 and why.\n" +
        "Output B: A definition of success for week 1, in 3 bullets.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use only this meeting type for the next 7 days."],
    ["One meeting type selected.", "Success definition saved."]
  ),
  step(
    2,
    "Collect note examples",
    "Gather 5 to 10 real notes from that meeting type.",
    "Notes or summaries from recent meetings.",
    exampleBlock("roofing", "Notes: call supplier, schedule install, send quote, confirm deposit, permit check."),
    recipeBlock({
      task: "Analyze notes and output note quality issues and a minimum notes standard, 6 items max.",
      questions: [
        "Where do notes live today?",
        "Who writes notes?",
        "Who assigns owners and due dates?",
      ],
      output:
        "Output A: Note quality issues list.\n" +
        "Output B: A minimum notes standard, 6 items max.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save minimum standard.", "4) Apply it next meeting."],
    ["Minimum standard saved."]
  ),
  step(
    3,
    "Define action tracker fields",
    "Decide what every action item must include.",
    "How you track actions today.",
    exampleBlock("roofing", "We track tasks in a sheet. Owners exist. Due dates missing often."),
    recipeBlock({
      task: "Define required fields, optional fields, and a one-line definition of done for an action item.",
      questions: [
        "Do you want one owner per task?",
        "Do you want due dates for every task?",
        "Where do you store the tracker, sheet or task tool?",
      ],
      output:
        "Output A: Required fields list.\n" +
        "Output B: Optional fields list.\n" +
        "Output C: A one-line definition of done for an action item.",
      notesLabel: "My notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Create these columns in your tracker."],
    ["Tracker fields defined."]
  ),
];

const MEETING_DAY_2_STEPS: PlanDayStep[] = [
  step(
    1,
    "Create notes template",
    "One template for every meeting.",
    "The meeting type and what it decides.",
    exampleBlock("accounting", "Month-end close meeting. Decisions on blockers and approvals."),
    recipeBlock({
      task: "Create a template with Recap, decisions, actions, risks, questions, next check-in.",
      questions: [
        "Who attends?",
        "What decisions happen in this meeting?",
        "What output should exist after the meeting, task list, email, both?",
      ],
      output: "A template with Recap, decisions, actions, risks, questions, next check-in.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Copy template into a doc before the meeting.", "4) Fill during the meeting."],
    ["Template saved and ready."]
  ),
  step(
    2,
    "Action quality rules",
    "Turn vague actions into clear actions.",
    "10 weak actions from past notes.",
    exampleBlock("accounting", "Look into it. Follow up with vendor. Fix report. Review entries. Send update."),
    recipeBlock({
      task: "Output rules for a good action item and rewrites of each weak action into a clear task with owner and due date fields.",
      questions: [
        "Default owner rule when unclear?",
        "Default due date rule when unclear?",
      ],
      output:
        "Output A: Rules for a good action item.\n" +
        "Output B: Rewrites of each weak action into a clear task with owner and due date fields.",
      notesLabel: "Weak actions:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use rules during the meeting.", "4) Replace weak actions after meeting."],
    ["Weak actions rewritten."]
  ),
  step(
    3,
    "Definition of done",
    "Define done for common task types.",
    "A list of common task types.",
    exampleBlock("accounting", "Reconciliation, journal entry, report update, approval request, vendor payment."),
    recipeBlock({
      task: "Output definition of done lines for each task type.",
      questions: [
        "What proof counts as done, link, screenshot, approval?",
        "Who signs off when done?",
      ],
      output: "Definition of done lines for each task type.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add definition of done to tasks in the tracker."],
    ["Done definitions saved."]
  ),
];

const MEETING_DAY_3_STEPS: PlanDayStep[] = [
  step(
    1,
    "Extract decisions and actions",
    "Turn notes into structured actions.",
    "One meeting notes doc.",
    exampleBlock("roofing", "Install scheduling notes from today."),
    recipeBlock({
      task: "Output Decisions list, Actions list with task, owner, due date, next step, done definition, Risks list, Questions list for missing info.",
      questions: [
        "Do you want due dates as calendar dates or days from now?",
        "Do you want to include links in tasks?",
      ],
      output:
        "Decisions list.\n" +
        "Actions list with task, owner, due date, next step, done definition.\n" +
        "Risks list.\n" +
        "Questions list for missing info.",
      notesLabel: "Notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Paste actions into your tracker."],
    ["Actions logged with owners and dates."]
  ),
  step(
    2,
    "Fill missing owners and dates",
    "Identify missing fields and the questions to resolve them.",
    "The extracted actions list.",
    exampleBlock("roofing", "Send quote, missing owner. Confirm address, missing due date."),
    recipeBlock({
      task: "Output missing-field list and exact questions to ask the team.",
      questions: [
        "Who assigns owners, you or team lead?",
        "Default due date for missing due dates?",
      ],
      output:
        "Output A: Missing-field list.\n" +
        "Output B: Exact questions to ask the team.",
      notesLabel: "Actions:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Ask questions.", "4) Update tracker fields."],
    ["No task missing owner or due date."]
  ),
  step(
    3,
    "Post-meeting checklist",
    "A 10-minute cleanup routine.",
    "Where follow-ups go and who sends them.",
    exampleBlock("roofing", "Follow-up goes to team chat. Office manager sends it."),
    recipeBlock({
      task: "Output a 7-step post-meeting checklist.",
      questions: [
        "Where should follow-up be sent?",
        "Who sends it?",
        "When should it be sent, same day or next morning?",
      ],
      output: "A 7-step post-meeting checklist.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run it after every meeting."],
    ["Checklist saved and used once."]
  ),
];

const MEETING_DAY_4_STEPS: PlanDayStep[] = [
  step(
    1,
    "Draft the follow-up message",
    "Write a clear follow-up with actions.",
    "The decisions and actions list.",
    exampleBlock("accounting", "Decisions and actions from close meeting."),
    recipeBlock({
      task: "Draft a follow-up message: 1-sentence recap, actions with owner and due date, top risks, one next step.",
      questions: [
        "Audience, team only or leadership too?",
        "Format preference, bullets only or short intro plus bullets?",
      ],
      output: "Draft follow-up message.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review.", "4) Send.", "5) Log in tracker."],
    ["Follow-up drafted."]
  ),
  step(
    2,
    "Tone check",
    "Make it clear and direct.",
    "Draft follow-up.",
    exampleBlock("accounting", "Draft text pasted in."),
    recipeBlock({
      task: "Rewrite for short sentences and clear asks.",
      questions: [
        "Tone preference, firm or friendly?",
        "Words to avoid?",
      ],
      output: "Rewritten draft.",
      notesLabel: "Draft:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Replace the draft with the rewrite."],
    ["Message reads clean and direct."]
  ),
  step(
    3,
    "Send checklist",
    "Prevent errors.",
    "Your common failure points.",
    exampleBlock("accounting", "Wrong due dates, missing owners, missing links, unclear asks."),
    recipeBlock({
      task: "Output a 7-point send checklist.",
      questions: [
        "Top 3 errors to prevent?",
        "Required details every message must include?",
      ],
      output: "A 7-point send checklist.",
      notesLabel: "Notes:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run checklist before sending."],
    ["Checklist saved."]
  ),
];

const MEETING_DAY_5_STEPS: PlanDayStep[] = [
  step(
    1,
    "Reminder schedule",
    "Decide when reminders go out.",
    "Typical due date ranges and quiet hours.",
    exampleBlock("roofing", "Tasks due in 1 to 7 days. Quiet hours after 6pm."),
    recipeBlock({
      task: "Output reminder rules: Upcoming, due today, overdue.",
      questions: [
        "Do you want reminders daily or only near due date?",
        "Do you want reminders grouped by owner?",
      ],
      output: "Reminder rules: Upcoming, due today, overdue.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Apply rules to tasks in tracker."],
    ["Reminder rules saved."]
  ),
  step(
    2,
    "Reminder templates",
    "Write three short templates.",
    "3 sample tasks and your tone preference.",
    exampleBlock("roofing", "Task: confirm materials delivery. Task: send quote. Task: schedule install."),
    recipeBlock({
      task: "Draft Upcoming template, Due today template, Overdue template.",
      questions: [
        "Do you want due date included every time?",
        "Do you want one question at the end?",
      ],
      output: "Upcoming template. Due today template. Overdue template.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Copy, paste, send."],
    ["Templates saved."]
  ),
  step(
    3,
    "Escalation rule",
    "Decide when overdue work escalates.",
    "Team roles and manager structure.",
    exampleBlock("roofing", "Owner, office manager, foreman."),
    recipeBlock({
      task: "Output escalation rule and an escalation message template.",
      questions: [
        "Escalate after how many days overdue?",
        "Who gets escalations first?",
      ],
      output: "Escalation rule and escalation message template.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use only after threshold hits."],
    ["Escalation rule saved."]
  ),
];

const MEETING_DAY_6_STEPS: PlanDayStep[] = [
  step(
    1,
    "Define stuck",
    "Define stuck in plain rules.",
    "Status list and what blocked means for your team.",
    exampleBlock("accounting", "Stuck if missing owner, missing due date, blocked by approval, overdue, no update in 3 days."),
    recipeBlock({
      task: "Output stuck rules and examples.",
      questions: [
        "What statuses exist today?",
        "What counts as blocked?",
        "What counts as no update?",
      ],
      output: "Stuck rules and examples.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use rules to build a stuck list weekly."],
    ["Stuck rules saved."]
  ),
  step(
    2,
    "Build stuck list",
    "Identify stuck items from your tracker.",
    "20 task rows with status, owner, due date, last update.",
    exampleBlock("accounting", "Rows from close tracker."),
    recipeBlock({
      task: "Output stuck items with reason, next action, owner.",
      questions: [
        "Exclude completed tasks?",
        "Flag tasks with no update in how many days?",
      ],
      output: "Stuck items. Reason. Next action. Owner.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Fix missing fields.", "4) Send nudges."],
    ["Stuck list created."]
  ),
  step(
    3,
    "Draft nudges",
    "Draft short nudges for each owner.",
    "Stuck items and owners.",
    exampleBlock("accounting", "Owner AP lead, task vendor setup blocked by missing W-9."),
    recipeBlock({
      task: "Draft one nudge per item under 40 words.",
      questions: [
        "Tone preference, direct or soft?",
        "Ask for ETA or ask what is blocked?",
      ],
      output: "One nudge per item under 40 words.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review.", "4) Send.", "5) Log outcome."],
    ["Nudges sent and logged."]
  ),
];

const MEETING_DAY_7_STEPS: PlanDayStep[] = [
  step(
    1,
    "Weekly execution summary template",
    "Create a weekly template leaders read fast.",
    "Task counts and key stuck items.",
    exampleBlock("roofing", "Completed 12. Overdue 4. Blocked 3. Top blocker is materials delay."),
    recipeBlock({
      task: "Output a template with Completed, Overdue, Blocked, Risks, Decisions needed, Top next-week focus.",
      questions: [
        "Who reads this, team or leadership?",
        "What one outcome matters next week?",
      ],
      output: "Template with Completed, Overdue, Blocked, Risks, Decisions needed, Top next-week focus.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Fill weekly."],
    ["Template saved."]
  ),
  step(
    2,
    "Root causes",
    "Identify the top 3 reasons work stalls.",
    "Overdue and stuck items.",
    exampleBlock("roofing", "Waiting on customer approval, missing parts, unclear owner."),
    recipeBlock({
      task: "Output top 3 causes with one fix each.",
      questions: [
        "Which cause repeats most?",
        "Which cause hurts revenue most?",
      ],
      output: "Top 3 causes with one fix each.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Pick one fix to apply next week."],
    ["Root causes saved."]
  ),
  step(
    3,
    "Improve weak action items",
    "Rewrite vague actions into clear tasks.",
    "10 weak actions.",
    exampleBlock("roofing", "Follow up. Handle scheduling. Check on it. Send update."),
    recipeBlock({
      task: "Rewrite each into Task, owner, due date, next step, done definition.",
      questions: [
        "Default owner rule?",
        "Default due date rule?",
      ],
      output: "Rewritten tasks with Task, owner, due date, next step, done definition.",
      notesLabel: "Weak actions:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Replace in tracker."],
    ["Tasks rewritten."]
  ),
];

const MEETING_PREVIEW_DAYS: PlanPreviewDay[] = [
  previewDay("Day 1", "Prep and set up", [
    "Pick one meeting type",
    "Collect note examples",
    "Define action tracker fields",
  ]),
  previewDay("Day 2", "Standardize notes", [
    "Create notes template",
    "Action quality rules",
    "Definition of done",
  ]),
  previewDay("Day 3", "Extract actions", [
    "Extract decisions and actions",
    "Fill missing owners and dates",
    "Post-meeting checklist",
  ]),
  previewDay("Day 4", "Draft follow-up", [
    "Draft the follow-up message",
    "Tone check",
    "Send checklist",
  ]),
  previewDay("Day 5", "Reminders", [
    "Reminder schedule",
    "Reminder templates",
    "Escalation rule",
  ]),
  previewDay("Day 6", "Stuck detection", [
    "Define stuck",
    "Build stuck list",
    "Draft nudges",
  ]),
  previewDay("Day 7", "Weekly execution summary", [
    "Weekly execution summary template",
    "Root causes",
    "Improve weak action items",
  ]),
];

const MEETING_FULL_DAYS: PlanFullDay[] = [
  fullDay("Day 1", "Prep and set up", "Pick one meeting type, collect examples, define action fields.", MEETING_DAY_1_STEPS),
  fullDay("Day 2", "Standardize notes", "Create notes template, action rules, and done definitions.", MEETING_DAY_2_STEPS),
  fullDay("Day 3", "Extract actions", "Convert notes into tasks, fill missing fields, run post-meeting cleanup.", MEETING_DAY_3_STEPS),
  fullDay("Day 4", "Draft follow-up", "Draft follow-up, check tone, verify send-ready.", MEETING_DAY_4_STEPS),
  fullDay("Day 5", "Reminders", "Reminder timing, templates, escalation rules.", MEETING_DAY_5_STEPS),
  fullDay("Day 6", "Stuck detection", "Define stuck, generate stuck list, draft nudges.", MEETING_DAY_6_STEPS),
  fullDay("Day 7", "Weekly execution summary", "Weekly summary, root causes, improve action quality.", MEETING_DAY_7_STEPS),
];

// ——— Plan 4: Weekly visibility system ———

const WEEKLY_DAY_1_STEPS: PlanDayStep[] = [
  step(
    1,
    "Pick team and scope",
    "Choose one team for week 1.",
    "Teams and what leaders complain about.",
    exampleBlock("roofing", "Sales and ops. Leaders want fewer surprises on delays and cancellations."),
    recipeBlock({
      task: "Output team in scope, scope boundaries in 5 bullets, and one sentence success definition for week 1.",
      questions: [
        "Who reads the weekly brief?",
        "What decisions depend on it?",
        "What is out of scope this week?",
      ],
      output: "A. Team in scope. B. Scope boundaries in 5 bullets. C. One sentence success definition for week 1.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use this scope for the next 7 days."],
    ["Scope saved."]
  ),
  step(
    2,
    "Pick two sources",
    "Pick two sources for updates.",
    "Where work and updates live.",
    exampleBlock("roofing", "Pipeline sheet and team chat updates."),
    recipeBlock({
      task: "Output two sources, what fields to copy from each, and a weekly copy routine.",
      questions: [
        "Which source is most reliable?",
        "Which source is easiest to pull weekly?",
      ],
      output: "Two sources. What fields to copy from each. A weekly copy routine.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Pull from these sources only."],
    ["Two sources chosen."]
  ),
  step(
    3,
    "Gather last week inputs",
    "Build a raw input set for a trial brief.",
    "Last week raw notes, tasks, and metric counts.",
    exampleBlock("roofing", "Quotes sent, inspections booked, installs completed, cancellations, top blockers."),
    recipeBlock({
      task: "Output a cleaned input list ready for summarizing.",
      questions: [
        "Include names or roles only?",
        "Include customer names or remove them?",
      ],
      output: "A cleaned input list ready for summarizing.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save as Week 0 inputs."],
    ["Inputs saved."]
  ),
];

const WEEKLY_DAY_2_STEPS: PlanDayStep[] = [
  step(
    1,
    "Create brief template",
    "One format that stays the same each week.",
    "What leaders care about.",
    exampleBlock("accounting", "Close progress, risks, blockers, key numbers, help needed."),
    recipeBlock({
      task: "Output a template with Wins, Priorities, Blockers, Key numbers, Help needed, Decisions needed.",
      questions: [
        "Target length, 150 or 250 words?",
        "Bullets only or short intro plus bullets?",
      ],
      output: "A template with Wins, Priorities, Blockers, Key numbers, Help needed, Decisions needed.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use the same template weekly."],
    ["Template saved."]
  ),
  step(
    2,
    "Pick five metrics",
    "Pick five metrics only.",
    "Candidate metrics and where each comes from.",
    exampleBlock("accounting", "Days to close, open exceptions, reconciliations complete, overdue invoices, overtime hours."),
    recipeBlock({
      task: "Output 5 metrics with definition and source.",
      questions: [
        "Which metric triggers action?",
        "Which metric predicts risk?",
      ],
      output: "5 metrics with definition and source.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Track weekly in one place."],
    ["Metrics list saved."]
  ),
  step(
    3,
    "Assign section owners",
    "One owner per section.",
    "Team roles.",
    exampleBlock("accounting", "Controller, AP lead, AR lead, payroll lead."),
    recipeBlock({
      task: "Output owners per section and input deadline.",
      questions: [
        "Who owns blockers?",
        "Who owns key numbers?",
      ],
      output: "Owners per section and input deadline.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Share owners and deadline."],
    ["Owners assigned."]
  ),
];

const WEEKLY_DAY_3_STEPS: PlanDayStep[] = [
  step(
    1,
    "Summarize into the template",
    "Turn raw inputs into a filled brief.",
    "Raw inputs and the brief template.",
    exampleBlock("roofing", "Installs scheduled, material delays, quote backlog, cancellations."),
    recipeBlock({
      task: "Produce a filled brief using the template.",
      questions: [
        "Do you want names or roles?",
        "Do you want item-level detail or totals only?",
      ],
      output: "A filled brief using the template.",
      notesLabel: "Inputs:",
      notesPlaceholder: "Template:\n[Paste]\nRaw inputs:\n[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review for accuracy."],
    ["Draft brief created."]
  ),
  step(
    2,
    "Identify missing info",
    "Find gaps that reduce trust.",
    "Draft brief.",
    exampleBlock("roofing", "Draft includes blockers without owners."),
    recipeBlock({
      task: "Output missing details list and exact questions to ask owners.",
      questions: [
        "Which section must be accurate every week?",
        "Which section feels noisy today?",
      ],
      output: "Missing details list. Exact questions to ask owners.",
      notesLabel: "Draft:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Ask questions.", "4) Update draft."],
    ["Missing info resolved."]
  ),
  step(
    3,
    "Tighten wording",
    "Shorten and sharpen.",
    "Updated draft.",
    exampleBlock("roofing", "Updated draft with extra context."),
    recipeBlock({
      task: "Rewrite with short sentences and clear asks.",
      questions: [
        "Target length, 150 or 200 words?",
        "Tone, direct or friendly?",
      ],
      output: "Rewritten draft.",
      notesLabel: "Draft:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Replace draft."],
    ["Final brief concise."]
  ),
];

const WEEKLY_DAY_4_STEPS: PlanDayStep[] = [
  step(
    1,
    "Blockers with help needed",
    "Turn blockers into clear asks.",
    "Draft brief and raw blockers.",
    exampleBlock("accounting", "Blocked on approvals and missing data."),
    recipeBlock({
      task: "Output blockers with What is blocked, Why blocked, Help needed, Owner, Deadline.",
      questions: [
        "Who removes blockers?",
        "What counts as blocked?",
      ],
      output: "Blockers with What is blocked, Why blocked, Help needed, Owner, Deadline.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to blockers section."],
    ["Blockers include owners and asks."]
  ),
  step(
    2,
    "Risks with actions",
    "Identify risks before they hit.",
    "Draft brief and metrics.",
    exampleBlock("accounting", "Close date risk, staffing risk, compliance risk."),
    recipeBlock({
      task: "Output risks with impact and next action.",
      questions: [
        "Which risks matter most, timeline, cost, compliance?",
        "Do you want a simple risk rating, low, medium, high?",
      ],
      output: "Risks with impact and next action.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to risks callout."],
    ["Risks listed with actions."]
  ),
  step(
    3,
    "Slipping date check",
    "Identify items likely to miss deadlines.",
    "Priorities list with dates and dependencies.",
    exampleBlock("accounting", "Reconcile by Wed, approvals by Thu, report by Fri."),
    recipeBlock({
      task: "Output items at risk, why at risk, fix suggestion.",
      questions: [
        "Non-negotiable deadline?",
        "Top dependency?",
      ],
      output: "Items at risk. Why at risk. Fix suggestion.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Update priorities."],
    ["At-risk items flagged."]
  ),
];

const WEEKLY_DAY_5_STEPS: PlanDayStep[] = [
  step(
    1,
    "Review checklist",
    "Prevent errors.",
    "Common brief mistakes.",
    exampleBlock("roofing", "Wrong counts, missing blockers, vague help needed."),
    recipeBlock({
      task: "Output a 7-point review checklist.",
      questions: [
        "Top 3 mistakes from past updates?",
        "What must be verified?",
      ],
      output: "A 7-point review checklist.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run before sending."],
    ["Checklist saved."]
  ),
  step(
    2,
    "Send-ready format",
    "Format for email or team chat.",
    "Final brief.",
    exampleBlock("roofing", "Final brief text."),
    recipeBlock({
      task: "Output send-ready formatting for the chosen channel.",
      questions: [
        "Channel, email or team chat?",
        "Do you want a subject line?",
      ],
      output: "Send-ready formatting for the chosen channel.",
      notesLabel: "Brief:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Copy and send."],
    ["Brief sent."]
  ),
  step(
    3,
    "Weekly schedule",
    "Set input deadlines and send time.",
    "Preferred day and time.",
    exampleBlock("roofing", "Send Friday 4pm. Inputs due Friday 12pm."),
    recipeBlock({
      task: "Output weekly cadence, owner deadlines, review time, send time.",
      questions: [
        "When do owners send updates?",
        "When do leaders read it?",
      ],
      output: "Weekly cadence. Owner deadlines. Review time. Send time.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Put on calendar."],
    ["Schedule set."]
  ),
];

const WEEKLY_DAY_6_STEPS: PlanDayStep[] = [
  step(
    1,
    "Trends lines",
    "Summarize metric movement.",
    "This week and last week metrics.",
    exampleBlock("accounting", "Overdue invoices up, close days flat, exceptions down."),
    recipeBlock({
      task: "Output trend lines for each metric.",
      questions: [
        "Use raw change or percent change?",
        "Highlight only top 3 changes or all five?",
      ],
      output: "Trend lines for each metric.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to brief."],
    ["Trends included."]
  ),
  step(
    2,
    "Decisions needed",
    "Write decision asks leaders answer fast.",
    "Blockers and risks.",
    exampleBlock("accounting", "Need approval for temp staffing. Need decision on cutoff policy exception."),
    recipeBlock({
      task: "Output decision bullets with owner and deadline.",
      questions: [
        "Who decides?",
        "Decision deadline?",
      ],
      output: "Decision bullets with owner and deadline.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to end of brief."],
    ["Decisions listed."]
  ),
  step(
    3,
    "Decision log template",
    "Track decisions over time.",
    "Where you store it.",
    exampleBlock("accounting", "Shared sheet."),
    recipeBlock({
      task: "Output fields: Date, decision, owner, deadline, outcome, follow-up.",
      questions: [
        "Who owns the log?",
        "Who updates it?",
      ],
      output: "Fields: Date, decision, owner, deadline, outcome, follow-up.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Create the log."],
    ["Decision log created."]
  ),
];

const WEEKLY_DAY_7_STEPS: PlanDayStep[] = [
  step(
    1,
    "Weekly runbook",
    "A weekly checklist to run the brief end-to-end.",
    "Owner list and schedule.",
    exampleBlock("roofing", "Owners: sales lead, ops lead, office manager."),
    recipeBlock({
      task: "Output a 10-step runbook with owners.",
      questions: [
        "Who collects inputs?",
        "Who reviews final?",
      ],
      output: "A 10-step runbook with owners.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Follow weekly."],
    ["Runbook saved."]
  ),
  step(
    2,
    "Feedback questions",
    "Improve the brief from reader input.",
    "Who reads it and what decisions they make.",
    exampleBlock("roofing", "Owner uses it to decide staffing and schedule changes."),
    recipeBlock({
      task: "Output 5 feedback questions.",
      questions: [
        "What decisions do readers make weekly?",
        "What sections get ignored?",
      ],
      output: "5 feedback questions.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Ask monthly."],
    ["Feedback collected."]
  ),
  step(
    3,
    "Template improvements",
    "Update template after two briefs and feedback.",
    "Two briefs and feedback notes.",
    exampleBlock("accounting", "Two briefs and comments about missing risks."),
    recipeBlock({
      task: "Output an updated template.",
      questions: [
        "What felt noisy?",
        "What felt missing?",
      ],
      output: "An updated template.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Replace old template."],
    ["Template updated."]
  ),
];

const WEEKLY_PREVIEW_DAYS: PlanPreviewDay[] = [
  previewDay("Day 1", "Prep and set up", [
    "Pick team and scope",
    "Pick two sources",
    "Gather last week inputs",
  ]),
  previewDay("Day 2", "Brief template", [
    "Create brief template",
    "Pick five metrics",
    "Assign section owners",
  ]),
  previewDay("Day 3", "Summaries", [
    "Summarize into the template",
    "Identify missing info",
    "Tighten wording",
  ]),
  previewDay("Day 4", "Blockers and risks", [
    "Blockers with help needed",
    "Risks with actions",
    "Slipping date check",
  ]),
  previewDay("Day 5", "Review and send", [
    "Review checklist",
    "Send-ready format",
    "Weekly schedule",
  ]),
  previewDay("Day 6", "Trends and decisions", [
    "Trends lines",
    "Decisions needed",
    "Decision log template",
  ]),
  previewDay("Day 7", "Lock the cadence", [
    "Weekly runbook",
    "Feedback questions",
    "Template improvements",
  ]),
];

const WEEKLY_FULL_DAYS: PlanFullDay[] = [
  fullDay("Day 1", "Prep and set up", "Pick one team, pick two sources, gather last week inputs.", WEEKLY_DAY_1_STEPS),
  fullDay("Day 2", "Brief template", "Create the template, pick metrics, assign owners.", WEEKLY_DAY_2_STEPS),
  fullDay("Day 3", "Summaries", "Summarize updates, find missing info, tighten wording.", WEEKLY_DAY_3_STEPS),
  fullDay("Day 4", "Blockers and risks", "Flag blockers, flag risks, check slipping dates.", WEEKLY_DAY_4_STEPS),
  fullDay("Day 5", "Review and send", "Review checklist, send format, schedule.", WEEKLY_DAY_5_STEPS),
  fullDay("Day 6", "Trends and decisions", "Add trends, list decisions, create decision log.", WEEKLY_DAY_6_STEPS),
  fullDay("Day 7", "Lock the cadence", "Weekly runbook, feedback questions, template improvements.", WEEKLY_DAY_7_STEPS),
];

// ——— Plan 5: Handoff tracker system ———

const HANDOFF_DAY_1_STEPS: PlanDayStep[] = [
  step(
    1,
    "Pick the handoff",
    "Choose one handoff where work stalls.",
    "List of handoffs and what breaks.",
    exampleBlock("roofing", "Sales to production after quote acceptance."),
    recipeBlock({
      task: "Output one handoff in scope and success definition for week 1.",
      questions: [
        "Which handoff delays revenue most?",
        "Where does it stall, missing info or waiting on approval?",
        "Who owns each side of the handoff today?",
      ],
      output: "One handoff in scope. Success definition for week 1.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Focus on this handoff for 7 days."],
    ["One handoff selected."]
  ),
  step(
    2,
    "Collect examples",
    "Gather 10 real handoff notes or threads.",
    "10 examples.",
    exampleBlock("roofing", "Job sold, address missing, start date unclear, materials not selected."),
    recipeBlock({
      task: "Output top missing fields list and top rework triggers list.",
      questions: [
        "What missing info causes rework?",
        "What repeats weekly?",
      ],
      output: "Top missing fields list. Top rework triggers list.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save lists."],
    ["Missing fields list saved."]
  ),
  step(
    3,
    "Define stages and owners",
    "Map stages and ownership.",
    "Your handoff flow in plain words.",
    exampleBlock("roofing", "Sold, site visit, permit, schedule, install, final invoice."),
    recipeBlock({
      task: "Output stage list, owner per stage, definition of done per stage.",
      questions: [
        "Who owns each stage today?",
        "What counts as done for each stage?",
      ],
      output: "Stage list. Owner per stage. Definition of done per stage.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to tracker."],
    ["Stages and owners defined."]
  ),
];

const HANDOFF_DAY_2_STEPS: PlanDayStep[] = [
  step(
    1,
    "Required fields list",
    "Decide what must exist before a handoff is valid.",
    "Missing fields list and examples.",
    exampleBlock("accounting", "Vendor name, invoice number, amount, approver, due date, payment method."),
    recipeBlock({
      task: "Output required fields with definitions.",
      questions: [
        "What fields are required every time?",
        "What fields depend on the case?",
      ],
      output: "Required fields with definitions.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Make them required in your tracker process."],
    ["Required fields defined."]
  ),
  step(
    2,
    "Due date rules",
    "Set expected timing per stage.",
    "Typical cycle times.",
    exampleBlock("accounting", "Invoice approval 2 business days. Payment run weekly."),
    recipeBlock({
      task: "Output due date rules and late thresholds.",
      questions: [
        "What is normal cycle time per stage?",
        "What is late threshold per stage?",
      ],
      output: "Due date rules and late thresholds.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save rules next to your stage list."],
    ["Due date rules saved."]
  ),
  step(
    3,
    "Valid handoff checklist",
    "A checklist under 10 items.",
    "Required fields.",
    exampleBlock("accounting", "Required fields list."),
    recipeBlock({
      task: "Output a valid handoff checklist with pass fail rules.",
      questions: [
        "Which fields block handoff if missing?",
        "Which fields are optional?",
      ],
      output: "A valid handoff checklist with pass fail rules.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Run checklist before sending handoff note."],
    ["Checklist saved."]
  ),
];

const HANDOFF_DAY_3_STEPS: PlanDayStep[] = [
  step(
    1,
    "Generate handoff note",
    "Create a standard note from tracker fields.",
    "One tracker record.",
    exampleBlock("roofing", "Job name, address, scope, start window, material type, permit status, customer constraints."),
    recipeBlock({
      task: "Output Context, What is done, What is next, Owner, Due date, Links needed.",
      questions: [
        "Audience, internal team or partner?",
        "Short or detailed note?",
      ],
      output: "Context. What is done. What is next. Owner. Due date. Links needed.",
      notesLabel: "Fields:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Copy note into your handoff channel."],
    ["Handoff note created."]
  ),
  step(
    2,
    "Missing info check",
    "Catch missing required info.",
    "The handoff note and required fields list.",
    exampleBlock("accounting", "Handoff note missing invoice number and approver."),
    recipeBlock({
      task: "Output missing items list and top 3 questions to ask.",
      questions: [
        "Paste your required fields list.",
        "Who supplies missing info?",
      ],
      output: "Missing items list. Top 3 questions to ask.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Ask questions.", "4) Update tracker.", "5) Regenerate note."],
    ["Note passes required fields."]
  ),
  step(
    3,
    "Standardize format",
    "Make all notes look the same.",
    "Five handoff notes.",
    exampleBlock("roofing", "Five notes from last week."),
    recipeBlock({
      task: "Output one standard format and rewritten notes in that format.",
      questions: [
        "Preferred section order?",
        "Do you want a short subject line at top?",
      ],
      output: "One standard format. Rewritten notes in that format.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Adopt format going forward."],
    ["Standard format saved."]
  ),
];

const HANDOFF_DAY_4_STEPS: PlanDayStep[] = [
  step(
    1,
    "Next step rules",
    "Define what triggers the next stage.",
    "Stage list and done definitions.",
    exampleBlock("roofing", "Stage list and done definitions."),
    recipeBlock({
      task: "Output next-step rules per stage.",
      questions: [
        "What triggers next stage, status change or approval?",
        "Who becomes owner at next stage?",
      ],
      output: "Next-step rules per stage.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to your tracker doc."],
    ["Rules saved."]
  ),
  step(
    2,
    "Notification messages",
    "Write three internal notification templates.",
    "Owners and stage types.",
    exampleBlock("accounting", "AP, payroll, controller, requester."),
    recipeBlock({
      task: "Output 3 templates: New handoff assigned, Missing info request, Stage completed and next stage started.",
      questions: [
        "Do you want due date included every time?",
        "Tone preference, direct or friendly?",
      ],
      output: "3 templates: New handoff assigned, Missing info request, Stage completed and next stage started.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Copy and send during handoffs."],
    ["Templates saved."]
  ),
  step(
    3,
    "End-to-end test",
    "Test one real item through stages.",
    "One real item details.",
    exampleBlock("roofing", "One job from sold to scheduled."),
    recipeBlock({
      task: "Output what breaks, what is missing, fixes to rules and required fields.",
      questions: [
        "Where does this item stall today?",
        "What info is often missing?",
      ],
      output: "What breaks. What is missing. Fixes to rules and required fields.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Apply fixes to your tracker process."],
    ["One item completed without stall."]
  ),
];

const HANDOFF_DAY_5_STEPS: PlanDayStep[] = [
  step(
    1,
    "Overdue definitions",
    "Define overdue per stage.",
    "Due date rules and late thresholds.",
    exampleBlock("roofing", "Scheduling stage overdue after 2 business days."),
    recipeBlock({
      task: "Output overdue definitions and escalation order.",
      questions: [
        "Escalation path, owner then manager, or manager first?",
        "Quiet hours?",
      ],
      output: "Overdue definitions and escalation order.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Save with stage rules."],
    ["Overdue rules saved."]
  ),
  step(
    2,
    "Escalation templates",
    "Three templates, first nudge, second nudge, manager escalation.",
    "Tone preference and escalation order.",
    exampleBlock("roofing", "First nudge to owner. Second to owner. Third to manager."),
    recipeBlock({
      task: "Draft 3 templates under 60 words each.",
      questions: [
        "Tone preference, firm or friendly?",
        "Include due date and next step question?",
      ],
      output: "3 templates under 60 words each.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Use only after overdue threshold."],
    ["Templates saved."]
  ),
  step(
    3,
    "Noise control rules",
    "Prevent message spam.",
    "Your escalation plan.",
    exampleBlock("accounting", "No more than one ping per item per day. Batch messages at 3pm. No weekends."),
    recipeBlock({
      task: "Output noise control rules and examples.",
      questions: [
        "Max pings per item per day?",
        "Do you want batching?",
      ],
      output: "Noise control rules and examples.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Add to process doc."],
    ["Noise rules saved."]
  ),
];

const HANDOFF_DAY_6_STEPS: PlanDayStep[] = [
  step(
    1,
    "Bottleneck metrics",
    "Decide what to measure weekly.",
    "Stage list and tracker fields.",
    exampleBlock("accounting", "Time in stage, overdue count, rework count, missing info count."),
    recipeBlock({
      task: "Output metrics and how to calculate them.",
      questions: [
        "What fields exist today?",
        "Do you track dates per stage?",
      ],
      output: "Metrics and how to calculate them.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Track weekly."],
    ["Metrics defined."]
  ),
  step(
    2,
    "Root cause categories",
    "Create 6 to 10 root cause labels.",
    "Common stall reasons.",
    exampleBlock("accounting", "Missing approval, missing invoice, dependency, unclear owner, policy exception, waiting on vendor, data mismatch."),
    recipeBlock({
      task: "Output categories with definition and example.",
      questions: [
        "Top 3 stall reasons?",
        "Any categories to avoid?",
      ],
      output: "Categories with definition and example.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Label each stalled item with one category."],
    ["Categories saved."]
  ),
  step(
    3,
    "Weekly bottleneck report draft",
    "One report with fixes.",
    "Stage metrics and examples.",
    exampleBlock("accounting", "Stage times and overdue counts from this week."),
    recipeBlock({
      task: "Output slowest stage, top causes, top fixes with owner and due day.",
      questions: [
        "Who reads the report?",
        "What action do you want from the reader?",
      ],
      output: "Slowest stage. Top causes. Top fixes with owner and due day.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Review weekly."],
    ["Report format saved."]
  ),
];

const HANDOFF_DAY_7_STEPS: PlanDayStep[] = [
  step(
    1,
    "Weekly cleanup routine",
    "Keep tracker accurate.",
    "Tracker fields and owner list.",
    exampleBlock("roofing", "Office manager owns cleanup Friday 3pm."),
    recipeBlock({
      task: "Output a weekly cleanup routine in 10 steps.",
      questions: [
        "Who updates statuses?",
        "Who fixes missing fields?",
      ],
      output: "A weekly cleanup routine in 10 steps.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Schedule it."],
    ["Cleanup scheduled."]
  ),
  step(
    2,
    "Change control rules",
    "Prevent silent drift.",
    "Who edits stages and required fields.",
    exampleBlock("roofing", "Only owner edits stages. Office manager edits templates."),
    recipeBlock({
      task: "Output change rules and change log format.",
      questions: [
        "Who approves changes?",
        "How do you communicate changes?",
      ],
      output: "Change rules. Change log format.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Record every change."],
    ["Change rules saved."]
  ),
  step(
    3,
    "Team training script",
    "Train the team in 10 minutes.",
    "Stage list, required fields, and top mistakes.",
    exampleBlock("accounting", "Top mistakes are missing invoice number, missing approver, unclear owner."),
    recipeBlock({
      task: "Output a 10-minute training script and a compliance checklist under 8 items.",
      questions: [
        "Who is the audience?",
        "Top 3 mistakes to prevent?",
      ],
      output: "A 10-minute training script. A compliance checklist under 8 items.",
      notesLabel: "Inputs:",
      notesPlaceholder: "[Paste]",
    }),
    ["1) Paste inputs.", "2) Run.", "3) Read script in a team meeting."],
    ["Training delivered."]
  ),
];

const HANDOFF_PREVIEW_DAYS: PlanPreviewDay[] = [
  previewDay("Day 1", "Prep and set up", [
    "Pick the handoff",
    "Collect examples",
    "Define stages and owners",
  ]),
  previewDay("Day 2", "Required info and rules", [
    "Required fields list",
    "Due date rules",
    "Valid handoff checklist",
  ]),
  previewDay("Day 3", "Handoff notes", [
    "Generate handoff note",
    "Missing info check",
    "Standardize format",
  ]),
  previewDay("Day 4", "Next step routing", [
    "Next step rules",
    "Notification messages",
    "End-to-end test",
  ]),
  previewDay("Day 5", "Escalations", [
    "Overdue definitions",
    "Escalation templates",
    "Noise control rules",
  ]),
  previewDay("Day 6", "Bottleneck report", [
    "Bottleneck metrics",
    "Root cause categories",
    "Weekly bottleneck report draft",
  ]),
  previewDay("Day 7", "Lock the process", [
    "Weekly cleanup routine",
    "Change control rules",
    "Team training script",
  ]),
];

const HANDOFF_FULL_DAYS: PlanFullDay[] = [
  fullDay("Day 1", "Prep and set up", "Pick one handoff, collect examples, define stages and owners.", HANDOFF_DAY_1_STEPS),
  fullDay("Day 2", "Required info and rules", "Required fields, due date rules, valid handoff checklist.", HANDOFF_DAY_2_STEPS),
  fullDay("Day 3", "Handoff notes", "Generate standard notes and catch missing info before sending.", HANDOFF_DAY_3_STEPS),
  fullDay("Day 4", "Next step routing", "Define next step rules, write notifications, run end-to-end test.", HANDOFF_DAY_4_STEPS),
  fullDay("Day 5", "Escalations", "Define overdue, write templates, reduce noise.", HANDOFF_DAY_5_STEPS),
  fullDay("Day 6", "Bottleneck report", "Define metrics, root causes, weekly report format.", HANDOFF_DAY_6_STEPS),
  fullDay("Day 7", "Lock the process", "Weekly cleanup, change rules, training script.", HANDOFF_DAY_7_STEPS),
];

export const PLAN_BY_SLUG: Record<PlanSlug, PlanContent> = {
  "lead-follow-up": {
    meta: {
      slug: "lead-follow-up",
      name: "Lead follow-up system",
      oneLiner: "Follow up fast, keep deals moving, stop leads going cold.",
    },
    previewDays: LEAD_FOLLOW_UP_PREVIEW_DAYS,
    fullDays: LEAD_FOLLOW_UP_FULL_DAYS,
  },
  "support-triage": {
    meta: {
      slug: "support-triage",
      name: "Support triage system",
      oneLiner: "Route requests fast, draft replies, reduce response delays.",
    },
    previewDays: SUPPORT_PREVIEW_DAYS,
    fullDays: SUPPORT_FULL_DAYS,
  },
  "meeting-follow-up": {
    meta: {
      slug: "meeting-follow-up",
      name: "Meeting follow-up system",
      oneLiner: "Turn meetings into tasks, reminders, and follow-ups.",
    },
    previewDays: MEETING_PREVIEW_DAYS,
    fullDays: MEETING_FULL_DAYS,
  },
  "weekly-visibility": {
    meta: {
      slug: "weekly-visibility",
      name: "Weekly visibility system",
      oneLiner: "Collect updates and send one weekly brief.",
    },
    previewDays: WEEKLY_PREVIEW_DAYS,
    fullDays: WEEKLY_FULL_DAYS,
  },
  "handoff-tracker": {
    meta: {
      slug: "handoff-tracker",
      name: "Handoff tracker system",
      oneLiner: "Track owners and due dates, reduce handoff delays.",
    },
    previewDays: HANDOFF_PREVIEW_DAYS,
    fullDays: HANDOFF_FULL_DAYS,
  },
};
