"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Analytics } from '@/lib/analytics';
import { NetlifyFormsService } from '@/lib/netlify-forms-service';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
}

const ContactContent = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'general',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle URL parameter for topic (e.g., /contact?topic=training)
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic === 'training') {
      setFormData(prev => ({
        ...prev,
        inquiryType: 'training'
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, Message)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using Netlify Forms
      const result = await NetlifyFormsService.sendContactEmail({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        subject: formData.subject || `${formData.inquiryType} - ${formData.name}`,
        message: formData.message
      });

      if (result.success) {
        setSubmitStatus('success');

        // Track successful submission
        Analytics.trackEvent({
          action: 'contact_form_success',
          category: 'conversion',
          label: formData.inquiryType,
          custom_parameters: {
            ticket_number: result.ticketNumber,
            inquiry_type: formData.inquiryType,
            timestamp: new Date().toISOString()
          }
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: 'general',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">Contact Flow AI</h1>
          <p className="text-xl text-black mb-8">
            Have questions about our AI consulting services? We're here to help.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch with Flow AI</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                <p className="text-gray">We typically respond within 24 hours</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Book a Call</h3>
                <p className="text-gray mb-4">
                  Prefer to talk? Schedule a free consultation call.
                </p>
                <button
                  type="button"
                  className="btn-primary inline-block"
                  onClick={() => {
                    const footerElement = document.getElementById('book-appointment');
                    if (footerElement) {
                      footerElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form - Desktop */}
          <div>
            <form
              name="inquiry-form"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-6"
            >
              <input type="hidden" name="form-name" value="inquiry-form" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation appearance-none bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="ai_consultation">AI Consultation</option>
                  <option value="training">Training</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="legal">Legal/Privacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-vertical touch-manipulation min-h-[120px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 md:py-3 text-base md:text-sm font-medium touch-manipulation"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    There was a problem sending your message. Please contact us directly at carissa@thisisflowai.com
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-12">
          {/* Contact Form - Mobile (shown first) */}
          <div>
            <form
              name="inquiry-form"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-6"
            >
              <input type="hidden" name="form-name" value="inquiry-form" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                  <label htmlFor="name-mobile" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name-mobile"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email-mobile" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email-mobile"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                <div>
                  <label htmlFor="company-mobile" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company-mobile"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="phone-mobile" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone-mobile"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType-mobile" className="block text-sm font-medium mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType-mobile"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation appearance-none bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="ai_consultation">AI Consultation</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="legal">Legal/Privacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject-mobile" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject-mobile"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 touch-manipulation"
                />
              </div>

              <div>
                <label htmlFor="message-mobile" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message-mobile"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-4 md:px-4 md:py-3 text-base md:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-vertical touch-manipulation min-h-[120px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 md:py-3 text-base md:text-sm font-medium touch-manipulation"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    There was a problem sending your message. Please contact us directly at carissa@thisisflowai.com
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information - Mobile (shown second) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Schedule Your Free AI Audit</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                <p className="text-gray">We typically respond within 24 hours</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Book a Call</h3>
                <p className="text-gray mb-4">
                  Prefer to talk? Schedule a free consultation call.
                </p>
                <button
                  type="button"
                  className="btn-primary inline-block"
                  onClick={() => {
                    const footerElement = document.getElementById('book-appointment');
                    if (footerElement) {
                      footerElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
