import type { PlanV2, PlanV2Key } from "./types";
import { recipeBlock } from "./recipe-helpers";

export const plansV2: Record<PlanV2Key, PlanV2> = {
  plan1: {
    key: "plan1",
    name: "Lead follow-up system",
    oneLiner: "Follow up fast, keep deals moving, stop leads going cold.",
    diyTime: "16 to 30 hours",
    diyCalendar: "2 to 5 weeks",
    diyNeeds: [
      "Access to your lead sources (email, forms, messages)",
      "A tracker (sheet or database) with required fields",
      "20 real lead examples plus 3 to 5 strong past replies",
    ],
    diyRisks: [
      "Drafts sound off-brand, so you stop using them",
      "Follow-ups fail when inputs vary or data is missing",
      "The tracker goes stale, then becomes useless",
    ],
    buildOutput: {
      title: "Implementation output:",
      bullets: [
        "System design plus rollout timeline",
        "Connected lead intake from email and forms",
        "Lead details extracted into a clean tracker record",
        "Drafted follow-ups in your voice, with approval before sending",
        "Follow-up scheduling and reminders for no-response leads",
        "Stalled-lead alerts plus a weekly pipeline summary",
        {
          label: "Quality assurance:",
          sub: [
            "Voice and tone guardrails for drafts",
            "Monitoring and exception handling for missing details and duplicates",
            "Daily digest plus weekly performance reporting",
          ],
        },
      ],
    },
    diyStarterKit: {
      title: "DIY starter kit",
      howToUse: [],
      prompts: [
        {
          title: "Extract lead details from a message",
          prompt: `You are helping me log a new lead.
Read the message below and extract the details into this exact format.
Output format
Name:
Company:
Email:
Phone:
What they want:
Urgency:
Best next step:
Suggested follow-up date:
Any missing info to ask for:
Message
[Paste the lead email or form submission here]`,
        },
        {
          title: "Draft the first reply in my tone",
          prompt: `Write a friendly, professional reply to the lead message below.
Goal: get a clear next step, either a call or the info I need to send a quote.
Keep it short, 6 to 10 sentences.
Ask no more than 2 questions.
End with one clear next step.
Use this tone
[Paste 2 to 3 examples of your best past replies here]
Lead message
[Paste lead message here]`,
        },
        {
          title: "Create a follow-up plan for no response",
          prompt: `Create a simple follow-up plan for this lead.
Give me 3 follow-up messages I can send.
Space them out over 7 days.
Each message should be shorter than the previous one.
Do not sound pushy.
Lead context
[Paste the lead record summary here]`,
        },
      ],
    },
    days: [
      {
        day: 1,
        title: "Prep and set up",
        summary: "Set up one tracker, gather real examples, save your starter prompts.",
        steps: [
          {
            id: "d1s1",
            label: "Identify lead sources",
            prompt: `Title: Identify lead sources
Goal: List every place leads show up, then pick what to include this week.
What you will paste: A short list of where leads arrive today.
Example input:
Email inbox: owner@mycompany.com
Website form: Contact form
Phone calls: voicemail to office line
Text messages: business line
Other channels where leads arrive
Copy and paste prompt:
Task: Identify lead sources for my business.
Ask me these questions first.
1) What is your business type?
2) What are the top 3 services you sell?
3) What is your service area, city or counties?
4) What are your business hours?
5) Who replies to new leads today?
6) Where do leads arrive today? List every source.
After I answer, produce these outputs.
Output A: In-scope sources for this week. Pick up to 3 only. Explain why.
Output B: Out-of-scope sources. List the rest. Explain why out of scope for week 1.
Output C: What to copy each day. Tell me exactly what to copy from each in-scope source into my tracker.
My notes:
Business type:
Top 3 services:
Service area:
Business hours:
Who replies today:
Lead sources list:
How to use:
1) Paste prompt.
2) Fill My notes.
3) Run.
4) Save outputs in one doc.
Done checklist:
I have up to 3 in-scope lead sources.
I know what I will copy each day.`,
          },
          {
            id: "d1s2",
            label: "Collect real lead examples",
            prompt: `Title: Collect real lead examples
Goal: Build a starter set of real leads and label them.
What you will paste: 10 to 20 real lead messages.
Example input:
Lead 1
Source: Website form
Message: Need service, issue described, need help this week.
Lead 2
Source: Email
Message: How much for [your main service]? [Brief details.]
Copy and paste prompt:
Task: Organize my real lead examples for follow-up.
Ask me these questions first.
1) What is your most common lead request?
2) What is your average sale size range?
3) What is the next step you want for most leads, call, inspection, quote, visit?
Then analyze the leads and output this table.
Columns:
Lead ID
Lead source
What they want, one sentence
Urgency: low, medium, high
Lead type: hot, warm, cold
Missing info to ask for
Best next step
Then output a missing-info checklist I reuse for future leads. Limit to 8 questions.
Leads:
Lead 1
Source:
Message:
Lead 2
Source:
Message:
How to use:
1) Paste 10 to 20 leads.
2) Run.
3) Save the table and checklist.
Done checklist:
I have at least 10 labeled lead examples.
I have the 8-question missing-info checklist.`,
          },
          {
            id: "d1s3",
            label: "Define your tracker fields",
            prompt: `Title: Define tracker fields
Goal: Create a simple tracker you will keep using.
What you will paste: Your current lead follow-up process in plain language.
Example input:
We reply when we see leads. Urgent leads get a call. Others get email. We forget follow-ups.
Copy and paste prompt:
Task: Set up my lead tracker so follow-ups do not slip.
Ask me these questions first.
1) What next step do you want for most leads?
2) How fast do you want first response, minutes or hours?
3) What counts as booked for you?
4) What counts as closed won?
5) List 3 reasons a lead does not move forward.
After I answer, output:
Output A: Exactly 10 tracker columns. Mark required vs optional.
Output B: Exactly 6 statuses. One sentence definition each. One rule for when to use.
Output C: A 10-minute daily routine. First, second, third.
My process notes:
[Paste]
How to use:
1) Run.
2) Build the sheet columns exactly.
3) Use the 6 statuses exactly.
Done checklist:
My tracker has 10 columns and 6 statuses.`,
          },
        ],
      },
      {
        day: 2,
        title: "Clean and standardize",
        summary: "Remove duplicates, standardize names, make status rules.",
        steps: [
          {
            id: "d2s1",
            label: "Standardize naming rules",
            prompt: `Title: Standardize naming rules
Goal: One naming standard for names, companies, and sources.
What you will paste: 10 messy examples from your tracker.
Example input:
Name: mike s, Company: acme inc., Source: email, Service: project A
Name: Michael Smith, Company: Acme Inc., Source: web form, Service: project B
Copy and paste prompt:
Task: Create naming rules for my tracker.
Input: 10 messy examples below.
Output:
1) Rules for formatting names, companies, and sources.
2) 10 corrected versions of my examples.
Examples:
[Paste]
How to use:
1) Paste examples.
2) Run.
3) Apply rules to new entries.
Done checklist:
I have naming rules and corrected examples.`,
          },
          {
            id: "d2s2",
            label: "Define status rules",
            prompt: `Title: Define status rules
Goal: Make status changes consistent.
What you will paste: Your 6 statuses list.
Example input:
New, Contacted, Waiting on customer, Scheduled, Won, Lost
Copy and paste prompt:
Task: Define status rules.
Ask me these questions first.
1) What action moves a lead from New to Contacted?
2) What action moves a lead to Scheduled?
3) What action moves a lead to Won?
Then output:
One sentence definition per status.
Entry rule and exit rule per status.
Statuses:
[Paste]
How to use:
1) Run.
2) Add rules to your tracker doc.
Done checklist:
Each status has entry and exit rules.`,
          },
          {
            id: "d2s3",
            label: "Clean a batch",
            prompt: `Title: Clean a batch
Goal: Clean 20 rows fast.
What you will paste: 20 tracker rows.
Example input:
Row 1: Name blank, Company Acme, Email present, Status New
Row 2: Duplicate of row 1, different spelling
Copy and paste prompt:
Task: Clean this batch of leads.
Output:
Duplicate candidates.
Missing fields per row.
Suggested fixes per row.
Rows:
[Paste]
How to use:
1) Paste 20 rows.
2) Run.
3) Fix rows in your tracker.
Done checklist:
My tracker rows are clean and consistent.`,
          },
        ],
      },
      {
        day: 3,
        title: "First replies",
        summary: "Build short templates, extract lead info, draft replies.",
        steps: [
          {
            id: "d3s1",
            label: "Draft reply templates",
            prompt: `Title: Draft reply templates
Goal: Create 3 templates you reuse.
What you will paste: 3 strong past replies.
Example input:
Paste 3 real replies you sent that got a response.
Copy and paste prompt:
Task: Create reply templates from my past replies.
Ask me these questions first.
1) Do you want calls, inspections, or quotes as the next step?
2) What days and hours are you available?
3) What is one line that sounds like you, a phrase you say often?
Then output 3 templates:
Template A: General inquiry
Template B: Pricing request
Template C: Urgent request
Rules:
Under 120 words.
One clear next step.
Max 2 questions.
Past replies:
[Paste]
How to use:
1) Paste replies.
2) Answer questions.
3) Save templates.
Done checklist:
I have 3 templates saved.`,
          },
          {
            id: "d3s2",
            label: "Extract lead summary",
            prompt: `Title: Extract lead summary
Goal: Turn one message into a clean summary.
What you will paste: One lead message.
Example input:
Need service, issue described, this week, key details included.
Copy and paste prompt:
Task: Extract a lead summary.
Output format:
Name:
Company:
What they want:
Urgency:
Missing info to ask:
Best next step:
Suggested follow-up date:
Message:
[Paste]
How to use:
1) Paste one message.
2) Run.
3) Paste output into your tracker.
Done checklist:
Lead is logged with missing info and next step.`,
          },
          {
            id: "d3s3",
            label: "Draft the reply",
            prompt: `Title: Draft the reply
Goal: Draft one reply that gets a next step.
What you will paste: The lead summary plus your templates.
Example input:
Lead wants service this week, missing details, wants quote, prefers [time/callback].
Copy and paste prompt:
Task: Draft a reply in my tone.
Rules:
Under 120 words.
One clear next step.
Max 2 questions.
Use my templates as the style guide.
Inputs:
Lead summary:
[Paste]
Templates:
[Paste]
How to use:
1) Paste summary and templates.
2) Run.
3) Review and send.
Done checklist:
Reply is drafted with one next step.`,
          },
        ],
      },
      {
        day: 4,
        title: "Follow-up sequences",
        summary: "Create 3-touch follow-ups and timing rules.",
        steps: [
          {
            id: "d4s1",
            label: "Define lead types",
            prompt: `Title: Define lead types
Goal: Define hot, warm, cold in plain language.
What you will paste: A few examples of leads.
Example input:
Hot: urgent request, Warm: standard inquiry, Cold: price-only email
Copy and paste prompt:
Task: Define lead types for my business.
Ask me these questions first.
1) What is your typical sales cycle, days?
2) What is your average response time today?
Then output:
Hot, warm, cold criteria.
Examples for each.
Notes:
[Paste]
How to use:
1) Answer questions.
2) Save definitions.
Done checklist:
I can label every lead as hot, warm, or cold.`,
          },
          {
            id: "d4s2",
            label: "Write follow-up sequence",
            prompt: `Title: Write follow-up sequence
Goal: Write 3 follow-up messages for one lead type.
What you will paste: One lead type and the service offered.
Example input:
Lead type: warm, Service: [your main offering]
Copy and paste prompt:
Task: Write a 3-touch follow-up sequence.
Rules:
Touch 1 helpful.
Touch 2 shorter.
Touch 3 shortest.
No guilt.
No pressure.
Lead type:
[Paste]
Service:
[Paste]
How to use:
1) Run.
2) Save the 3 messages.
Done checklist:
I have a 3-touch sequence.`,
          },
          {
            id: "d4s3",
            label: "Set timing rules",
            prompt: `Title: Set timing rules
Goal: Decide when to send each touch.
What you will paste: Business hours and lead type definitions.
Example input:
Mon to Fri 9 to 5, no weekends, hot needs same-day follow-up.
Copy and paste prompt:
Task: Set timing rules for follow-ups.
Ask me these questions first.
1) Do you send follow-ups on weekends?
2) What time of day do you reply to leads?
Then output:
Timing for touch 1, 2, 3 by lead type.
Details:
[Paste]
How to use:
1) Save the timing rules in your doc.
Done checklist:
My timing rules are written down.`,
          },
        ],
      },
      {
        day: 5,
        title: "Daily review routine",
        summary: "Create one short daily routine to keep the system alive.",
        steps: [
          {
            id: "d5s1",
            label: "Daily checklist",
            prompt: `Title: Daily checklist
Goal: A daily routine you follow every weekday.
What you will paste: How much time you have per day.
Example input:
15 minutes at 9am and 15 minutes at 4pm
Copy and paste prompt:
Task: Create my daily lead follow-up checklist.
Ask me these questions first.
1) How many leads per day do you get?
2) Who will run this checklist?
Then output:
A 10-minute checklist.
A 30-minute checklist.
Each checklist in numbered steps.
Details:
[Paste]
How to use:
1) Save the checklist.
2) Put it on your calendar.
Done checklist:
I have a daily checklist on my calendar.`,
          },
          {
            id: "d5s2",
            label: "Draft review rules",
            prompt: `Title: Draft review rules
Goal: A simple review checklist before sending.
What you will paste: What matters most to you.
Example input:
Tone friendly, do not promise same-day without checking, always confirm next step
Copy and paste prompt:
Task: Create review rules for replies.
Output:
A 7-point review checklist.
A red-flag list for rewrites.
Notes:
[Paste]
How to use:
1) Save rules.
2) Use before every send.
Done checklist:
I have a review checklist.`,
          },
          {
            id: "d5s3",
            label: "First live test",
            prompt: `Title: First live test
Goal: Run today's leads through the process.
What you will paste: 5 new lead messages from today.
Example input:
Paste 5 messages in Lead 1, Lead 2 format.
Copy and paste prompt:
Task: Run a live test on today's leads.
For each lead, output:
Lead summary.
Draft reply.
Lead type.
Next follow-up date.
Leads:
[Paste]
How to use:
1) Paste leads.
2) Run.
3) Review drafts and send.
Done checklist:
At least 3 leads got replies today.`,
          },
        ],
      },
      {
        day: 6,
        title: "Stalled-lead alerts",
        summary: "Define stalled, list stalled leads, draft re-engagement.",
        steps: [
          {
            id: "d6s1",
            label: "Define stalled rules",
            prompt: `Title: Define stalled rules
Goal: Decide when a lead is stalled.
What you will paste: Typical sales cycle timing.
Example input:
If no reply in 3 business days, stalled. If proposal sent and no reply in 5 days, stalled.
Copy and paste prompt:
Task: Define stalled rules.
Ask me these questions first.
1) What is your typical time from first contact to booked call?
2) What is your typical time from quote to yes or no?
Then output:
Stalled definitions by status.
Re-engagement plan per definition.
Timing notes:
[Paste]
How to use:
1) Save the stalled rules.
Done checklist:
I know when a lead becomes stalled.`,
          },
          {
            id: "d6s2",
            label: "Build stalled list",
            prompt: `Title: Build stalled list
Goal: Identify stalled leads from tracker rows.
What you will paste: Tracker rows with status and last contact date.
Example input:
Name, Status, Last contact date, Next step
Copy and paste prompt:
Task: Create a stalled lead list.
Output:
Which leads are stalled.
Why stalled.
Next action.
Rows:
[Paste]
How to use:
1) Paste rows.
2) Run.
3) Update follow-up dates.
Done checklist:
I have a stalled list with next actions.`,
          },
          {
            id: "d6s3",
            label: "Draft re-engagement message",
            prompt: `Title: Draft re-engagement message
Goal: One short re-engagement message.
What you will paste: One stalled lead summary.
Example input:
Warm lead, asked for pricing, no reply, last contact 6 days ago.
Copy and paste prompt:
Task: Draft a re-engagement message.
Rules:
Under 70 words.
Polite.
One next step.
Lead:
[Paste]
How to use:
1) Paste.
2) Run.
3) Review and send.
Done checklist:
Re-engagement message is ready.`,
          },
        ],
      },
      {
        day: 7,
        title: "Weekly pipeline summary",
        summary: "Pick metrics, write summary format, set next-week priorities.",
        steps: [
          {
            id: "d7s1",
            label: "Pick 5 weekly metrics",
            prompt: `Title: Pick 5 weekly metrics
Goal: Choose 5 simple metrics you track weekly.
What you will paste: What "good week" means.
Example input:
More booked calls, fewer stale leads, faster first response.
Copy and paste prompt:
Task: Pick 5 weekly lead metrics.
Ask me these questions first.
1) What is your main weekly goal, booked calls, quotes, or sales?
2) What is your current biggest gap or loss?
Then output:
5 metrics with definitions and how to count them.
Notes:
[Paste]
How to use:
1) Save the 5 metrics.
Done checklist:
I have 5 metrics defined.`,
          },
          {
            id: "d7s2",
            label: "Write summary format",
            prompt: `Title: Write summary format
Goal: A weekly summary under 150 words.
What you will paste: Your 5 metrics.
Example input:
New leads, Replies sent, Booked calls, Quotes sent, Wins
Copy and paste prompt:
Task: Write a weekly pipeline summary template.
Rules:
Under 150 words.
Easy to skim.
Includes next week focus.
Metrics:
[Paste]
How to use:
1) Save template.
Done checklist:
I have a weekly summary template.`,
          },
          {
            id: "d7s3",
            label: "Create next-week priorities",
            prompt: `Title: Create next-week priorities
Goal: Choose top actions for next week.
What you will paste: This week's summary.
Example input:
Paste the weekly summary you drafted.
Copy and paste prompt:
Task: Create next-week priorities.
Output:
Top 5 actions for next week, sorted by impact.
Summary:
[Paste]
How to use:
1) Run.
2) Put the top 2 actions on your calendar.
Done checklist:
I have next-week priorities scheduled.`,
          },
        ],
      },
    ],
  },
  plan2: {
    key: "plan2",
    name: "Support triage system",
    oneLiner: "Route requests fast, draft replies, reduce response delays.",
    diyTime: "22 to 45 hours",
    diyCalendar: "3 to 8 weeks",
    diyNeeds: [
      "Access to support sources (email, contact form, chat)",
      "A shared queue (helpdesk, shared inbox, or tracker)",
      "An approved answer library, even if incomplete",
    ],
    diyRisks: [
      "Replies drift off-policy or sound wrong",
      "Routing breaks when messages vary in wording",
      "The queue becomes messy, then ignored",
    ],
    buildOutput: {
      title: "Implementation output:",
      bullets: [
        "System design plus rollout timeline",
        "Centralized request queue from email and chat",
        "Requests labeled by topic, urgency, and sentiment",
        "Drafted replies grounded in your approved answers, with approval before sending",
        "Routing rules to the right person or team",
        "Escalations for urgent and aging requests, plus daily digest and weekly trends",
        {
          label: "Quality assurance:",
          sub: [
            "Guardrails to keep replies on-policy and on-tone",
            "Monitoring and exception handling for misroutes and edge cases",
            "Daily and weekly reporting on response time, backlog, and repeat issues",
          ],
        },
      ],
    },
    diyStarterKit: {
      title: "DIY starter kit",
      howToUse: [],
      prompts: [
        {
          title: "Label a support request",
          prompt: `Label this customer message using the format below.
Output format
Category:
Urgency: low, medium, high
Sentiment: calm, frustrated, angry
What they need in one sentence:
Best next action:
Should this be escalated: yes or no
If yes, who should handle it:
Message
[Paste customer message here]`,
        },
        {
          title: "Draft a reply using approved answers only",
          prompt: `Draft a reply to the message below.
Use only the information in the Approved Answers section.
If the approved answers do not cover the question, write:
"I need to confirm this and will follow up shortly."
Then list what I need to look up.
Approved Answers
[Paste your FAQ or policy snippets here]
Customer message
[Paste message here]`,
        },
        {
          title: "Create today's queue priorities",
          prompt: `Look at this list of open requests and tell me:
The top 5 to handle first, in order
Which ones should be escalated
Any repeated issue patterns I should notice
Open requests
[Paste list with short summaries and age of each request]`,
        },
      ],
    },
    days: [
      {
        day: 1,
        title: "Prep and set up",
        summary: "Pick one queue, pull real examples, define urgent.",
        steps: [
          { id: "d1s1", label: "Pick support sources", prompt: recipeBlock({ title: "Pick support sources", goal: "Choose one place to handle support first, then list the rest for later.", whatToPaste: "A list of every place customers ask for help.", exampleType: "generic", exampleContent: "Phone, email, website form, text, voicemail, in-person.", copyPastePrompt: `Task: Pick support sources in scope.
Ask me these questions first.
1) What is your business type?
2) Where do customers ask for help today? List every channel.
3) Who replies today and how fast?
After I answer, output:
Output A: One source to start this week. Explain why.
Output B: Sources to ignore for now. Explain why.
Output C: What to copy from the in-scope source into your queue each day.
My notes:
[Paste]`, howToUse: "1) Paste prompt.\n2) Fill My notes.\n3) Run.\n4) Save outputs.", doneChecklist: "I have one support source in scope.\nI know what to copy into my queue." }) },
          { id: "d1s2", label: "Pull recent requests", prompt: recipeBlock({ title: "Pull recent requests", goal: "Build a starter set of real requests with topic and urgency.", whatToPaste: "30 to 50 recent customer messages.", exampleType: "generic", exampleContent: "Request 1: Need quote, issue described. Request 2: When can you start? Request 3: Wrong item or outcome.", copyPastePrompt: `Task: Create a starter set of support requests.
Ask me these questions first.
1) What is your target response time for urgent vs normal?
2) What counts as resolved for you?
Then output a table:
Request ID, Source, Topic guess, Urgency guess, Missing info to ask, Best next action.
Then output a short list of topic categories you see. Limit to 10.
Messages:
[Paste]`, howToUse: "1) Paste messages.\n2) Run.\n3) Save the table and categories.", doneChecklist: "I have a table of requests with topic and urgency.\nI have a list of topic categories." }) },
          { id: "d1s3", label: "Define urgent", prompt: recipeBlock({ title: "Define urgent", goal: "Clear rules for when a request is urgent.", whatToPaste: "Your business rules for urgent requests.", exampleType: "generic", exampleContent: "Urgent issue, safety concern, same-day promise broken, angry customer.", copyPastePrompt: `Task: Define urgent for my support queue.
Ask me these questions first.
1) What must get a same-day response?
2) What words or phrases mean urgent in your business?
3) Who handles urgent when it happens?
Then output:
Urgent triggers. One sentence each.
Examples of urgent vs not urgent.
Rules:
[Paste]`, howToUse: "1) Run.\n2) Save the urgent definition.", doneChecklist: "I have urgent triggers and examples written down." }) },
        ],
      },
      {
        day: 2,
        title: "Categories and rules",
        summary: "Create categories, urgency rules, escalation rules.",
        steps: [
          { id: "d2s1", label: "Create categories", prompt: recipeBlock({ title: "Create categories", goal: "Group requests into 8 to 12 categories you can route and report on.", whatToPaste: "Starter set summaries or topic guesses from Day 1.", exampleType: "generic", exampleContent: "Quote request, main service inquiry, scheduling, follow-up, product question.", copyPastePrompt: `Task: Create support categories.
Ask me these questions first.
1) How many people handle support?
2) Do some topics always go to one person?
Then output:
8 to 12 category names.
One sentence definition per category.
3 example requests per category.
Summaries:
[Paste]`, howToUse: "1) Paste summaries.\n2) Run.\n3) Save the category list.", doneChecklist: "I have 8 to 12 categories with definitions and examples." }) },
          { id: "d2s2", label: "Urgency rules", prompt: recipeBlock({ title: "Urgency rules", goal: "Rules for low, medium, high urgency so everyone labels the same way.", whatToPaste: "Your category list and any existing rules.", exampleType: "generic", exampleContent: "High: urgent request. Medium: quote request. Low: general question.", copyPastePrompt: `Task: Create urgency rules.
Ask me these questions first.
1) What response time do you promise for high urgency?
2) What response time for medium and low?
Then output:
Definition of low, medium, high. One sentence each.
Which categories are usually high, medium, or low.
Examples for each level.
Categories:
[Paste]`, howToUse: "1) Run.\n2) Save the urgency rules.", doneChecklist: "Each urgency level has a definition and examples." }) },
          { id: "d2s3", label: "Escalation rules", prompt: recipeBlock({ title: "Escalation rules", goal: "When to escalate and who gets it.", whatToPaste: "Who handles billing, cancellations, legal, refunds, complaints.", exampleType: "generic", exampleContent: "Complaints to manager, technical to specialist, pricing to sales.", copyPastePrompt: `Task: Define escalation rules.
Ask me these questions first.
1) Which topics must never be answered without a manager?
2) Who handles billing, cancellations, legal, refunds?
Then output:
Escalation triggers. One sentence each.
Owner per trigger.
When to escalate within the same day.
Owners:
[Paste]`, howToUse: "1) Run.\n2) Save escalation rules.", doneChecklist: "I have escalation triggers and owners written down." }) },
        ],
      },
      {
        day: 3,
        title: "Approved answers starter",
        summary: "Find top questions, draft first answers, set do-not-answer list.",
        steps: [
          { id: "d3s1", label: "Find top questions", prompt: recipeBlock({ title: "Find top questions", goal: "Identify the top 15 questions customers ask.", whatToPaste: "30 request snippets or one-line summaries.", exampleType: "generic", exampleContent: "How much? When can you start? Do you do [X]? Claim or complaint.", copyPastePrompt: `Task: Identify top questions from my requests.
Output:
Top 15 questions with a rough count.
Group similar questions under one heading.
Snippets:
[Paste]`, howToUse: "1) Paste snippets.\n2) Run.\n3) Save the top 15 list.", doneChecklist: "I have the top 15 questions with counts." }) },
          { id: "d3s2", label: "Draft approved answers", prompt: recipeBlock({ title: "Draft approved answers", goal: "Write 10 to 15 answers in plain language you can reuse.", whatToPaste: "Policy notes or FAQ fragments.", exampleType: "generic", exampleContent: "Policy is [X]. We offer free consultations. Typical turnaround is 2 to 4 weeks.", copyPastePrompt: `Task: Draft approved answers from my notes.
Ask me these questions first.
1) What tone do you want, formal or friendly?
2) What must every answer avoid saying?
Then output 10 to 15 answers.
Rules: Plain language. Under 120 words each. One clear next step if needed.
Notes:
[Paste]`, howToUse: "1) Paste notes.\n2) Run.\n3) Save the approved answers.", doneChecklist: "I have 10 to 15 approved answers saved." }) },
          { id: "d3s3", label: "Do-not-answer list", prompt: recipeBlock({ title: "Do-not-answer list", goal: "Topics that require manual confirmation before replying.", whatToPaste: "Risk areas: pricing, legal, medical, safety, refunds.", exampleType: "generic", exampleContent: "Legal, disputes, scope questions, discount requests.", copyPastePrompt: `Task: Create a do-not-answer list.
Ask me these questions first.
1) What topics can get you in trouble if wrong?
2) Who must approve replies for those topics?
Then output:
A list of topics that require manual confirmation.
One sentence per topic.
What to say instead of answering: e.g. "I need to confirm and will follow up shortly."
Notes:
[Paste]`, howToUse: "1) Run.\n2) Save the list.", doneChecklist: "I have a do-not-answer list and a fallback phrase." }) },
        ],
      },
      {
        day: 4,
        title: "Draft replies with guardrails",
        summary: "Label requests, draft replies, review checklist.",
        steps: [
          { id: "d4s1", label: "Label one request", prompt: recipeBlock({ title: "Label one request", goal: "Turn one message into a clean label for your queue.", whatToPaste: "One customer message.", exampleType: "generic", exampleContent: "Issue described, need help this week.", copyPastePrompt: `Task: Label this support request.
Output format:
Category:
Urgency:
Sentiment: calm, frustrated, angry
What they need in one sentence:
Best next action:
Escalate yes or no:
Message:
[Paste]`, howToUse: "1) Paste one message.\n2) Run.\n3) Paste output into your queue.", doneChecklist: "Request is labeled with category, urgency, and next action." }) },
          { id: "d4s2", label: "Draft reply from approved answers", prompt: recipeBlock({ title: "Draft reply from approved answers", goal: "Draft one reply using only your approved answers.", whatToPaste: "The request and your approved answers.", exampleType: "generic", exampleContent: "Request: When can you start? Answers: We schedule within 1 week of signed agreement.", copyPastePrompt: `Task: Draft a reply using only my approved answers.
Rules:
Use only the Approved Answers below.
If not covered, say: "I need to confirm this and will follow up shortly." Then list what to look up.
Under 120 words. One clear next step.
Approved Answers:
[Paste]
Message:
[Paste]`, howToUse: "1) Paste answers and message.\n2) Run.\n3) Review and send.", doneChecklist: "Reply is drafted and uses only approved answers." }) },
          { id: "d4s3", label: "Reply review checklist", prompt: recipeBlock({ title: "Reply review checklist", goal: "A short checklist before sending any reply.", whatToPaste: "What matters most: tone, policy, accuracy.", exampleType: "generic", exampleContent: "Tone friendly, no same-day promise without checking, no discount without approval.", copyPastePrompt: `Task: Create a review checklist for replies.
Output:
A 7-point checklist before sending.
A red-flag list that means rewrite.
Notes:
[Paste]`, howToUse: "1) Save the checklist.\n2) Use before every send.", doneChecklist: "I have a review checklist." }) },
        ],
      },
      {
        day: 5,
        title: "Routing and daily routine",
        summary: "Assign owners, daily routine, test on live queue.",
        steps: [
          { id: "d5s1", label: "Routing map", prompt: recipeBlock({ title: "Routing map", goal: "Map each category to an owner so requests go to the right person.", whatToPaste: "Category list and team roles.", exampleType: "generic", exampleContent: "Type A to owner, Type B to specialist, Type C to office.", copyPastePrompt: `Task: Map categories to owners.
Ask me these questions first.
1) Who handles which topics today?
2) Any categories that need two people?
Then output a routing table:
Category, Owner, Backup if absent.
Categories:
[Paste]
Team:
[Paste]`, howToUse: "1) Run.\n2) Save the routing table.", doneChecklist: "Every category has an owner." }) },
          { id: "d5s2", label: "Daily queue routine", prompt: recipeBlock({ title: "Daily queue routine", goal: "A daily routine for triage, draft, review, send.", whatToPaste: "Available time blocks and who runs the queue.", exampleType: "generic", exampleContent: "9am check queue, 11am draft replies, 2pm review and send.", copyPastePrompt: `Task: Write a daily routine for the support queue.
Ask me these questions first.
1) How many requests per day do you get?
2) How much time can you spend on the queue each day?
Then output:
A 15-minute routine. Numbered steps.
A 30-minute routine. Numbered steps.
Details:
[Paste]`, howToUse: "1) Save the routine.\n2) Put it on your calendar.", doneChecklist: "I have a daily queue routine on my calendar." }) },
          { id: "d5s3", label: "Live test batch", prompt: recipeBlock({ title: "Live test batch", goal: "Run 10 today requests through label, draft, and owner.", whatToPaste: "10 new requests from today.", exampleType: "generic", exampleContent: "Paste 10 messages in Request 1, Request 2 format.", copyPastePrompt: `Task: Run a live test on today's queue.
For each request, output:
Label (category, urgency, sentiment).
Draft reply.
Owner.
Requests:
[Paste]`, howToUse: "1) Paste 10 requests.\n2) Run.\n3) Review drafts and send.", doneChecklist: "At least 5 requests got a reply today." }) },
        ],
      },
      {
        day: 6,
        title: "Escalations and digests",
        summary: "Aging rules, daily digest, escalation templates.",
        steps: [
          { id: "d6s1", label: "Aging rules", prompt: recipeBlock({ title: "Aging rules", goal: "When a request is considered aging or overdue.", whatToPaste: "Your response targets by urgency.", exampleType: "generic", exampleContent: "High: 4 hours. Medium: 1 day. Low: 3 days.", copyPastePrompt: `Task: Define aging rules.
Ask me these questions first.
1) What is your target response time for high, medium, low?
2) When do you escalate an aging request?
Then output:
Aging threshold per urgency. Example: High over 4 hours = aging.
What to do when a request is aging.
Targets:
[Paste]`, howToUse: "1) Save the aging rules.", doneChecklist: "I have aging thresholds written down." }) },
          { id: "d6s2", label: "Daily digest format", prompt: recipeBlock({ title: "Daily digest format", goal: "A short daily summary of urgent, aging, blocked, repeats.", whatToPaste: "What you want to see each morning.", exampleType: "generic", exampleContent: "Urgent open: 2. Aging: 3. Blocked: 1. Repeat issues: [topic].", copyPastePrompt: `Task: Create a daily digest format.
Output:
Sections: Urgent open, Aging open, Blocked, Repeat issues.
One line per section on how to fill it.
Under 100 words total.
Notes:
[Paste]`, howToUse: "1) Save the format.\n2) Use it each morning.", doneChecklist: "I have a daily digest format." }) },
          { id: "d6s3", label: "Escalation templates", prompt: recipeBlock({ title: "Escalation templates", goal: "Short internal messages when you escalate.", whatToPaste: "Owners and escalation triggers.", exampleType: "generic", exampleContent: "Escalate to manager: dispute. Escalate to specialist: scope question.", copyPastePrompt: `Task: Draft escalation message templates.
Output 3 internal templates:
Template A: Urgent escalation. Include: request summary, why urgent, who it goes to.
Template B: Aging escalation. Include: request, age, next action.
Template C: Blocked escalation. Include: what is blocked, who can unblock.
Owners:
[Paste]`, howToUse: "1) Save the 3 templates.", doneChecklist: "I have 3 escalation templates." }) },
        ],
      },
      {
        day: 7,
        title: "Trends and prevention",
        summary: "Weekly trends, prevention ideas, update answer library.",
        steps: [
          { id: "d7s1", label: "Weekly trends summary", prompt: recipeBlock({ title: "Weekly trends summary", goal: "Top 5 issues and what drove them this week.", whatToPaste: "Category counts and top issues.", exampleType: "generic", exampleContent: "Topic A: 12. Topic B: 8. Topic C: 5.", copyPastePrompt: `Task: Summarize weekly support trends.
Output:
Top 5 issues with counts.
What drove each one, one sentence.
Data:
[Paste]`, howToUse: "1) Paste data.\n2) Run.\n3) Save the summary.", doneChecklist: "I have a weekly trends summary." }) },
          { id: "d7s2", label: "Prevention ideas", prompt: recipeBlock({ title: "Prevention ideas", goal: "Top 3 fixes to reduce volume next week.", whatToPaste: "Top 5 issues from trends.", exampleType: "generic", exampleContent: "Add FAQ to website. Send booking link in first reply.", copyPastePrompt: `Task: Propose prevention fixes.
Input: Top 5 issues from this week.
Output: Top 3 fixes that could reduce volume next week. One sentence each. Simple and doable.
Issues:
[Paste]`, howToUse: "1) Run.\n2) Pick one fix to try.", doneChecklist: "I have 3 prevention ideas. One is on my list to try." }) },
          { id: "d7s3", label: "Update approved answers", prompt: recipeBlock({ title: "Update approved answers", goal: "Add 5 new answers for gaps found this week.", whatToPaste: "Gaps or questions that had no good answer.", exampleType: "generic", exampleContent: "No answer for topic X. No answer for payment options.", copyPastePrompt: `Task: Update my approved answers.
Input: Gaps found this week. Questions that had no good answer or wrong answer.
Output: 5 new approved answers. Plain language. Under 120 words each.
Gaps:
[Paste]`, howToUse: "1) Run.\n2) Add the 5 answers to your library.", doneChecklist: "I added 5 new approved answers." }) },
        ],
      },
    ],
  },
  plan3: {
    key: "plan3",
    name: "Meeting follow-up system",
    oneLiner: "Turn meetings into tasks, reminders, and follow-ups.",
    diyTime: "12 to 24 hours",
    diyCalendar: "2 to 4 weeks",
    diyNeeds: [
      "A consistent meeting notes format",
      "A task tracker the team uses",
      "10 examples of real meeting notes",
    ],
    diyRisks: [
      "Output quality depends on messy notes",
      "Owners and due dates get missed, tasks stall",
      "Follow-ups do not go out consistently",
    ],
    buildOutput: {
      title: "Implementation output:",
      bullets: [
        "System design plus rollout timeline",
        "Meeting notes converted into action items with owners and due dates",
        "Drafted follow-up emails in your voice, with approval before sending",
        "Reminders and overdue nudges to owners",
        "Missing-owner and missing-date detection",
        "Weekly execution summary plus stuck alerts",
        {
          label: "Quality assurance:",
          sub: [
            "Voice and tone guardrails for follow-ups",
            "Monitoring and exception handling for messy notes and ambiguous tasks",
            "Daily and weekly reporting on completion rates and overdue actions",
          ],
        },
      ],
    },
    diyStarterKit: {
      title: "DIY starter kit",
      howToUse: [],
      prompts: [
        {
          title: "Turn notes into actions",
          prompt: `Convert these meeting notes into action items.
Output format
Decisions:
Action items:
Task:
Owner:
Due date:
Next step:
Risks or blockers:
Questions to clarify:
Notes
[Paste meeting notes here]`,
        },
        {
          title: "Draft the follow-up email",
          prompt: `Write a follow-up email using the action items below.
Keep it short.
Start with a 1-sentence summary.
Then list action items with owner and due date.
End with one clear next step for the group.
Action items
[Paste action items here]`,
        },
        {
          title: "Identify stuck actions and draft nudges",
          prompt: `From this list of action items, find:
Anything missing an owner
Anything missing a due date
Anything overdue
Then draft a short nudge message for each owner.
Action list
[Paste action items list here]`,
        },
      ],
    },
    days: [
      {
        day: 1,
        title: "Prep and set up",
        summary: "Pick meeting type, collect note examples, define action tracker fields.",
        steps: [
          { id: "d1s1", label: "Pick meeting type", prompt: recipeBlock({ title: "Pick meeting type", goal: "Choose one meeting type to turn into clear actions and follow-ups.", whatToPaste: "List of meeting types and pain points.", exampleType: "generic", exampleContent: "Project kickoff, review meeting, team check-in. Pain: we forget who does what.", copyPastePrompt: `Task: Pick one meeting type to start.
Ask me these questions first.
1) What meeting types do you run most?
2) What goes wrong after these meetings?
3) What would success look like in 2 weeks?
Then output: One meeting type to start. Why this one. Success criteria in 3 bullets.
Notes:
[Paste]`, howToUse: "1) Paste prompt. Fill notes.\n2) Run. Save the choice and criteria.", doneChecklist: "I have one meeting type and success criteria." }) },
          { id: "d1s2", label: "Collect note examples", prompt: recipeBlock({ title: "Collect note examples", goal: "Gather 5 to 10 real notes and see what to fix.", whatToPaste: "5 to 10 meeting notes.", exampleType: "generic", exampleContent: "Meeting with Client X. Decided start Monday. Sam to order supplies. No due date.", copyPastePrompt: `Task: Review my meeting note examples.
Output:
Note quality issues. What is missing or unclear.
Fixes. One sentence per fix.
Notes:
[Paste]`, howToUse: "1) Paste 5 to 10 notes.\n2) Run. Save the list of fixes.", doneChecklist: "I have note quality issues and fixes." }) },
          { id: "d1s3", label: "Define action tracker fields", prompt: recipeBlock({ title: "Define action tracker fields", goal: "Decide what fields your action tracker has.", whatToPaste: "How you track tasks today.", exampleType: "generic", exampleContent: "We use a list. Task, who, when. Sometimes we forget status.", copyPastePrompt: `Task: Define my action tracker fields.
Ask me these questions first.
1) What must every action have? Owner? Due date?
2) What statuses do you want? Draft, In progress, Done?
Then output: Exactly 6 to 8 fields. Required vs optional. One sentence each.
Notes:
[Paste]`, howToUse: "1) Run. Build your tracker with these fields.", doneChecklist: "My tracker has 6 to 8 fields defined." }) },
        ],
      },
      {
        day: 2,
        title: "Standardize notes",
        summary: "Create notes template, action quality rules, definition of done.",
        steps: [
          { id: "d2s1", label: "Create notes template", prompt: recipeBlock({ title: "Create notes template", goal: "One template so every meeting has the same sections.", whatToPaste: "Your meeting type and what you want from notes.", exampleType: "generic", exampleContent: "Project meeting. Need: recap, decisions, action items, owner, due date.", copyPastePrompt: `Task: Create a notes template.
Output: Sections in order: Recap, Decisions, Action items (task, owner, due date), Risks or blockers.
One line per section on what to fill in.
Details:
[Paste]`, howToUse: "1) Run. Save the template. Use it for the next meeting.", doneChecklist: "I have a notes template with recap, decisions, actions, risks." }) },
          { id: "d2s2", label: "Action quality rules", prompt: recipeBlock({ title: "Action quality rules", goal: "Rules for good vs weak actions so owners and dates are clear.", whatToPaste: "Examples of good and weak actions.", exampleType: "generic", exampleContent: "Good: Send report by Friday, Jane. Weak: Someone will send the report.", copyPastePrompt: `Task: Write action quality rules.
Output: Required fields for every action. Examples of good vs weak. Max 5 rules.
Notes:
[Paste]`, howToUse: "1) Run. Save the rules. Use when writing actions.", doneChecklist: "I have action quality rules." }) },
          { id: "d2s3", label: "Definition of done", prompt: recipeBlock({ title: "Definition of done", goal: "What done means for common task types.", whatToPaste: "Common task types from your meetings.", exampleType: "generic", exampleContent: "Send deliverable, schedule follow-up, order supplies, complete task.", copyPastePrompt: `Task: Define done for my task types.
Output: One sentence per task type. What done looks like.
Tasks:
[Paste]`, howToUse: "1) Run. Save the definitions.", doneChecklist: "I have a definition of done for my task types." }) },
        ],
      },
      {
        day: 3,
        title: "Extract actions",
        summary: "Extract decisions and actions, fill missing owners and dates, post-meeting checklist.",
        steps: [
          { id: "d3s1", label: "Extract decisions and actions", prompt: recipeBlock({ title: "Extract decisions and actions", goal: "Turn raw notes into decisions and action items.", whatToPaste: "One set of meeting notes.", exampleType: "generic", exampleContent: "Paste notes from one meeting. Include recap, decisions, who does what.", copyPastePrompt: `Task: Extract decisions and actions.
Output format:
Decisions:
Action items: Task, Owner, Due date, Next step.
Risks or blockers:
Notes:
[Paste]`, howToUse: "1) Paste notes.\n2) Run. Paste output into your tracker.", doneChecklist: "Decisions and actions are extracted." }) },
          { id: "d3s2", label: "Fill missing owners and dates", prompt: recipeBlock({ title: "Fill missing owners and dates", goal: "Find actions missing owner or due date and get questions to fix them.", whatToPaste: "Extracted action list.", exampleType: "generic", exampleContent: "Order supplies. Schedule review. Call client. Some have no owner or date.", copyPastePrompt: `Task: Detect missing owner or due date.
For each action output: Missing? Owner, date, or both. Suggested question to ask the team.
Actions:
[Paste]`, howToUse: "1) Paste actions.\n2) Run. Fill in missing fields.", doneChecklist: "Every action has an owner and due date." }) },
          { id: "d3s3", label: "Post-meeting checklist", prompt: recipeBlock({ title: "Post-meeting checklist", goal: "A short checklist you run right after every meeting.", whatToPaste: "What you do today after a meeting.", exampleType: "generic", exampleContent: "Send notes, add tasks, notify team. Sometimes we forget.", copyPastePrompt: `Task: Write a post-meeting checklist.
Output: 7 steps. Under 10 minutes total. Numbered.
Notes:
[Paste]`, howToUse: "1) Run. Save the checklist. Use after every meeting.", doneChecklist: "I have a post-meeting checklist." }) },
        ],
      },
      {
        day: 4,
        title: "Draft follow-up",
        summary: "Draft follow-up message, tone check, send checklist.",
        steps: [
          { id: "d4s1", label: "Draft follow-up message", prompt: recipeBlock({ title: "Draft follow-up message", goal: "One clear follow-up email within 24 hours.", whatToPaste: "Action items with owners and due dates.", exampleType: "generic", exampleContent: "Decisions: Start Monday. Actions: Jane to send draft by Wed. Team to schedule.", copyPastePrompt: `Task: Draft a follow-up email.
Rules: Start with 1-sentence recap. List actions with owner and due date. End with one next step. Under 150 words.
Actions:
[Paste]`, howToUse: "1) Paste actions.\n2) Run. Review and send.", doneChecklist: "Follow-up is drafted and sent." }) },
          { id: "d4s2", label: "Tone check", prompt: recipeBlock({ title: "Tone check", goal: "Make the draft clear and firm, no fluff.", whatToPaste: "Your draft follow-up email.", exampleType: "generic", exampleContent: "Paste the draft you wrote. Check for clarity and tone.", copyPastePrompt: `Task: Check tone of this follow-up.
Output: Edits for clarity and firmness. No fluff. Keep it short.
Draft:
[Paste]`, howToUse: "1) Paste draft.\n2) Run. Apply edits.", doneChecklist: "Tone is clear and firm." }) },
          { id: "d4s3", label: "Send checklist", prompt: recipeBlock({ title: "Send checklist", goal: "Accuracy checks before sending the follow-up.", whatToPaste: "What often goes wrong when you send.", exampleType: "generic", exampleContent: "Wrong due date, missing owner, typo in name.", copyPastePrompt: `Task: Create a send checklist for follow-ups.
Output: 5 to 7 checks. Names correct, dates correct, everyone copied.
Notes:
[Paste]`, howToUse: "1) Run. Save checklist. Use before every send.", doneChecklist: "I have a send checklist." }) },
        ],
      },
      {
        day: 5,
        title: "Reminders",
        summary: "Reminder schedule, reminder templates, escalation rule.",
        steps: [
          { id: "d5s1", label: "Reminder schedule", prompt: recipeBlock({ title: "Reminder schedule", goal: "When to send reminders before and after due date.", whatToPaste: "Typical due dates and how far out you plan.", exampleType: "generic", exampleContent: "Most tasks due in 1 week. We want a reminder 2 days before and the day of.", copyPastePrompt: `Task: Create a reminder schedule.
Ask me these questions first.
1) How far in advance do you want the first reminder?
2) Do you remind on the due date? When overdue?
Then output: Reminder timing rules. One sentence per rule.
Notes:
[Paste]`, howToUse: "1) Run. Save the schedule.", doneChecklist: "I have reminder timing rules." }) },
          { id: "d5s2", label: "Reminder templates", prompt: recipeBlock({ title: "Reminder templates", goal: "Three short templates: upcoming, due today, overdue.", whatToPaste: "Your tone and what you want to say.", exampleType: "generic", exampleContent: "Friendly but clear. Include task and due date. One line.", copyPastePrompt: `Task: Draft 3 reminder templates.
Template A: Upcoming (e.g. 2 days before).
Template B: Due today.
Template C: Overdue.
Rules: Under 50 words each. One clear next step.
Notes:
[Paste]`, howToUse: "1) Run. Save the 3 templates.", doneChecklist: "I have 3 reminder templates." }) },
          { id: "d5s3", label: "Escalation rule", prompt: recipeBlock({ title: "Escalation rule", goal: "When to escalate overdue work and to whom.", whatToPaste: "Team roles and who handles stuck work.", exampleType: "generic", exampleContent: "If overdue 2 days, tell the project lead. If 5 days, tell the owner.", copyPastePrompt: `Task: Define escalation for overdue work.
Ask me these questions first.
1) How many days overdue before you escalate?
2) Who do you escalate to?
Then output: Escalation rule. One sentence. Who gets notified.
Team:
[Paste]`, howToUse: "1) Run. Save the rule.", doneChecklist: "I have an escalation rule." }) },
        ],
      },
      {
        day: 6,
        title: "Stuck detection",
        summary: "Define stuck, create stuck list, draft nudges.",
        steps: [
          { id: "d6s1", label: "Define stuck", prompt: recipeBlock({ title: "Define stuck", goal: "When an action is stuck: missing fields, overdue, no progress.", whatToPaste: "Your typical task life cycle.", exampleType: "generic", exampleContent: "No owner, no date, or overdue more than 3 days with no update.", copyPastePrompt: `Task: Define stuck for my action items.
Output: Rules. Missing owner = stuck. Missing due date = stuck. Overdue X days = stuck. No progress = stuck.
Notes:
[Paste]`, howToUse: "1) Run. Save the stuck definition.", doneChecklist: "I know when an action is stuck." }) },
          { id: "d6s2", label: "Create stuck list", prompt: recipeBlock({ title: "Create stuck list", goal: "List stuck items and next action for each.", whatToPaste: "Action rows with status and dates.", exampleType: "generic", exampleContent: "Job, Task, Owner, Due date, Status. Paste 20 rows.", copyPastePrompt: `Task: Create a stuck list.
Output: Which items are stuck. Why. Next action per item.
Rows:
[Paste]`, howToUse: "1) Paste rows.\n2) Run. Update tracker and follow up.", doneChecklist: "I have a stuck list with next actions." }) },
          { id: "d6s3", label: "Draft nudges", prompt: recipeBlock({ title: "Draft nudges", goal: "One short nudge per owner for their stuck items.", whatToPaste: "Stuck items with owners.", exampleType: "generic", exampleContent: "Jane: 2 overdue. Tom: 1 missing date.", copyPastePrompt: `Task: Draft nudge messages.
One short nudge per owner. Under 40 words. Polite. One next step.
Items:
[Paste]`, howToUse: "1) Paste items.\n2) Run. Review and send.", doneChecklist: "Nudges are drafted and sent." }) },
        ],
      },
      {
        day: 7,
        title: "Weekly execution summary",
        summary: "Weekly summary template, root cause list, improve weak action items.",
        steps: [
          { id: "d7s1", label: "Weekly summary template", prompt: recipeBlock({ title: "Weekly summary template", goal: "One weekly update: completed, overdue, stuck, risks.", whatToPaste: "This week's action data.", exampleType: "generic", exampleContent: "Completed: 8. Overdue: 2. Stuck: 1. Risks: [blocker].", copyPastePrompt: `Task: Create a weekly execution summary template.
Output: Sections: Completed, Overdue, Stuck, Risks, Decisions needed. One line each on how to fill.
Data:
[Paste]`, howToUse: "1) Run. Save template. Fill it each week.", doneChecklist: "I have a weekly summary template." }) },
          { id: "d7s2", label: "Root cause list", prompt: recipeBlock({ title: "Root cause list", goal: "Top 3 causes of overdue and stuck and what to fix.", whatToPaste: "Overdue and stuck items from this week.", exampleType: "generic", exampleContent: "No owner assigned. Due date too tight. No reminder sent.", copyPastePrompt: `Task: Identify root causes.
Input: Overdue and stuck items.
Output: Top 3 causes. One fix per cause.
Items:
[Paste]`, howToUse: "1) Paste items.\n2) Run. Pick one fix to try.", doneChecklist: "I have root causes and fixes." }) },
          { id: "d7s3", label: "Improve weak action items", prompt: recipeBlock({ title: "Improve weak action items", goal: "Rewrite weak actions with clear owners and dates.", whatToPaste: "10 weak action items.", exampleType: "generic", exampleContent: "Someone to do X. Get it done. Follow up. (No owner or date.)", copyPastePrompt: `Task: Improve these action items.
Output: Rewritten version of each. Clear owner. Clear due date. One sentence.
Actions:
[Paste]`, howToUse: "1) Paste 10 weak actions.\n2) Run. Update your tracker.", doneChecklist: "Weak actions are rewritten." }) },
        ],
      },
    ],
  },
  plan4: {
    key: "plan4",
    name: "Weekly visibility system",
    oneLiner: "Collect updates automatically and send one weekly brief.",
    diyTime: "18 to 36 hours",
    diyCalendar: "3 to 6 weeks",
    diyNeeds: [
      "A weekly brief template (doc or email format)",
      "Access to where work is tracked (tasks, docs, sheets)",
      "One person to review the brief before it goes out",
    ],
    diyRisks: [
      "Inputs are incomplete, brief loses trust",
      "Blockers are missed, leaders get surprised",
      "The brief becomes noise, then stops getting read",
    ],
    buildOutput: {
      title: "Implementation output:",
      bullets: [
        "System design plus rollout timeline",
        "Automated weekly brief generation from your existing sources",
        "Risk and blocker flags with clear callouts",
        "Scheduled delivery to email or team chat",
        "Weekly trends summary and high-risk item list",
        "Review and approval step so leadership trusts the output",
        {
          label: "Quality assurance:",
          sub: [
            "Consistent formatting and tone, every week",
            "Monitoring and exception handling for missing or stale source data",
            "Weekly reporting on coverage, risks, and response patterns",
          ],
        },
      ],
    },
    diyStarterKit: {
      title: "DIY starter kit",
      howToUse: [],
      prompts: [
        {
          title: "Summarize updates into a weekly brief",
          prompt: `Turn the updates below into a weekly brief in this exact format.
Format
Wins:
Priorities:
Blockers:
Key numbers:
Help needed:
Updates
[Paste raw updates from tasks, messages, or docs]`,
        },
        {
          title: "Flag blockers and risks",
          prompt: `Review the weekly brief below.
Flag anything that sounds like a blocker or a risk.
For each one, write:
What is blocked
Why it is blocked
What decision or help is needed
Weekly brief
[Paste brief here]`,
        },
        {
          title: "Draft the message to leadership",
          prompt: `Write the final weekly update message to leadership.
Keep it under 200 words.
Make it easy to skim.
End with "Decisions needed" as a bullet list if any exist.
Weekly brief
[Paste brief here]`,
        },
      ],
    },
    days: [
      {
        day: 1,
        title: "Prep and set up",
        summary: "Pick team and scope, pick two sources, gather last week inputs.",
        steps: [
          { id: "d1s1", label: "Pick team and scope", prompt: recipeBlock({ title: "Pick team and scope", goal: "Choose one team and clear scope for the weekly brief.", whatToPaste: "List of teams and reporting pain.", exampleType: "generic", exampleContent: "Team or area. Pain: leader does not know status until Friday.", copyPastePrompt: `Task: Pick one team and scope.
Ask me these questions first.
1) Which team or area needs a weekly brief?
2) Who reads it and what do they need to know?
3) What goes wrong today when they do not get updates?
Then output: One team. Scope boundaries. Success in one sentence.
Notes:
[Paste]`, howToUse: "1) Paste prompt. Fill notes.\n2) Run. Save scope.", doneChecklist: "I have one team and scope." }) },
          { id: "d1s2", label: "Pick two sources", prompt: recipeBlock({ title: "Pick two sources", goal: "Choose two places you will pull updates from.", whatToPaste: "Where work is tracked today.", exampleType: "generic", exampleContent: "Task list, messages, voicemails.", copyPastePrompt: `Task: Pick two update sources.
Ask me these questions first.
1) Where is work tracked or reported today?
2) What fields matter most, dates, status, owner?
Then output: Two sources. What to copy from each. What fields matter.
Notes:
[Paste]`, howToUse: "1) Run. Save the two sources and fields.", doneChecklist: "I have two sources and know what to copy." }) },
          { id: "d1s3", label: "Gather last week inputs", prompt: recipeBlock({ title: "Gather last week inputs", goal: "Pull raw updates from last week into one place.", whatToPaste: "Raw updates from your two sources.", exampleType: "generic", exampleContent: "Project A on track. Project B waiting on [X]. Project C done.", copyPastePrompt: `Task: Clean last week's raw updates.
Output: One list. One line per item. Source, date, summary. Sorted by priority or date.
Updates:
[Paste]`, howToUse: "1) Paste updates.\n2) Run. Save the cleaned list.", doneChecklist: "I have last week's inputs in one list." }) },
        ],
      },
      {
        day: 2,
        title: "Brief template",
        summary: "Create brief template, pick 5 metrics, assign section owners.",
        steps: [
          { id: "d2s1", label: "Create brief template", prompt: recipeBlock({ title: "Create brief template", goal: "One format leaders can read fast.", whatToPaste: "What you want in the brief.", exampleType: "generic", exampleContent: "Wins, Priorities, Blockers, Key numbers, Help needed.", copyPastePrompt: `Task: Create a weekly brief template.
Output: Sections in order. One line each on what to fill. Under 200 words total.
Format idea: Wins, Priorities, Blockers, Key numbers, Help needed.
Notes:
[Paste]`, howToUse: "1) Run. Save the template.", doneChecklist: "I have a brief template." }) },
          { id: "d2s2", label: "Pick 5 metrics", prompt: recipeBlock({ title: "Pick 5 metrics", goal: "Five numbers or metrics leaders watch weekly.", whatToPaste: "What leaders watch or ask about.", exampleType: "generic", exampleContent: "Jobs closed, revenue, backlog, overdue, lead count.", copyPastePrompt: `Task: Pick 5 metrics for the brief.
Ask me these questions first.
1) What numbers do leaders ask about every week?
2) Where do those numbers come from?
Then output: 5 metrics. Definition each. Source each.
Notes:
[Paste]`, howToUse: "1) Run. Save the 5 metrics.", doneChecklist: "I have 5 metrics with definitions and sources." }) },
          { id: "d2s3", label: "Assign section owners", prompt: recipeBlock({ title: "Assign section owners", goal: "Who fills each section and by when.", whatToPaste: "Team roles.", exampleType: "generic", exampleContent: "Jane does wins. Tom does blockers. All by Thursday noon.", copyPastePrompt: `Task: Assign section owners.
Output: Section, Owner, Due day and time for updates.
Team:
[Paste]`, howToUse: "1) Run. Save the owner list.", doneChecklist: "Every section has an owner and due time." }) },
        ],
      },
      {
        day: 3,
        title: "Summaries",
        summary: "Summarize updates, identify missing info, tighten wording.",
        steps: [
          { id: "d3s1", label: "Summarize updates", prompt: recipeBlock({ title: "Summarize updates", goal: "Turn raw updates into the brief template.", whatToPaste: "Raw updates from this week.", exampleType: "generic", exampleContent: "Paste 10 to 15 raw lines from job board or messages.", copyPastePrompt: `Task: Summarize updates into the brief template.
Output: Fill each section. Concise. Skimmable. Use the section names from my template.
Updates:
[Paste]`, howToUse: "1) Paste updates.\n2) Run. Save the draft brief.", doneChecklist: "Draft brief is filled." }) },
          { id: "d3s2", label: "Identify missing info", prompt: recipeBlock({ title: "Identify missing info", goal: "Find what is missing so you can ask for it.", whatToPaste: "Draft brief.", exampleType: "generic", exampleContent: "Paste the draft. Some sections thin or vague.", copyPastePrompt: `Task: Identify missing info in this draft brief.
Output: Missing details per section. Questions to ask the team.
Draft:
[Paste]`, howToUse: "1) Paste draft.\n2) Run. Ask owners for missing info.", doneChecklist: "I have a list of missing info and questions." }) },
          { id: "d3s3", label: "Tighten wording", prompt: recipeBlock({ title: "Tighten wording", goal: "Shorten the draft so it is easy to skim.", whatToPaste: "Draft brief.", exampleType: "generic", exampleContent: "Paste the draft. Cut fluff and repeat.", copyPastePrompt: `Task: Tighten the wording.
Output: Same content. Shorter. Under 180 words. Easy to skim.
Draft:
[Paste]`, howToUse: "1) Paste draft.\n2) Run. Replace with tightened version.", doneChecklist: "Brief is under 180 words." }) },
        ],
      },
      {
        day: 4,
        title: "Blockers and risks",
        summary: "Flag blockers, flag risks, slipping date check.",
        steps: [
          { id: "d4s1", label: "Flag blockers", prompt: recipeBlock({ title: "Flag blockers", goal: "List what is blocked and what help is needed.", whatToPaste: "Draft brief.", exampleType: "generic", exampleContent: "Paste brief. Look for stuck items, waiting on, cannot proceed.", copyPastePrompt: `Task: Flag blockers in this brief.
Output per blocker: What is blocked. Why. What help or decision is needed.
Brief:
[Paste]`, howToUse: "1) Paste brief.\n2) Run. Add blockers section.", doneChecklist: "Blockers are listed with help needed." }) },
          { id: "d4s2", label: "Flag risks", prompt: recipeBlock({ title: "Flag risks", goal: "List risks with impact and next action.", whatToPaste: "Draft brief.", exampleType: "generic", exampleContent: "Paste brief. Look for at risk, might slip, dependency.", copyPastePrompt: `Task: Flag risks in this brief.
Output per risk: Impact. Likelihood. Next action.
Brief:
[Paste]`, howToUse: "1) Paste brief.\n2) Run. Add risks section.", doneChecklist: "Risks are listed with next action." }) },
          { id: "d4s3", label: "Slipping date check", prompt: recipeBlock({ title: "Slipping date check", goal: "Find priorities at risk of slipping.", whatToPaste: "Priorities list with dates.", exampleType: "generic", exampleContent: "Project A by 5th. Project B by 12th. Deliverable by 15th.", copyPastePrompt: `Task: Detect slipping dates.
Output: Items at risk. Why. Suggested fix or escalation.
List:
[Paste]`, howToUse: "1) Paste list.\n2) Run. Follow up on at-risk items.", doneChecklist: "I have a slipping-date list." }) },
        ],
      },
      {
        day: 5,
        title: "Review and send",
        summary: "Review checklist, final send message, weekly schedule.",
        steps: [
          { id: "d5s1", label: "Review checklist", prompt: recipeBlock({ title: "Review checklist", goal: "Checks before you send the brief.", whatToPaste: "What often goes wrong.", exampleType: "generic", exampleContent: "Wrong name, old date, missing section, typo.", copyPastePrompt: `Task: Create a review checklist for the brief.
Output: 7 checks. Accuracy and clarity. Names, dates, sections.
Notes:
[Paste]`, howToUse: "1) Run. Save checklist. Use before every send.", doneChecklist: "I have a review checklist." }) },
          { id: "d5s2", label: "Final send message", prompt: recipeBlock({ title: "Final send message", goal: "Message to paste into email or team chat.", whatToPaste: "Final brief.", exampleType: "generic", exampleContent: "Paste the brief. Need a short subject and clean body.", copyPastePrompt: `Task: Draft the send message.
Same content as the brief. Clean format for email or chat. Under 200 words. Easy to skim.
Brief:
[Paste]`, howToUse: "1) Paste brief.\n2) Run. Copy into email or chat.", doneChecklist: "Send message is drafted and sent." }) },
          { id: "d5s3", label: "Weekly schedule", prompt: recipeBlock({ title: "Weekly schedule", goal: "When inputs are due and when the brief goes out.", whatToPaste: "Preferred day and time.", exampleType: "generic", exampleContent: "Inputs by Thursday noon. Brief out by Friday 9am.", copyPastePrompt: `Task: Set the weekly schedule.
Ask me these questions first.
1) What day and time should the brief go out?
2) How many days before do you need inputs?
Then output: Cadence. Input deadline. Send deadline. Who sends.
Details:
[Paste]`, howToUse: "1) Run. Put on calendar.", doneChecklist: "I have a weekly schedule." }) },
        ],
      },
      {
        day: 6,
        title: "Trends and decisions",
        summary: "Add trends, decisions needed, decision log format.",
        steps: [
          { id: "d6s1", label: "Add trends", prompt: recipeBlock({ title: "Add trends", goal: "Up, down, or flat for key metrics.", whatToPaste: "This week and last week metrics.", exampleType: "generic", exampleContent: "Jobs: 12 vs 10. Revenue: up. Backlog: flat.", copyPastePrompt: `Task: Add a trends section.
Output: One line per metric. Up, down, or flat. One sentence why if useful.
Metrics:
[Paste]`, howToUse: "1) Paste metrics.\n2) Run. Add trends to brief.", doneChecklist: "I have a trends section." }) },
          { id: "d6s2", label: "Decisions needed", prompt: recipeBlock({ title: "Decisions needed", goal: "Top 5 decisions with owner and deadline.", whatToPaste: "Brief and blockers.", exampleType: "generic", exampleContent: "Paste brief. Pull out decisions that need a yes or no.", copyPastePrompt: `Task: List decisions needed.
Output: Top 5. Decision, Owner, Deadline.
Brief:
[Paste]`, howToUse: "1) Paste brief.\n2) Run. Add decisions section.", doneChecklist: "Decisions needed are listed." }) },
          { id: "d6s3", label: "Decision log format", prompt: recipeBlock({ title: "Decision log format", goal: "How to record decisions and outcomes.", whatToPaste: "How you track decisions today.", exampleType: "generic", exampleContent: "We decide in meetings. No log. Need a simple format.", copyPastePrompt: `Task: Create a decision log format.
Output: Fields to record. Decision, Date, Owner, Outcome. One line each.
Notes:
[Paste]`, howToUse: "1) Run. Save the format.", doneChecklist: "I have a decision log format." }) },
        ],
      },
      {
        day: 7,
        title: "Lock the cadence",
        summary: "Weekly checklist, feedback question set, template improvements.",
        steps: [
          { id: "d7s1", label: "Weekly checklist", prompt: recipeBlock({ title: "Weekly checklist", goal: "Steps from gather to send with owner and deadline.", whatToPaste: "Your current process.", exampleType: "generic", exampleContent: "Gather Monday. Draft Tuesday. Review Wednesday. Send Thursday.", copyPastePrompt: `Task: Create a weekly brief checklist.
Output: Numbered steps. Gather, draft, review, send. Owner and deadline per step.
Notes:
[Paste]`, howToUse: "1) Run. Save checklist. Use every week.", doneChecklist: "I have a weekly checklist." }) },
          { id: "d7s2", label: "Feedback question set", prompt: recipeBlock({ title: "Feedback question set", goal: "3 questions to ask leaders after 2 weeks.", whatToPaste: "What you want to learn.", exampleType: "generic", exampleContent: "Is this useful? What is missing? What should change?", copyPastePrompt: `Task: Create feedback questions.
Output: 3 questions. Short. Easy to answer. What works, what does not, what to change.
Notes:
[Paste]`, howToUse: "1) Run. Save questions. Send after 2 weeks.", doneChecklist: "I have 3 feedback questions." }) },
          { id: "d7s3", label: "Template improvements", prompt: recipeBlock({ title: "Template improvements", goal: "Top 3 changes to try based on feedback.", whatToPaste: "Feedback and pain points.", exampleType: "generic", exampleContent: "Too long. Missing job codes. Need earlier send.", copyPastePrompt: `Task: Suggest template improvements.
Input: Feedback and pain points.
Output: Top 3 changes to try. Simple and doable.
Feedback:
[Paste]`, howToUse: "1) Paste feedback.\n2) Run. Pick one change to try.", doneChecklist: "I have 3 improvement ideas." }) },
        ],
      },
    ],
  },
  plan5: {
    key: "plan5",
    name: "Handoff tracker system",
    oneLiner: "Track owners and due dates, reduce handoff delays.",
    diyTime: "10 to 22 hours",
    diyCalendar: "2 to 4 weeks",
    diyNeeds: [
      "A shared tracker for the handoff (task tool or sheet)",
      "Clear stages, owners, and definition of done",
      "10 examples of past handoffs",
    ],
    diyRisks: [
      "Missing context causes rework and back-and-forth",
      "Ownership is unclear, work stalls",
      "Escalations become noisy, people ignore them",
    ],
    buildOutput: {
      title: "Implementation output:",
      bullets: [
        "System design plus rollout timeline",
        "Automated task creation and routing across steps",
        "Generated handoff notes with required context, with approval before sending",
        "Missing-info checks before a handoff completes",
        "Escalations for overdue steps and blocked stages",
        "Weekly bottleneck report with root cause categories",
        {
          label: "Quality assurance:",
          sub: [
            "Guardrails to enforce required fields and clean handoffs",
            "Monitoring and exception handling for edge cases and stage drift",
            "Daily and weekly reporting on cycle time, overdue steps, and bottlenecks",
          ],
        },
      ],
    },
    diyStarterKit: {
      title: "DIY starter kit",
      howToUse: [],
      prompts: [
        {
          title: "Generate a handoff note",
          prompt: `Write a clear handoff note using the details below.
Keep it short.
Use bullets.
Include: context, what's done, what's next, owner, due date, and links.
Details
[Paste tracker fields here]`,
        },
        {
          title: "Check for missing info",
          prompt: `Check this handoff note for missing info.
List what is missing or unclear.
Then ask the 3 most important questions to complete the handoff.
Handoff note
[Paste note here]`,
        },
        {
          title: "Find bottlenecks from tracker data",
          prompt: `Review this list of items and tell me:
Which stage is slowing work down the most
The top 3 reasons work is getting stuck
What rule or checklist would prevent it next week
Tracker list
[Paste rows with stage, owner, age, due date]`,
        },
      ],
    },
    days: [
      {
        day: 1,
        title: "Prep and set up",
        summary: "Pick the handoff, collect examples, define stages and owners.",
        steps: [
          { id: "d1s1", label: "Pick the handoff", prompt: recipeBlock({ title: "Pick the handoff", goal: "Choose one handoff to fix first and how you will measure success.", whatToPaste: "List of handoffs and where delays happen.", exampleType: "generic", exampleContent: "Step 1 to Step 2. Delays: missing specs, wrong owner.", copyPastePrompt: `Task: Pick one handoff to fix first.
Ask me these questions first.
1) What handoffs happen most often?
2) Where do delays or rework happen?
3) What would success look like in 2 weeks?
Then output: One handoff. Success measure. Why this one first.
Notes:
[Paste]`, howToUse: "1) Paste prompt. Fill notes.\n2) Run. Save the choice.", doneChecklist: "I have one handoff and a success measure." }) },
          { id: "d1s2", label: "Collect examples", prompt: recipeBlock({ title: "Collect examples", goal: "Gather 10 past handoffs and see what is missing or causes rework.", whatToPaste: "10 past handoff notes or threads.", exampleType: "generic", exampleContent: "Paste 10 notes. Some have no address, no materials list, wrong date.", copyPastePrompt: `Task: Analyze my handoff examples.
Output: Common missing info. Rework triggers. One sentence each.
Examples:
[Paste]`, howToUse: "1) Paste 10 examples.\n2) Run. Save the list.", doneChecklist: "I have common missing info and rework triggers." }) },
          { id: "d1s3", label: "Define stages and owners", prompt: recipeBlock({ title: "Define stages and owners", goal: "List stages, owner per stage, and definition of done per stage.", whatToPaste: "How the handoff flows today.", exampleType: "generic", exampleContent: "Step 1 done, send to next owner, they schedule, task done.", copyPastePrompt: `Task: Define stages and owners.
Ask me these questions first.
1) What are the steps from start to done?
2) Who owns each step?
3) What does done mean for each step?
Then output: Stage list. Owner per stage. Definition of done per stage.
Flow:
[Paste]`, howToUse: "1) Run. Save the stage list.", doneChecklist: "I have stages, owners, and definition of done." }) },
        ],
      },
      {
        day: 2,
        title: "Required info and rules",
        summary: "Required fields list, due date rules, valid handoff checklist.",
        steps: [
          { id: "d2s1", label: "Required fields list", prompt: recipeBlock({ title: "Required fields list", goal: "Fields that must be filled before a handoff is valid.", whatToPaste: "Handoff examples and issues from Day 1.", exampleType: "generic", exampleContent: "Project name, key details, due date, owner. Often missing details.", copyPastePrompt: `Task: Define required fields.
Output: List of required fields. One sentence definition each. Why required.
Notes:
[Paste]`, howToUse: "1) Run. Save the list. Use when building your tracker.", doneChecklist: "I have a required fields list." }) },
          { id: "d2s2", label: "Due date rules", prompt: recipeBlock({ title: "Due date rules", goal: "Due date expectations per stage so everyone knows when work is late.", whatToPaste: "Typical cycle times per stage.", exampleType: "generic", exampleContent: "Review: 2 days. Next step: 1 day. Complete: 5 days.", copyPastePrompt: `Task: Define due date rules per stage.
Ask me these questions first.
1) How long should each stage take?
2) When do you consider a stage overdue?
Then output: Expected time per stage. Overdue threshold per stage.
Timing:
[Paste]`, howToUse: "1) Run. Save the rules.", doneChecklist: "I have due date rules per stage." }) },
          { id: "d2s3", label: "Valid handoff checklist", prompt: recipeBlock({ title: "Valid handoff checklist", goal: "A short checklist so a handoff is complete before it moves on.", whatToPaste: "Required fields list.", exampleType: "generic", exampleContent: "All required fields filled. Owner assigned. Due date set. Links included.", copyPastePrompt: `Task: Create a valid handoff checklist.
Output: Under 10 items. Each item is a yes/no check. Use my required fields.
Fields:
[Paste]`, howToUse: "1) Run. Save the checklist. Use before every handoff.", doneChecklist: "I have a valid handoff checklist." }) },
        ],
      },
      {
        day: 3,
        title: "Handoff notes",
        summary: "Generate handoff note, missing info check, standardize format.",
        steps: [
          { id: "d3s1", label: "Generate handoff note", prompt: recipeBlock({ title: "Generate handoff note", goal: "One clear note from tracker fields: context, done, next, owner, date.", whatToPaste: "Tracker fields for one item.", exampleType: "generic", exampleContent: "Project: Client X. Stage: step 1 done. Next: schedule. Owner: Jane.", copyPastePrompt: `Task: Generate a handoff note.
Output: Short note. Bullets. Context, what is done, what is next, owner, due date, links if any.
Fields:
[Paste]`, howToUse: "1) Paste fields.\n2) Run. Use the note for the handoff.", doneChecklist: "Handoff note is generated." }) },
          { id: "d3s2", label: "Missing info check", prompt: recipeBlock({ title: "Missing info check", goal: "Find what is missing and get the top 3 questions to complete the handoff.", whatToPaste: "A handoff note.", exampleType: "generic", exampleContent: "Paste a note. Check for missing details, date, or owner.", copyPastePrompt: `Task: Check for missing info.
Output: Missing items. Top 3 questions to complete the handoff.
Note:
[Paste]`, howToUse: "1) Paste note.\n2) Run. Ask the questions before sending.", doneChecklist: "Missing info is listed. I asked the 3 questions." }) },
          { id: "d3s3", label: "Standardize format", prompt: recipeBlock({ title: "Standardize format", goal: "One standard format so every handoff note looks the same.", whatToPaste: "5 handoff notes.", exampleType: "generic", exampleContent: "Paste 5 notes in different styles. Need one format.", copyPastePrompt: `Task: Standardize handoff note format.
Output: One standard format. Section names and order. Then rewrite my 5 notes in that format.
Notes:
[Paste]`, howToUse: "1) Paste 5 notes.\n2) Run. Save the format and use it.", doneChecklist: "I have a standard format and rewritten notes." }) },
        ],
      },
      {
        day: 4,
        title: "Next step routing",
        summary: "Next step rules, notification messages, end-to-end test.",
        steps: [
          { id: "d4s1", label: "Next step rules", prompt: recipeBlock({ title: "Next step rules", goal: "For each stage: what triggers the next stage and who owns it.", whatToPaste: "Stages list.", exampleType: "generic", exampleContent: "After sign-off, go to next step. Owner: Jane.", copyPastePrompt: `Task: Define next step rules.
Output: Per stage: What triggers next. Who owns the next stage.
Stages:
[Paste]`, howToUse: "1) Run. Save the rules.", doneChecklist: "I have next step rules." }) },
          { id: "d4s2", label: "Notification messages", prompt: recipeBlock({ title: "Notification messages", goal: "Short internal messages when work moves to the next owner.", whatToPaste: "Owner list and stage types.", exampleType: "generic", exampleContent: "New item for you. Project X, details and attachments. Due Friday.", copyPastePrompt: `Task: Draft 3 notification templates.
Template A: New item handed to you. Include: what it is, due date, link if any.
Template B: Reminder: item waiting. Include: item, due date.
Template C: Item overdue. Include: item, stage, action needed.
Owners:
[Paste]`, howToUse: "1) Run. Save the 3 templates.", doneChecklist: "I have 3 notification templates." }) },
          { id: "d4s3", label: "End-to-end test", prompt: recipeBlock({ title: "End-to-end test", goal: "Run one sample item through all stages and find what breaks.", whatToPaste: "One sample item and its path through stages.", exampleType: "generic", exampleContent: "One item. Move from step 1 to step 2 to complete.", copyPastePrompt: `Task: Run an end-to-end test.
Input: One sample item moving through stages.
Output: What breaks. What is missing. What to fix. Numbered list.
Sample:
[Paste]`, howToUse: "1) Paste sample.\n2) Run. Fix the gaps.", doneChecklist: "I ran a test and fixed gaps." }) },
        ],
      },
      {
        day: 5,
        title: "Escalations",
        summary: "Overdue definitions, escalation templates, noise control.",
        steps: [
          { id: "d5s1", label: "Overdue definitions", prompt: recipeBlock({ title: "Overdue definitions", goal: "When each stage is overdue and who gets escalated to.", whatToPaste: "Due date rules from Day 2.", exampleType: "generic", exampleContent: "Stage 1: 2 days. Overdue: 3 days. Escalate to owner.", copyPastePrompt: `Task: Define overdue per stage.
Output: Overdue threshold per stage. Escalation order. Who gets notified first, then next.
Rules:
[Paste]`, howToUse: "1) Run. Save the overdue definition.", doneChecklist: "I have overdue thresholds and escalation order." }) },
          { id: "d5s2", label: "Escalation templates", prompt: recipeBlock({ title: "Escalation templates", goal: "Three templates: first nudge, second nudge, manager escalation.", whatToPaste: "Your tone and who gets escalated.", exampleType: "generic", exampleContent: "Friendly first. Firmer second. Manager copy on third.", copyPastePrompt: `Task: Draft 3 escalation templates.
Template A: First nudge. Under 40 words. Polite.
Template B: Second nudge. Under 40 words. Clear deadline.
Template C: Manager escalation. What is stuck. How long. What is needed.
Notes:
[Paste]`, howToUse: "1) Run. Save the 3 templates.", doneChecklist: "I have 3 escalation templates." }) },
          { id: "d5s3", label: "Noise control", prompt: recipeBlock({ title: "Noise control", goal: "Rules so escalations do not become spam.", whatToPaste: "Your escalation plan.", exampleType: "generic", exampleContent: "Max 2 nudges per item per day. No weekends. Batch at 9am.", copyPastePrompt: `Task: Reduce escalation noise.
Output: Rules. Max messages per item per day. Quiet hours if any. Batching. Limits.
Plan:
[Paste]`, howToUse: "1) Run. Save the rules.", doneChecklist: "I have noise control rules." }) },
        ],
      },
      {
        day: 6,
        title: "Bottleneck report",
        summary: "Bottleneck metrics, root cause categories, weekly report draft.",
        steps: [
          { id: "d6s1", label: "Bottleneck metrics", prompt: recipeBlock({ title: "Bottleneck metrics", goal: "Metrics that show where work stalls: time in stage, overdue count.", whatToPaste: "Stages list.", exampleType: "generic", exampleContent: "Time in stage. Overdue count per stage. Rework count.", copyPastePrompt: `Task: Define bottleneck metrics.
Output: 3 to 5 metrics. Definition each. How to count each. Example: time in stage, overdue count, rework count.
Stages:
[Paste]`, howToUse: "1) Run. Save the metrics. Track them weekly.", doneChecklist: "I have bottleneck metrics defined." }) },
          { id: "d6s2", label: "Root cause categories", prompt: recipeBlock({ title: "Root cause categories", goal: "Categories for why work gets stuck so you can fix patterns.", whatToPaste: "Examples of why work stalled.", exampleType: "generic", exampleContent: "Waiting on customer. Missing info. Wrong owner. Capacity.", copyPastePrompt: `Task: Create root cause categories.
Output: 6 to 10 categories. One sentence definition each. One example each.
Notes:
[Paste]`, howToUse: "1) Run. Save the categories.", doneChecklist: "I have root cause categories." }) },
          { id: "d6s3", label: "Weekly report draft", prompt: recipeBlock({ title: "Weekly report draft", goal: "One short report: slow stage, why, top fixes.", whatToPaste: "Stage metrics and examples from this week.", exampleType: "generic", exampleContent: "Review stage: 5 days avg. Top cause: waiting on client. Fix: reminder template.", copyPastePrompt: `Task: Draft the weekly bottleneck report.
Output: Slowest stage. Why. Top 3 root causes. Top 3 fixes to try. Under 150 words.
Data:
[Paste]`, howToUse: "1) Paste data.\n2) Run. Save and share the report.", doneChecklist: "I have a weekly report draft." }) },
        ],
      },
      {
        day: 7,
        title: "Lock the process",
        summary: "Weekly cleanup routine, change control rules, team training script.",
        steps: [
          { id: "d7s1", label: "Weekly cleanup routine", prompt: recipeBlock({ title: "Weekly cleanup routine", goal: "Steps to keep the tracker and handoffs clean every week.", whatToPaste: "What gets messy or stale.", exampleType: "generic", exampleContent: "Old items not closed. Wrong status. Duplicate entries.", copyPastePrompt: `Task: Write a weekly cleanup routine.
Output: 10 steps. Clear owner. Cadence (e.g. every Friday). Numbered.
Notes:
[Paste]`, howToUse: "1) Run. Save the routine. Put it on the calendar.", doneChecklist: "I have a weekly cleanup routine." }) },
          { id: "d7s2", label: "Change control rules", prompt: recipeBlock({ title: "Change control rules", goal: "Who can change stages and required fields so the process stays stable.", whatToPaste: "Who edits the process today.", exampleType: "generic", exampleContent: "Only lead can add stages. Required fields need manager sign-off to change.", copyPastePrompt: `Task: Create change control rules.
Ask me these questions first.
1) Who can add or change stages?
2) Who can change required fields?
Then output: Rules for updating the process safely. Who approves what.
Team:
[Paste]`, howToUse: "1) Run. Save the rules.", doneChecklist: "I have change control rules." }) },
          { id: "d7s3", label: "Team training script", prompt: recipeBlock({ title: "Team training script", goal: "A short script and checklist so everyone follows the process.", whatToPaste: "What new people need to know.", exampleType: "generic", exampleContent: "How to fill handoff note. When to escalate. Where to find the checklist.", copyPastePrompt: `Task: Create a 10-minute training script.
Output: Script. Numbered steps. What to show. What to say. Plus a 5-item compliance checklist.
Notes:
[Paste]`, howToUse: "1) Run. Save the script. Use for new team members.", doneChecklist: "I have a training script and checklist." }) },
        ],
      },
    ],
  },
};
