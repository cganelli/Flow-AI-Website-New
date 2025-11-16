/**
 * Training Data Configuration
 * 
 * Location: /components/training/training-data.ts
 * 
 * Purpose: Contains all content and data for the Training page.
 * This file should be updated with approved copy from the client.
 */

import {
  TrainingTrack,
  WorkshopCard,
  WorkshopDetail,
} from "./training-types";

export const heroContent = {
  title: "AI Training For Real-World Work",
  subtitleLines: [
    "Flow AI runs live, hands-on training for teams of 1 to 100 people.",
    "Sessions focus on real tasks such as emails, meetings, reports, and core processes.",
    "Every workshop ends with at least one workflow your team uses that same week.",
  ],
  primaryCtaLabel: "Request Training Info",
  primaryCtaHref: "/contact?topic=training",
  secondaryCtaLabel: "View Training Options",
  secondaryCtaHref: "#training-tracks",
};

export const audienceContent = {
  smallBusiness: {
    title: "For small business owners",
    bullets: [
      "Owner with/without a team wearing many hats",
      "Owners under pressure to increase productivity and control costs",
      "Need practical support for day-to-day work, not theory",
    ],
  },
  corporateTeams: {
    title: "For corporate teams",
    bullets: [
      "Departments with 2–100 staff",
      "Leaders under pressure to show AI progress and ROI",
      "Need guardrails, repeatable workflows, and clear roles",
    ],
  },
  footerLine: "Every session uses your examples, tools, and current workflows.",
};

export const howItWorksContent = {
  title: "How Flow AI training works",
  steps: [
    {
      number: "1",
      title: "Format",
      description: "Live sessions, virtual or on-site. Group demos plus short exercises. Q&A focused on your tools and workflows.",
      image: "/images/format-icon.svg",
    },
    {
      number: "2",
      title: "Foundations",
      description: "Short intake form on roles, tools, and workflows. Option to send sample emails, docs, or processes in advance.",
      image: "/images/foundations-icon.svg",
    },
    {
      number: "3",
      title: "Flexible Groups",
      description: "Works well for 5–40 people per session. Larger groups split into multiple sessions or tracks.",
      image: "/images/flexible-groups-icon.svg",
    },
    {
      number: "4",
      title: "Follow-up",
      description: "Summary email with links and materials. Prompt packs or worksheets for reuse.",
      image: "/images/follow-up-icon.svg",
    },
  ],
};

export const coreTracksTitle = "Core Training Tracks";

export const coreTracks: TrainingTrack[] = [
  {
    id: "foundations",
    title: "AI For Beginners: Flow AI Foundations",
    shortOverview:
      "Give your team a clear, calm introduction to AI, with examples from their daily work.",
    bestFor: [
      "Small business owners and staff",
      "Departments with mixed skill levels",
      "Leaders who want a shared baseline before deeper work",
    ],
    learnSections: [
      {
        title: "What the team learns",
        points: [
          "What AI is and how large language models work, in plain language",
          "How to write clear prompts and avoid common mistakes",
          "When AI helps and when a human, system, or simple script works better",
          "How to use AI safely with work data and simple guardrails",
          "Flow AI Lessons 0–4, adapted to your examples",
        ],
      },
    ],
    format: [
      "90–120 minute live session, virtual or on-site",
      "Group demos plus short individual exercises",
      "Q&A focused on your tools and workflows",
    ],
    outcomes: [
      "Shared understanding of AI across the team",
      "One simple AI win workflow per attendee",
      "Starter prompt pack for email, summaries, and drafts",
    ],
  },
  {
    id: "everyday-work",
    title: "AI Skills For Everyday Work",
    shortOverview:
      "Turn AI into a daily helper for writing, summarizing, planning, and follow-ups.",
    bestFor: [
      "Individual contributors in marketing, operations, HR, sales, or finance",
      "Managers who write reports, decks, and updates",
      "Admin staff with a high volume of communication",
    ],
    learnSections: [
      {
        title: "Email",
        points: [
          "Draft replies from bullet notes or rough ideas",
          "Rewrite for tone, clarity, and length",
        ],
      },
      {
        title: "Documents and presentations",
        points: [
          "Turn rough notes into outlines, pages, and slides",
          "Improve clarity and structure without losing the original voice",
        ],
      },
      {
        title: "Research and summaries",
        points: [
          "Turn long articles, PDFs, or transcripts into clear summaries",
          "Pull out action items, risks, and talking points",
        ],
      },
      {
        title: "Meetings and follow-ups",
        points: [
          "Turn notes into agendas, minutes, and task lists",
          "Write follow-up emails and status updates from meeting outcomes",
        ],
      },
    ],
    format: [
      "2–3 hour live session, virtual or on-site",
      "Live demos using your examples",
      "Guided exercises with feedback on prompts and outputs",
    ],
    outcomes: [
      "Shared playbook of before and after examples for your team",
      "Reusable prompt templates for email, documents, slides, and meetings",
      "Immediate time savings on writing and communication tasks",
    ],
  },
  {
    id: "leaders-strategy",
    title: "AI For Leaders: Strategy, Guardrails, And ROI",
    shortOverview:
      "Support owners and leaders as they set direction for AI across a team or department.",
    bestFor: [
      "Owners and founders",
      "Directors, VPs, and department heads",
      "HR, Operations, and IT leaders involved in AI decisions",
    ],
    learnSections: [
      {
        title: "Where AI fits",
        points: [
          "Review current workflows and projects",
          "Spot areas with high manual effort and clear rules",
        ],
      },
      {
        title: "Guardrails and risk",
        points: [
          "Simple policies for data, permissions, and approvals",
          "Ways to reduce shadow AI with clear guidance for staff",
        ],
      },
      {
        title: "ROI and measurement",
        points: [
          "How to estimate time saved and value created",
          "Three to five practical KPIs to track across a team",
        ],
      },
      {
        title: "Change management",
        points: [
          "How to communicate expectations to staff",
          "How to recognize and share AI wins to build momentum",
        ],
      },
    ],
    format: [
      "90–120 minute leadership session, virtual or on-site",
      "Strategy discussion with a small group of leaders",
      "Option to align outcomes with an upcoming project or quarter",
    ],
    outcomes: [
      "Simple AI adoption plan for the next 90 days",
      "Draft guardrails for staff behavior and tool use",
      "Short list of priority workflows for AI and automation",
    ],
  },
];

