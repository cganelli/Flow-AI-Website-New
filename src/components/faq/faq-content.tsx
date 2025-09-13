"use client";

import { useState, useEffect } from 'react';
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
    answer: "By handling repetitive tasks, AI frees employees to focus on higher-value work. Teams spend less time on admin and more time on serving customers, innovating, and closing business. This accelerates growth without adding headcount.",
    category: "benefits"
  },
  {
    id: "real-world-examples",
    question: "What are some real-world ways AI can help?",
    answer: "",
    examples: [
      "Sales: Instantly follow up with leads and manage pipelines",
      "Finance: Streamline invoicing, expense tracking, and compliance",
      "HR: Automate onboarding, payroll, and employee support",
      "Operations: Manage scheduling, reminders, and reporting",
      "Customer Experience: Deliver timely updates, FAQs, and surveys"
    ],
    category: "examples"
  },
  {
    id: "what-agency-does",
    question: "What does Flow AI actually do?",
    answer: "We act as your AI strategic partner. We evaluate your processes, identify high-impact automation opportunities, and design custom AI systems. We manage implementation end-to-end, so you don't need technical expertise.",
    category: "process"
  },
  {
    id: "automation-cost",
    question: "How much does AI consulting cost?",
    answer: "It depends on scope and complexity. We offer options ranging from one-time projects to ongoing advisory support. Most clients see measurable time and cost savings within the first month.",
    category: "pricing"
  },
  {
    id: "why-flow-ai",
    question: "Why work with Flow AI?",
    answer: "We design and implement AI solutions tailored to your size, industry, and goals. We handle the complexity while you focus on results. Our enterprise leadership experience at companies such as Subway, Equinox, Edible Arrangements, PriceWaterhouseCoopers, and more ensures solutions that scale, and our support keeps systems performing as your business evolves.",
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
                <input
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
                {filteredFAQs.map((faq) => (
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
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">
                              {faq.answer}
                            </p>
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
              Book a free consultation and we'll answer any questions you have about how AI automation can help your specific business.
            </p>
            <a
              href="#book-appointment"
              className="btn-primary bg-primary hover:bg-primary/90 text-lg px-8 py-4"
              onClick={() => Analytics.trackEvent({
                action: 'faq_cta_click',
                category: 'conversion',
                label: 'book_consultation',
                custom_parameters: {
                  source_page: 'faq',
                  timestamp: new Date().toISOString()
                }
              })}
            >
              Get Your Free AI Audit
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
