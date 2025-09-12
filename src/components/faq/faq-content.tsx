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
    answer: "AI automation helps your business run smoother by handling time-consuming tasks automatically—like following up with leads, sending reminders, or organizing paperwork. It's like hiring an extra set of hands that works 24/7 and never makes a mistake.",
    category: "basics"
  },
  {
    id: "save-time-grow-business",
    question: "How can automation save me time and grow my business?",
    answer: "Automation takes care of the repetitive stuff—so you and your team can focus on real work, like serving clients and closing deals. You'll spend less time on admin and more time doing what makes you money.",
    category: "benefits"
  },
  {
    id: "real-world-examples",
    question: "What are some real-world ways automation can help my business?",
    answer: "",
    examples: [
      "Realtors: Automatically follow up with leads and schedule showings",
      "Roofers: Send job reminders, invoices, and customer updates without lifting a finger",
      "Accountants: Organize and track client documents or send tax deadline alerts",
      "Lawyers: Manage consultations, client intake forms, and billing",
      "Handymen: Book jobs, send quotes, and follow up after a job is done"
    ],
    category: "examples"
  },
  {
    id: "what-agency-does",
    question: "What does an automation agency actually do?",
    answer: "We learn how your business runs, figure out what can be automated, and then set it up for you. No tech skills needed—we handle the heavy lifting.",
    category: "process"
  },
  {
    id: "automation-cost",
    question: "How much does automation cost?",
    answer: "It depends on what you need, but we offer plans for every budget—from one-time setups to ongoing support. Most of our clients start saving time (and money) within the first month.",
    category: "pricing"
  },
  {
    id: "why-flow-ai",
    question: "Why work with Flow AI?",
    answer: "We specialize in creating custom AI solutions that integrate seamlessly with your existing business processes. Our team handles all the technical complexity while you focus on growing your business. Plus, we provide ongoing support to ensure your automation continues delivering results as your business evolves.",
    category: "company"
  },
  {
    id: "automation-leads-customers",
    question: "Can automation help me get more leads or customers?",
    answer: "Absolutely. Automation can follow up with new leads instantly, send reminders to cold prospects, and keep your name top of mind—so you never lose a sale just because you got busy.",
    category: "benefits"
  },
  {
    id: "replace-team-employees",
    question: "Will this replace my team or employees?",
    answer: "No—automation supports your team by taking boring, repetitive tasks off their plate. It helps them do more in less time, not replace them.",
    category: "basics"
  },
  {
    id: "setup-time",
    question: "How long does it take to get set up?",
    answer: "Most clients are up and running within 1-2 weeks, depending on the complexity of what you need. We handle everything for you so there's minimal disruption.",
    category: "process"
  },
  {
    id: "special-software",
    question: "Do I need to buy special software?",
    answer: "Nope. We work with the tools you already use—like Google Workspace, QuickBooks, Calendly, or your CRM. If we work with other tools, we make sure it fits your workflow and budget.",
    category: "technical"
  },
  {
    id: "support-problems",
    question: "What if something goes wrong—who do I call?",
    answer: "We offer ongoing support plans, so if anything breaks or you want to update something, we've got your back. Think of us as your \"tech partner\" without the IT guy price tag.",
    category: "support"
  },
  {
    id: "customer-service-automation",
    question: "Can automation help with customer service?",
    answer: "Yes! You can automatically send appointment confirmations, job updates, FAQs, satisfaction surveys, and follow-ups—keeping clients informed and happy without extra effort.",
    category: "benefits"
  },
  {
    id: "data-security",
    question: "Is this secure and safe for my client data?",
    answer: "Absolutely. We use enterprise-grade security measures and only work with trusted, established platforms. Your client data stays protected with the same security standards used by major corporations.",
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
              Got questions about AI automation? We've got answers. Here are the most common questions we get from business owners.
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