export const advancedWorkshopsSectionTitle = "Advanced Workshops And Programs";

export const advancedWorkshopCards: WorkshopCard[] = [
  {
    id: "automation-opportunities",
    title: "Identify Automation Opportunities Workshop",
    shortText:
      "Help your team see where automation makes sense in real workflows and leave with a ranked list of projects.",
    anchorId: "workshop-automation-opportunities",
  },
  {
    id: "process-redesign",
    title: "Process Redesign & SOP Upgrade Session",
    shortText:
      "Upgrade key processes so they work with AI and automation and leave with updated SOPs.",
    anchorId: "workshop-process-redesign",
  },
  {
    id: "ai-champions",
    title: "AI Champions Program",
    shortText:
      "Train a small group inside your business to support AI adoption over time.",
    anchorId: "workshop-ai-champions",
  },
];

export const workshopDetails: WorkshopDetail[] = [
  {
    id: "workshop-automation-opportunities",
    title: "Identify Automation Opportunities Workshop",
    shortOverview:
      "Help your team see where automation makes sense in real workflows and turn ideas into a clear list of projects.",
    whoFor: [
      "Owners who want less manual work without disruption",
      "Department leads with busy teams and repeating tasks",
      "Operations and process owners",
    ],
    learnPoints: [
      {
        title: "What the team learns",
        points: [
          "How to map a workflow step by step",
          "How to spot automation-friendly work such as repetitive, rule-based tasks with digital input and output",
          "How to estimate time saved per task",
          "How to score ideas by effort, risk, and business value",
          "How to pick a small starter project instead of a huge overhaul",
        ],
      },
    ],
    format: [
      "2–3 hour live session, virtual or on-site",
      "Start with two or three core workflows from your business",
      "Group breakout time to map and score workflows",
      "Share-out and discussion of top ideas",
    ],
    outcomes: [
      "Ranked list of automation opportunities by team or department",
      "Clear start here recommendation for one to three pilot projects",
      "Simple worksheet for future automation ideas",
    ],
  },
  {
    id: "workshop-process-redesign",
    title: "Process Redesign & SOP Upgrade Session",
    shortOverview:
      "Upgrade one or two key processes so they are ready for AI and automation, with updated SOPs staff follow with ease.",
    whoFor: [
      "Operations leaders and process owners",
      "Team leads who want fewer errors and bottlenecks",
      "Businesses that already use some tools and want them to work together better",
    ],
    learnPoints: [
      {
        title: "What the team learns",
        points: [
          "How to break a process into clear steps with inputs and outputs",
          "Where to add AI for drafting, summarizing, or routing work",
          "Where automation tools should move data or trigger next steps",
          "How to write SOPs that new staff follow without confusion",
          "How to define success at each step so quality stays consistent",
        ],
      },
    ],
    format: [
      "Half-day working session, virtual or on-site",
      "Pre-work to choose one or two processes to redesign",
      "Live walkthrough of the current process",
      "Co-design of the new process with AI and automation added",
      "Live editing of SOPs",
    ],
    outcomes: [
      "One or two updated SOPs, ready to share with staff",
      "Clear list of tools needed and who owns each step",
      "Template for future process improvements",
    ],
  },
  {
    id: "workshop-ai-champions",
    title: "AI Champions Program",
    shortOverview:
      "Train a small group inside your business to support AI adoption after training ends.",
    whoFor: [
      "Growing teams where one person handles too many AI questions",
      "Departments that want internal go to people for AI and automation",
      "Leaders who want adoption to continue between formal trainings",
    ],
    learnPoints: [
      {
        title: "What champions learn",
        points: [
          "How to turn work problems into AI use cases",
          "How to design, test, and improve prompts with peers",
          "How to document workflows for repeat use",
          "How to collect and share AI wins in a simple structure",
          "How to give feedback to leaders on tool gaps and training needs",
        ],
      },
    ],
    format: [
      "Series of three to four sessions over four to eight weeks",
      "Small cohort from different roles or locations",
      "Homework between sessions using real tasks",
      "Shared workspace for prompts, workflows, and examples",
    ],
    outcomes: [
      "Internal group that supports day-to-day AI questions",
      "Shared library of approved prompts and workflows",
      "Regular flow of AI wins and lessons back to leaders",
      "Less reliance on external support for basic AI use",
    ],
  },
];

export const finalCtaContent = {
  title: "Ready To Train Your Team?",
  bodyLines: [
    "Flow AI tailors every session to your size, industry, and current tools.",
    "Share how many people you have, their roles, and your top priorities.",
    "You receive a proposed training agenda and pricing based on your needs.",
  ],
  primaryCtaLabel: "Request Training Agenda",
  primaryCtaHref: "/contact?topic=training",
  secondaryLabel: "Email Flow AI about training",
  secondaryHref: "mailto:hello@thisisflowai.com?subject=Training",
};

