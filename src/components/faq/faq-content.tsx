"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  examples?: string[];
  category?: string;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-ai-automation",
    question: "What is AI automation, and why should I care?",
    answer: "AI automation streamlines operations by taking over repetitive, manual tasks—such as lead follow-ups, scheduling, reminders, and data organization. It improves accuracy, reduces overhead, and allows your team to focus on strategic, revenue-driving work.",
    category: "basics"
  },
  {
    id: "save-time-grow-business",
    question: "How can AI save me time and grow my business?",
    answer: "AI helps when it removes repeatable work from your plate and supports people on more complex work. This means more billable time, fewer delays, and fewer errors—without adding headcount.",
    category: "benefits"
  },
  {
    id: "real-world-examples",
    question: "What are some real-world ways AI can help?",
    answer: "AI helps when it takes repeatable work off your plate and supports people on more complex work.\n\nExamples:\n\n– Lead follow up sequences and reminders\n– Invoicing and payment nudges to reduce late payments\n– Drafting summaries, emails, and updates from long inputs\n– Support answers for common questions with clear rules for handoff to humans\n– Simple reporting and status snapshots for owners and managers\n\nWe map these to your tools and processes during the audit. See the Solutions page for detailed examples.",
    examples: [],
    category: "examples"
  },
  {
    id: "what-agency-does",
    question: "What does Flow AI actually do?",
    answer: "Flow AI helps businesses use AI on real work.\n\nWe do this in three ways:\n\n– AI solutions\nDesign and setup of targeted solutions such as lead follow up, client invoicing, onboarding, and support.\n\n– AI projects\nShort \"Scale Sprint\" projects where we Frame, Forge, Field test, and Formalize one high value workflow into a working AI system.\n\n– AI training\nLive workshops for beginners, everyday work, and leaders so staff know how to use AI in a safe, practical way.\n\nWe also provide a free starter kit and resource library so you do not start from a blank page.",
    category: "process"
  },
  {
    id: "automation-cost",
    question: "How much does AI consulting cost?",
    answer: "Pricing depends on scope and whether you start with training, a focused project, or both.\n\nIn broad terms:\n\n– Training is priced per session based on length and group size.\n– AI projects such as the Scale Sprint are scoped to one workflow, with a fixed project fee once we define the work.\n– The free audit and free starter kit stay free.\n\nWe discuss budget on the audit call so you know which options fit your stage and resources before you commit.",
    category: "pricing"
  },
  {
    id: "why-flow-ai",
    question: "Why work with Flow AI?",
    answer: "Businesses work with Flow AI when they want AI that fits real work, not hype.\n\nKey reasons:\n\n– More than 20 years in digital product, marketing, and technology\n– Training and resources built from real workflows, not theory\n– Guardrails baked in so leaders stay in control\n– Focus on tools you already use, not a new platform to manage\n– Clear handoff with training, SOP updates, and simple documentation\n\nThe goal is adoption that sticks, not experiments that fade after a few weeks.",
    category: "company"
  },
  {
    id: "automation-leads-customers",
    question: "Can AI help me get more leads or customers?",
    answer: "Yes. AI systems engage leads instantly, send reminders, and personalize outreach. This ensures prospects stay engaged and reduces lost opportunities.",
    category: "benefits"
  },
  {
    id: "replace-team-employees",
    question: "Will this replace my team?",
    answer: "No. AI augments your team by handling repetitive tasks. Employees gain time for strategic, creative, and client-facing work. It's about scaling human impact, not replacing people.",
    category: "basics"
  },
  {
    id: "setup-time",
    question: "How long does setup take?",
    answer: "Most projects are implemented in 1-2 weeks. Larger initiatives may take longer, but we minimize disruption by managing the entire process.",
    category: "process"
  },
  {
    id: "special-software",
    question: "Do I need to buy new software?",
    answer: "No. We integrate with the tools you already use—Google Workspace, Salesforce, QuickBooks, CRMs, and more. When new tools are required, we recommend options that fit your workflow and budget.",
    category: "technical"
  },
  {
    id: "support-problems",
    question: "What if something goes wrong?",
    answer: "We provide ongoing support and monitoring. If you need updates or fixes, our team is your partner in keeping systems running—without adding IT overhead.",
    category: "support"
  },
  {
    id: "customer-service-automation",
    question: "Can AI improve customer service?",
    answer: "Yes. AI can automate confirmations, updates, FAQs, surveys, and follow-ups—improving response time, consistency, and client satisfaction.",
    category: "benefits"
  },
  {
    id: "data-security",
    question: "Is AI automation secure?",
    answer: "Yes. We follow enterprise-grade security practices and use trusted platforms. Your data is protected under the same standards global corporations rely on.",
    category: "security"
  },
  {
    id: "training-ai-experience-level",
    question: "What level of AI experience do teams need?",
    answer: "None. We work with beginners through experienced staff, founders, and managers. Sessions start from plain language explanations of AI and large language models. From there, examples and exercises use your tools and workflows, so beginners and early adopters both stay engaged.",
    category: "training"
  },
  {
    id: "training-session-length",
    question: "How long is each training session?",
    answer: "Core tracks run 90–120 minutes. That includes a short intro, live demos, guided exercises, and Q&A on your real work. Advanced workshops run 2–3 hours, with more time for mapping automation ideas and building a simple plan.",
    category: "training"
  },
  {
    id: "training-customization",
    question: "Do you customize the training for our company?",
    answer: "Yes. Before each session, your team completes a short intake form on roles, tools, and workflows. You send sample emails, documents, or processes. The session then uses those examples, not generic screenshots.",
    category: "training"
  },
  {
    id: "training-virtual-onsite",
    question: "Do you offer virtual and on-site training?",
    answer: "Yes. Sessions run live on Zoom or your preferred platform, or on-site at your office when travel logistics work. The format section on this page shows typical options.",
    category: "training"
  },
  {
    id: "training-group-sizes",
    question: "What group sizes work best?",
    answer: "Core tracks work well for 5–40 people per session. Larger groups split into several sessions or tracks, for example by role or department. Small groups of 5–12 suit leadership and strategy sessions.",
    category: "training"
  },
  {
    id: "training-audience",
    question: "Who is the training for: small businesses or corporate teams?",
    answer: "Both, and solo founders. Small business tracks focus on day-to-day workflows for owners and lean teams. Corporate tracks focus on departments with 10–100 staff, leaders under pressure to show AI progress, and teams that need clear guardrails. Sessions are designed around each company's tools and examples.",
    category: "training"
  },
  {
    id: "training-preparation",
    question: "What should participants do to prepare?",
    answer: "Before the session, participants:",
    examples: [
      "Complete a short intake form",
      "Gather 2–3 examples of recent work, such as emails, reports, or recurring tasks",
      "Bring access to the AI tool their company approves, such as ChatGPT, Gemini, or Copilot"
    ],
    category: "training"
  },
  {
    id: "training-follow-up",
    question: "What follow-up do we receive after training?",
    answer: "After each session, your team receives:",
    examples: [
      "A summary email with links and key examples",
      "Prompt templates or worksheets for reuse",
      "A short list of \"next three AI wins\" tailored to your team"
    ],
    category: "training"
  },
  {
    id: "training-data-privacy",
    question: "How do you handle data privacy and security?",
    answer: "Training uses safe, de-identified examples where needed. Guidance aligns with your company's AI and data policies. During planning, you share which tools are approved, what data must stay out of prompts, and any legal or compliance requirements.",
    category: "training"
  },
  {
    id: "training-recordings",
    question: "Are sessions recorded?",
    answer: "If your internal policy allows recording, sessions record to your company account so you keep full control of the file. The recording supports new hires, refresher viewing, and internal sharing. Recordings complement the starter kit and follow-up resources we provide.",
    category: "training"
  },
  {
    id: "training-30-day-outcomes",
    question: "What outcomes should we expect in the first 30 days?",
    answer: "Typical outcomes include:",
    examples: [
      "One simple AI workflow per attendee that saves time each week",
      "A shared baseline of AI knowledge across the team",
      "Clear guardrails for safe, responsible use of AI at work",
      "A short list of workflows to automate next"
    ],
    category: "training"
  },
  // New FAQs for General section
  {
    id: "starter-kit-contents",
    question: "What is in the free AI starter kit?",
    answer: "The starter kit gives you a guided path so your business gets real value from AI in the next few weeks.\n\nInside the starter kit you receive:\n\nIntro lessons\n\n– Lesson 1: Ship your first AI win in under 60 minutes\n– Lesson 2: Prompt basics so you get clearer, more useful answers\n– Lesson 3: How to spot wrong answers and handle hallucinations\n\nTemplates and prompts\n\n– Email and message helper prompts for faster replies that still sound like you\n– Meeting notes and recap templates so each meeting ends with clear decisions\n– Executive summary starter prompts so staff turn long documents into clear one pagers\n– Slide outline prompts that turn rough ideas into a first draft deck\n– A simple \"idea to draft\" workflow that walks people from notes to a usable draft\n\nGuardrails for safe use\n\n– Plain rules for what staff should not paste into AI tools\n– Guidance for handling confidential and regulated information\n– A short review checklist before anyone sends AI written work to clients or leadership\n– Tone and brand checks so output still sounds like your company\n– When a human decision is required and AI stays in a support role",
    category: "general"
  },
  {
    id: "free-audit-process",
    question: "What happens in the free AI audit?",
    answer: "The free AI audit is a 20 to 30 minute call focused on your specific workflows and tools.\n\nWe do three things on that call:\n\n1. Workflow and tools review\n\nWe walk through two or three core workflows, such as lead follow up, invoicing, reporting, support, or content.\n\nWe note where time is lost, where work stalls, and which tools you already use.\n\n2. AI opportunity list\n\nWe highlight steps in those workflows that suit AI agents or automation.\n\nWe rank opportunities by effort and impact so you leave with a clear first move.\n\nWe flag quick wins for the next few weeks and larger projects to park for later.\n\n3. 30 day action outline\n\nWe pick one or two moves for the next 30 days that match your capacity.\n\nWe suggest training or starter resources for your staff based on their current level.\n\nWe recommend simple metrics to track so you see if the first AI moves help.\n\nThere is no obligation to start a project after the audit. You leave with a clear view of your options.",
    category: "general"
  },
  {
    id: "ai-solutions-types",
    question: "What types of AI solutions do you set up?",
    answer: "Flow AI focuses on AI solutions that remove manual work and support staff, not replace them.\n\nCommon examples include:\n\n– Lead follow up and sales pipeline support\n– Client invoicing and payment reminders\n– Client onboarding and handoff between teams\n– Reporting and simple executive summaries\n– Support and FAQ automation with clear handoff to humans\n\nOn the Solutions page you see details for each of these. During an audit we match these patterns to your business and tools.",
    category: "general"
  },
  {
    id: "good-fit-for",
    question: "Who is Flow AI a good fit for?",
    answer: "Flow AI works with:\n\n– Founders and solo operators who feel buried in admin work\n– Small and mid sized companies that want to grow without adding headcount\n– Corporate leaders who want their teams to use AI in a safe and structured way\n\nBest fits:\n\n– You already have revenue and clear offers.\n– You have manual work in sales, operations, finance, or client delivery.\n– You want staff to work with AI in a responsible way, not chase hype.",
    category: "general"
  },
  {
    id: "starter-kit-training-projects-fit",
    question: "How do the starter kit, training, and AI projects fit together?",
    answer: "They serve different stages.\n\nThe starter kit is for exploration.\n\nIt gives you lessons, prompts, and guardrails so you and your staff start using AI on daily work with low risk.\n\nTraining is for adoption.\n\nLive sessions show your staff how to use AI on real tasks in your business and give them clear next steps for the first 30 days.\n\nAI projects and the Scale Sprint are for systems.\n\nWe pick one workflow, design and build AI agents and automations inside your tools, test with real data, then formalize with SOPs and training.\n\nMany businesses start with the starter kit, book training, then move into a focused project once they see where the biggest gains sit.",
    category: "general"
  },
  {
    id: "training-scheduling",
    question: "How far in advance do we need to schedule?",
    answer: "For virtual sessions, two to four weeks' notice keeps planning smooth. On-site sessions need more time for travel planning and logistics. If you have a fixed event date, share it in the first message so dates stay aligned.",
    category: "training"
  }
];

