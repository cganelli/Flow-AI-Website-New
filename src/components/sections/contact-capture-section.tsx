"use client";

import ContactCaptureForm from '../contact-capture-form';

const ContactCaptureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-xl mb-4">
              Get Your Free AI Audit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join companies that have transformed their operations with tailored AI guidance.
              Get a personalized AI audit to identify impact areas and quick wins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Assessment</h3>
                  <p className="text-gray-600">
                    Receive a custom AI roadmap aligned with your organization's scale and goals
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ROI Insight</h3>
                  <p className="text-gray-600">
                    Understand estimated gains in time and cost savings across your operations
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Implementation Timeline</h3>
                  <p className="text-gray-600">
                    See how AI can begin delivering results fast
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 mt-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">30-Minute Call = 30+ Hours Saved Monthly</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Businesses typically reclaim 30+ hours per month post-implementation, translating to significant ROI across business scales.
                </p>
              </div>
            </div>

            {/* Right side - Form */}
            <div>
              <ContactCaptureForm
                title="Get Your Free AI Audit"
                subtitle="Describe your business and we'll craft an AI plan tailored to your scale and needs."
                buttonText="Get My Free Strategy Call"
                showCalendlyAfterSubmit={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCaptureSection;
