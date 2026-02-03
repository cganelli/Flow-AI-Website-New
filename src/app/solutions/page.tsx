import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "AI Solutions for Real Business Problems | Flow AI",
  description: "See how AI removes manual work and helps your staff move faster with solutions for lead follow-up, invoicing, client onboarding, and support automation.",
  keywords: [
    "AI solutions",
    "business AI",
    "AI automation",
    "lead follow up",
    "client invoicing",
    "client onboarding",
    "support automation",
    "Flow AI solutions"
  ],
  alternates: {
    canonical: "https://thisisflowai.com/solutions/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SolutionsPage = () => {
  const solutions = [
    {
      id: "appointment-setting",
      title: "Appointment Setting",
      problem: "Scheduling appointments involves lots of back and forth, and you miss opportunities when responses are slow.",
      whatThisLooksLike: [
        "Clients book appointments instantly through your calendar",
        "Automated confirmations and reminders reduce no-shows",
        "Your team sees a clear view of the day's schedule"
      ],
      whatWeSetUp: [
        "Calendar integrations and booking workflows",
        "AI helpers that handle scheduling requests and confirmations",
        "Automated reminders and follow-ups for appointments"
      ],
      goodFitIf: [
        "You schedule appointments regularly but it's time-consuming",
        "You want faster booking without constant email back and forth",
        "You use calendars or scheduling tools for appointments"
      ]
    },
    {
      id: "automated-marketing",
      title: "Automated Marketing",
      problem: "Creating and sending marketing content takes too much time, and campaigns feel inconsistent.",
      whatThisLooksLike: [
        "Marketing emails and social posts draft automatically from your content",
        "Campaigns send on schedule without manual work each week",
        "You see simple reports on what content performs best"
      ],
      whatWeSetUp: [
        "Content templates and workflows for your marketing channels",
        "AI helpers that draft posts and emails your team reviews",
        "Automated scheduling and delivery across your marketing tools"
      ],
      goodFitIf: [
        "You create regular marketing content but it's time-consuming",
        "You want more consistent campaigns without hiring more staff",
        "You use email, social media, or other marketing platforms"
      ]
    },
    {
      id: "client-invoicing",
      title: "Client invoicing and payments",
      problem: "Late payments create cash flow gaps and you spend too much time chasing invoices manually.",
      whatThisLooksLike: [
        "Invoices send automatically on your schedule without manual work",
        "Clients get smart reminders before payments slip through the cracks",
        "You see a clear view of high-risk or overdue accounts that need attention"
      ],
      whatWeSetUp: [
        "Automated invoice scheduling and delivery",
        "Smart payment reminders and nudges based on client behavior",
        "Dashboard flags for accounts that need human intervention"
      ],
      goodFitIf: [
        "You send invoices regularly but tracking payments is manual",
        "Late payments create cash flow stress",
        "You want to reduce time spent on payment follow-up"
      ]
    },
    {
      id: "client-onboarding",
      title: "Client onboarding and handoff",
      problem: "Bringing new clients on involves lots of back and forth, manual data entry, and coordination across tools.",
      whatThisLooksLike: [
        "Intake forms feed directly into your CRM and project tools",
        "Welcome emails and next steps draft automatically for your review",
        "Owners and account managers see status snapshots without asking"
      ],
      whatWeSetUp: [
        "Intake forms that connect to your existing tools",
        "AI helpers that draft welcome communications and onboarding steps",
        "Status dashboards so the team knows where each client is in the process"
      ],
      goodFitIf: [
        "You bring on new clients regularly but onboarding feels chaotic",
        "You use multiple tools and data gets entered manually in each",
        "You want smoother handoffs between sales, onboarding, and account management"
      ]
    },
    {
      id: "support-faq",
      title: "Customer Support and FAQ automation",
      problem: "Your team answers the same questions repeatedly, taking time away from complex issues that need human attention.",
      whatThisLooksLike: [
        "Common questions get answered instantly across chat and email",
        "Clear rules escalate complex issues to your team automatically",
        "You see logs of what people ask most so you can improve your content"
      ],
      whatWeSetUp: [
        "AI answers for standard questions in chat and email",
        "Escalation rules that route complex issues to the right person",
        "Analytics so you see question patterns and gaps in your content"
      ],
      goodFitIf: [
        "You get repetitive questions that take staff time",
        "You want faster response times for common inquiries",
        "You need humans available for edge cases and complex problems"
      ]
    },
    {
      id: "data-entry-processing",
      title: "Data Entry and Processing",
      problem: "Your team spends hours entering the same data into multiple systems or processing repetitive information.",
      whatThisLooksLike: [
        "Data flows automatically between your tools without manual entry",
        "Forms and documents process and organize information instantly",
        "Your team focuses on analysis and decisions instead of data entry"
      ],
      whatWeSetUp: [
        "Connections between your forms, databases, and business tools",
        "AI helpers that extract and organize data from documents",
        "Automated workflows that route information to the right places"
      ],
      goodFitIf: [
        "You enter the same data in multiple places manually",
        "You process forms, invoices, or documents regularly",
        "You want to reduce time spent on repetitive data tasks"
      ]
    },
    {
      id: "financial-reporting",
      title: "Financial Reporting",
      problem: "Creating financial reports and summaries takes hours each week, and stakeholders need updates frequently.",
      whatThisLooksLike: [
        "Financial summaries generate automatically from your accounting data",
        "Reports send to stakeholders on schedule without manual work",
        "You see clear views of revenue, expenses, and cash flow trends"
      ],
      whatWeSetUp: [
        "Connections to your accounting and financial tools",
        "AI helpers that draft financial summaries and reports",
        "Automated report generation and delivery workflows"
      ],
      goodFitIf: [
        "You create financial reports regularly but it's time-consuming",
        "You need to share financial updates with stakeholders frequently",
        "You use accounting software or spreadsheets for financial data"
      ]
    },
    {
      id: "feedback-collection",
      title: "Feedback Collection",
      problem: "Collecting and organizing feedback from clients or customers is manual and important insights get lost.",
      whatThisLooksLike: [
        "Feedback requests send automatically after key interactions",
        "Responses organize and summarize so you see patterns quickly",
        "You get alerts when feedback needs immediate attention"
      ],
      whatWeSetUp: [
        "Automated feedback request workflows",
        "AI helpers that organize and summarize feedback responses",
        "Dashboards and reports that highlight key insights and trends"
      ],
      goodFitIf: [
        "You collect feedback but it's hard to organize and act on",
        "You want to gather insights without manual survey management",
        "You need to track customer satisfaction or client feedback regularly"
      ]
    },
    {
      id: "lead-follow-up",
      title: "Lead follow up and sales pipeline",
      problem: "Leads come in from different places and your team struggles to follow up fast and consistently.",
      whatThisLooksLike: [
        "New leads receive a clear, on brand response within minutes",
        "Sales staff see one simple view of who to follow up with today",
        "Owners see a simple summary of leads and next steps each week"
      ],
      whatWeSetUp: [
        "Lead capture flows that connect forms, CRM, and notifications",
        "AI helpers that draft replies and follow ups your staff review and send",
        "Light reporting so you see response times and follow up rates"
      ],
      goodFitIf: [
        "You already get leads but follow up feels random",
        "You use spreadsheets, a CRM, or a mix of tools to track deals",
        "You want faster response times without hiring more staff"
      ]
    },
    {
      id: "performance-tracking",
      title: "Performance Tracking",
      problem: "Tracking team performance, goals, and metrics across different tools makes it hard to see what's working.",
      whatThisLooksLike: [
        "One dashboard shows key metrics and performance trends",
        "Automated reports highlight wins and areas that need attention",
        "Team members see their progress without constant check-ins"
      ],
      whatWeSetUp: [
        "Dashboards that pull data from your existing tools",
        "AI helpers that analyze trends and draft performance summaries",
        "Automated reporting workflows for team and leadership"
      ],
      goodFitIf: [
        "You track performance metrics but it's scattered across tools",
        "You want better visibility into what's working and what's not",
        "You need regular performance updates for your team or leadership"
      ]
    },
    {
      id: "project-management",
      title: "Project Management",
      problem: "Tracking projects, deadlines, and team tasks across multiple tools creates confusion and missed deadlines.",
      whatThisLooksLike: [
        "One clear view of all projects, deadlines, and who's responsible",
        "Automated status updates so stakeholders know progress without asking",
        "Smart alerts when projects are at risk or need attention"
      ],
      whatWeSetUp: [
        "Project dashboards that pull data from your existing tools",
        "AI helpers that draft status updates and task assignments",
        "Automated notifications and reminders for key milestones"
      ],
      goodFitIf: [
        "You manage multiple projects with different deadlines",
        "You use spreadsheets, project tools, or a mix to track work",
        "You want better visibility into project status without constant check-ins"
      ]
    },
    {
      id: "social-media-management",
      title: "Social Media Management",
      problem: "Creating and posting social content consistently takes time, and you struggle to keep up with multiple platforms.",
      whatThisLooksLike: [
        "Social posts draft automatically from your content and ideas",
        "Content schedules and posts across your platforms",
        "You see simple analytics on what content performs best"
      ],
      whatWeSetUp: [
        "Content templates and workflows for your social platforms",
        "AI helpers that draft posts your team reviews and approves",
        "Automated scheduling and posting across your social accounts"
      ],
      goodFitIf: [
        "You post on social media but struggle with consistency",
        "You want to maintain a presence without daily manual work",
        "You use multiple social platforms for your business"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main" className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">
                AI solutions for real business problems
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                See how AI removes manual work and helps your staff move faster with solutions designed for real workflows.
              </p>
            </div>
          </div>
        </section>

        {/* If AI Can Do All of THIS Section */}
        <section className="py-16 bg-black text-white" aria-labelledby="ai-capabilities-heading">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 id="ai-capabilities-heading" className="heading-xl mb-4 text-center text-white">
                If AI can do all of THIS
              </h2>
              <p className="text-xl text-gray-300 mb-12 text-center italic">
                (imagine what it could do for YOUR company)
              </p>

              {/* Grid of Business Functions */}
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" aria-label="AI solution categories">
                <li>
                  <a
                    href="#appointment-setting"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Appointment Setting solution"
                  >
                    <span className="text-white font-medium">Appointment Setting</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#automated-marketing"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Automated Marketing solution"
                  >
                    <span className="text-white font-medium">Automated Marketing</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#client-invoicing"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Client Invoicing solution"
                  >
                    <span className="text-white font-medium">Client Invoicing</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#client-onboarding"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Client Onboarding solution"
                  >
                    <span className="text-white font-medium">Client Onboarding</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#support-faq"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Customer Support solution"
                  >
                    <span className="text-white font-medium">Customer Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#data-entry-processing"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Data Entry and Processing solution"
                  >
                    <span className="text-white font-medium">Data Entry and Processing</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#feedback-collection"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Feedback Collection solution"
                  >
                    <span className="text-white font-medium">Feedback Collection</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#financial-reporting"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Financial Reporting solution"
                  >
                    <span className="text-white font-medium">Financial Reporting</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#lead-follow-up"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Lead follow up and sales pipeline solution"
                  >
                    <span className="text-white font-medium">Lead Generation</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#performance-tracking"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Performance Tracking solution"
                  >
                    <span className="text-white font-medium">Performance Tracking</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#project-management"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Project Management solution"
                  >
                    <span className="text-white font-medium">Project Management</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#social-media-management"
                    className="bg-black border border-white/20 rounded-lg p-6 text-center hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black block"
                    aria-label="Social Media Management solution"
                  >
                    <span className="text-white font-medium">Social Media Management</span>
                  </a>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="/contact"
                  className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Learn what AI can do for you"
                >
                  Learn What AI Can Do For You
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Sections */}
        <section className="py-10 bg-background" aria-labelledby="solutions-list-heading">
          <div className="container-custom">
            <div className="max-w-7xl mx-auto">
              <h2 id="solutions-list-heading" className="sr-only">
                Detailed AI Solutions
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
              {solutions.map((solution, index) => (
                <section
                  key={solution.id}
                  id={solution.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm scroll-mt-20 h-full"
                >
                  {/* Left accent bar */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#EA3D2A]" />

                  {/* Header band */}
                  <div className="flex items-center gap-4 bg-[#131212] px-6 py-5 pl-8">
                    {/* Icon circle */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EA3D2A] bg-[#131212]">
                      <svg
                        viewBox="0 0 64 64"
                        aria-hidden="true"
                        className="h-7 w-7 text-[#EA3D2A]"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="14" y="16" width="36" height="26" rx="3" />
                          <line x1="14" y1="24" x2="50" y2="24" />
                          <path d="M26 30h12" />
                        </g>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base md:text-lg font-bold uppercase tracking-[0.16em] text-[#EA3D2A]">
                        Solution
                      </span>
                      <h3 className="text-lg font-semibold leading-snug text-white">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-neutral-300">{solution.problem}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 pb-6 pt-6 flex flex-col flex-grow">
                    <div className="grid gap-8 md:grid-cols-2 md:gap-10 flex-grow">
                      {/* Left column: Good fit if + What we set up */}
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800 mb-3">
                            Good fit if
                          </h4>
                          <ul className="mt-3 space-y-1 text-sm text-neutral-900" aria-label="Good fit if">
                            {solution.goodFitIf.map((item) => (
                              <li key={`${solution.title}-fit-${item}`} className="flex gap-2">
                                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800 mb-3">
                            What we set up
                          </h4>
                          <ul className="mt-3 space-y-1 text-sm text-neutral-900" aria-label="What we set up">
                            {solution.whatWeSetUp.map((item) => (
                              <li key={`${solution.title}-setup-${item}`} className="flex gap-2">
                                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right column: What this looks like */}
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800 mb-3">
                            What this looks like in your business
                          </h4>
                          <ul className="mt-3 space-y-1 text-sm text-neutral-900" aria-label="What this looks like in your business">
                            {solution.whatThisLooksLike.map((item) => (
                              <li key={`${solution.title}-looks-${item}`} className="flex gap-2">
                                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 flex items-center justify-center">
                      <a
                        href="/contact"
                        className="btn-primary bg-[#EA3D2A] hover:bg-[#EA3D2A]/90 text-white focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2"
                        aria-label={`Learn more about ${solution.title}`}
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </section>
              ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionsPage;