export default function FAQContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(faqData);

  // Filter FAQs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFAQs(faqData);
    } else {
      const filtered = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (faq.examples && faq.examples.some(example =>
          example.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
      setFilteredFAQs(filtered);
    }
  }, [searchTerm]);

  // Track search analytics
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      Analytics.trackEvent({
        action: 'faq_search',
        category: 'engagement',
        label: term.toLowerCase(),
        custom_parameters: {
          search_term: term,
          results_count: filteredFAQs.length,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  // Toggle FAQ item expansion
  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
      Analytics.trackEvent({
        action: 'faq_collapsed',
        category: 'engagement',
        label: faqId
      });
    } else {
      newExpanded.add(faqId);
      Analytics.trackEvent({
        action: 'faq_expanded',
        category: 'engagement',
        label: faqId,
        custom_parameters: {
          faq_question: faqData.find(f => f.id === faqId)?.question || 'unknown',
          timestamp: new Date().toISOString()
        }
      });
    }
    setExpandedItems(newExpanded);
  };

  // Track FAQ page view
  useEffect(() => {
    Analytics.trackEvent({
      action: 'faq_page_view',
      category: 'page_view',
      label: 'faq_landing',
      custom_parameters: {
        total_faqs: faqData.length,
        timestamp: new Date().toISOString()
      }
    });
  }, []);

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe as we're using JSON.stringify on controlled data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer + (faq.examples ? ' Examples include: ' + faq.examples.join(', ') : '')
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Got questions about AI consulting? We've got answers. Here are the most common questions we get from business owners.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
                <input
                  id="faq-search"
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-2">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.291-2.709M15 3.293A7.962 7.962 0 0112 1a7.962 7.962 0 01-5.291 2.709" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* General FAQs section heading */}
                {filteredFAQs.some(faq => faq.category !== 'training') && (
                  <div id="general-faqs" className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      General FAQs
                    </h2>
                  </div>
                )}

                {/* Render General FAQs first */}
                {filteredFAQs
                  .filter(faq => faq.category !== 'training')
                  .map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            <svg
                              className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                expandedItems.has(faq.id) ? 'transform rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4">
                            {faq.answer && (
                              <div className="text-gray-700 text-lg leading-relaxed mb-4 whitespace-pre-line">
                                {faq.answer}
                              </div>
                            )}
                            {faq.examples && (
                              <ul className="space-y-3">
                                {faq.examples.map((example, exampleIndex) => (
                                  <li key={exampleIndex} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                                    <span className="text-gray-700 text-lg leading-relaxed">
                                      {example}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                {/* Divider and Training FAQs section */}
                {filteredFAQs.some(faq => faq.category === 'training') && (
                  <>
                    <div id="training-faqs" className="my-12 border-t border-gray-300 scroll-mt-20">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <h2 className="bg-background px-6 text-2xl font-bold text-gray-900">
                            Training FAQs
                          </h2>
                        </div>
                      </div>
                    </div>

                    {filteredFAQs
                      .filter(faq => faq.category === 'training')
                      .map((faq) => (
                        <div key={faq.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                          <button
                            onClick={() => toggleExpanded(faq.id)}
                            className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              <div className="flex-shrink-0">
                                <svg
                                  className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    expandedItems.has(faq.id) ? 'transform rotate-180' : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </button>

                          {expandedItems.has(faq.id) && (
                            <div className="px-6 pb-6 border-t border-gray-100">
                              <div className="pt-4">
                                {faq.answer && (
                                  <div className="text-gray-700 text-lg leading-relaxed mb-4 whitespace-pre-line">
                                    {faq.answer}
                                  </div>
                                )}
                                {faq.examples && (
                                  <ul className="space-y-3">
                                    {faq.examples.map((example, exampleIndex) => (
                                      <li key={exampleIndex} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-lg leading-relaxed">
                                          {example}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              If you want to explore at your own pace, start with the free AI starter kit.
              <br />
              If you prefer a conversation about your workflows, book a free AI audit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/#starter-kit"
                className="btn-primary bg-primary hover:bg-primary/90 text-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Get your FREE AI starter kit"
                onClick={() => Analytics.trackEvent({
                  action: 'faq_cta_click',
                  category: 'conversion',
                  label: 'get_starter_kit',
                  custom_parameters: {
                    source_page: 'faq',
                    timestamp: new Date().toISOString()
                  }
                })}
              >
                Get your FREE AI starter kit
              </Link>
              <Link
                href="/#book-appointment"
                className="btn-primary-outline text-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Book your FREE AI audit"
                onClick={() => Analytics.trackEvent({
                  action: 'faq_cta_click',
                  category: 'conversion',
                  label: 'book_audit',
                  custom_parameters: {
                    source_page: 'faq',
                    timestamp: new Date().toISOString()
                  }
                })}
              >
                Book your FREE AI audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
