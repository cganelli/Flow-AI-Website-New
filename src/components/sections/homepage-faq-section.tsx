"use client";

const HomepageFAQSection = () => {
  const faqs = [
    {
      question: "How can AI benefit my business?",
      answer: "AI can automate repetitive tasks, improve customer service, and increase productivity by handling routine operations 24/7."
    },
    {
      question: "What industries do you serve?",
      answer: "We work with small to medium businesses across all industries, customizing AI solutions to fit your specific needs."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="faq-heading" className="heading-lg mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              (if FAQ section exists on homepage)
            </p>
          </header>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <article key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/faq"
              className="btn-primary bg-primary hover:bg-primary/90"
              aria-label="View all frequently asked questions"
            >
              View All FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQSection;
