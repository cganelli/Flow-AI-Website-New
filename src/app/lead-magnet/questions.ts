export type LeadQuestionId = "q1Role" | "q2Goal" | "q3Pileup" | "q4Start" | "q5Lost";

export type LeadQuestion = {
  id: LeadQuestionId;
  prompt: string;
  options: { value: string; label: string }[];
};

export const questions: LeadQuestion[] = [
  {
    id: "q2Goal",
    prompt: "What would make the next 30 days a win?",
    options: [
      { value: "more-booked-calls-proposals", label: "More leads turn into booked calls or closed deals" },
      { value: "faster-response", label: "Customers get faster, more consistent answers" },
      { value: "meetings-clear-next-steps", label: "Meetings turn into clear next steps within 24 hours" },
      { value: "leadership-weekly-update", label: "Leadership gets a weekly update without chasing people" },
      { value: "faster-handoffs", label: "Work moves faster between people, fewer stalls at handoffs" },
    ],
  },
  {
    id: "q3Pileup",
    prompt: "Where does work pile up most?",
    options: [
      { value: "lead-follow-up", label: "Lead follow-up and pipeline" },
      { value: "customer-support", label: "Customer questions and support" },
      { value: "scheduling-follow-ups", label: "Scheduling, reminders, follow-ups" },
      { value: "status-updates", label: "Status updates, reports, dashboards" },
      { value: "approvals-handoffs", label: "Approvals, handoffs, task tracking" },
    ],
  },
  {
    id: "q4Start",
    prompt: "Where does the work start most often?",
    options: [
      { value: "email-inbox", label: "Email inbox" },
      { value: "meetings-actions", label: "Meetings and action items" },
      { value: "website-forms", label: "Website forms or inbound requests" },
      { value: "slack-teams", label: "Slack or Teams messages" },
      { value: "spreadsheets-docs", label: "Spreadsheets and shared docs" },
    ],
  },
  {
    id: "q5Lost",
    prompt: "Where do you lose opportunities today?",
    options: [
      { value: "slow-follow-up", label: "Leads go cold due to slow follow-up" },
      { value: "slow-answers", label: "Customers wait too long for answers" },
      { value: "deals-stall", label: "Deals stall after meetings" },
      { value: "quotes-slow", label: "Quotes and proposals take too long" },
      { value: "no-next-step", label: "No clear next step, so work slips" },
    ],
  },
  {
    id: "q1Role",
    prompt: "Which fits you best?",
    options: [
      { value: "smb-owner", label: "SMB owner or founder" },
      { value: "enterprise-vp", label: "Enterprise VP or department leader" },
    ],
  },
];
