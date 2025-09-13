"use client";

import { useState } from 'react';
import { Analytics } from '@/lib/analytics';

interface ContactCaptureFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showCalendlyAfterSubmit?: boolean;
  className?: string;
}

const ContactCaptureForm = ({
  title = "Ready to Transform Your Business with AI?",
  subtitle = "Get your free AI audit consultation and see how we can automate your workflows.",
  buttonText = "Get My Free AI Audit",
  showCalendlyAfterSubmit = true,
  className = ""
}: ContactCaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData.email) {
      e.preventDefault();
      alert('Please enter your email address');
      return;
    }

    // Track form submission
    Analytics.trackEvent('form_submit', {
      form_type: 'contact_capture',
      has_name: !!formData.name,
      has_company: !!formData.company,
      has_phone: !!formData.phone
    });

    // Let Netlify Forms handle the submission
    // The EmailJsFormBridge will add the necessary attributes
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openCalendly = () => {
    Analytics.trackEvent('calendly_opened', {
      source: 'contact_capture_form',
      user_email: formData.email
    });

    // Scroll to footer Calendly widget
    const footerElement = document.getElementById('book-appointment');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isSubmitted && showCalendly) {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="mb-6">
          <div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            role="img"
            aria-label="Success checkmark"
          >
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully! We'll get back to you soon to discuss your free AI audit.
          </p>
        </div>

        <button
          onClick={openCalendly}
          className="btn-primary bg-primary hover:bg-primary/90 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Schedule your free AI audit call"
        >
          Schedule My Free Call Now
        </button>

        <p className="text-sm text-gray-500">
          We'll send you a confirmation email shortly
        </p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          role="img"
          aria-label="Success checkmark"
        >
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your message has been sent successfully! We'll get back to you soon to discuss your AI audit.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6"
        noValidate
        aria-label="Contact form to get your free AI audit"
      >
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all touch-manipulation"
            autoComplete="name"
            aria-describedby="name-description"
          />
          <span id="name-description" className="sr-only">
            Enter your full name for the contact request
          </span>
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email Address (Required)
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required="true"
            className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all touch-manipulation"
            autoComplete="email"
            inputMode="email"
            aria-describedby="email-description email-error"
            aria-invalid={submitError ? "true" : "false"}
          />
          <span id="email-description" className="sr-only">
            Enter your email address. This field is required.
          </span>
        </div>

        <div>
          <label htmlFor="contact-company" className="sr-only">
            Company Name
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all touch-manipulation"
            autoComplete="organization"
            aria-describedby="company-description"
          />
          <span id="company-description" className="sr-only">
            Enter your company name (optional)
          </span>
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all touch-manipulation"
            autoComplete="tel"
            inputMode="tel"
            aria-describedby="phone-description"
          />
          <span id="phone-description" className="sr-only">
            Enter your phone number (optional)
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed py-4 md:py-3 text-base md:text-sm font-medium touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          aria-describedby="submit-description"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Email...
            </span>
          ) : buttonText}
        </button>
        <span id="submit-description" className="sr-only">
          Submit the form to get your free AI audit
        </span>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to receive communications from Flow AI.
          We respect your privacy and won't spam you.
        </p>

        {submitError && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4"
            role="alert"
            aria-live="polite"
            id="email-error"
          >
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">Error sending message</p>
                <p className="text-sm">{submitError}</p>
                <p className="text-sm mt-1">Please contact us directly at carissa@thisisflowai.com</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactCaptureForm;
