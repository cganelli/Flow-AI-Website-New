"use client";

import { useEffect } from 'react';
import { Analytics } from '@/lib/analytics';

export default function PrivacyTermsContent() {
  // Track page view
  useEffect(() => {
    Analytics.trackEvent({
      action: 'privacy_terms_page_view',
      category: 'page_view',
      label: 'privacy_terms_landing',
      custom_parameters: {
        timestamp: new Date().toISOString()
      }
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy and data protection are important to us. Please review our policies and terms of service.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h2>
              <p className="text-sm text-gray-600 mb-6">
                <strong>Effective Date:</strong> February 12, 2026
              </p>

              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  Flow AI ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and share information when you interact with our website, services, and communications.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">1. Information We Collect</h3>
                <p className="mb-4">We may collect the following types of personal information:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                  <li><strong>Business Information:</strong> Your role, industry, and AI strategy needs</li>
                  <li><strong>Usage Data:</strong> How you interact with our website or services (e.g., IP address, browser type, pages visited)</li>
                  <li><strong>Client Data:</strong> If you become a customer, we may process business workflow data that you provide to implement automation solutions</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h3>
                <p className="mb-4">We use the information to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about offers or updates</li>
                  <li>Customize and set up AI-driven systems and strategies</li>
                  <li>Analyze usage to improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">3. Sharing Your Information</h3>
                <p className="mb-4">We do not sell your personal information. We only share it:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>With trusted service providers (e.g., web hosting, analytics, email tools)</li>
                  <li>If required by law or to protect our rights</li>
                  <li>With your consent</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Security</h3>
                <p className="mb-6">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">5. Your Rights</h3>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">6. GDPR Compliance (European Users)</h3>
                <p className="mb-4">
                  If you are a resident of the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Legal Basis for Processing:</strong> We process your data based on consent, legitimate interests, or contractual necessity</li>
                  <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time without affecting prior processing</li>
                  <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                  <li><strong>Right to Restriction:</strong> Restrict processing under certain circumstances</li>
                  <li><strong>Data Protection Officer:</strong> Contact our DPO at dpo@flowai.com for GDPR-related matters</li>
                  <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority</li>
                  <li><strong>Data Retention:</strong> We retain personal data only as long as necessary for the purposes outlined or as required by law</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">7. International Data Transfers</h3>
                <p className="mb-6">
                  When we transfer data outside the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission or transfers to countries with adequacy decisions.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">8. Contact Us</h3>
                <p className="mb-6">
                  If you have questions about this Privacy Policy, please <a href="/contact" className="text-primary hover:underline font-medium">contact us</a> through our website contact form.
                </p>
              </div>
            </div>

            {/* Terms of Service Section */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h2>
              <p className="text-sm text-gray-600 mb-6">
                <strong>Effective Date:</strong> February 12, 2026
              </p>

              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h3>
                <p className="mb-6">
                  By accessing or using Flow AI's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">2. Description of Services</h3>
                <p className="mb-6">
                  Flow AI provides AI automation consulting, implementation, and support services to help businesses streamline their operations and improve productivity.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">3. User Responsibilities</h3>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use our services in compliance with applicable laws</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Maintain the confidentiality of any login credentials</li>
                  <li>Respect intellectual property rights</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">4. Service Availability</h3>
                <p className="mb-6">
                  We strive to maintain service availability but cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue services with reasonable notice.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">5. Payment Terms</h3>
                <p className="mb-6">
                  Payment terms for our services will be specified in separate service agreements. All fees are non-refundable unless otherwise specified in writing.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">6. Limitation of Liability</h3>
                <p className="mb-6">
                  Flow AI's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from your use of our services.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">7. Intellectual Property</h3>
                <p className="mb-6">
                  All content, trademarks, and intellectual property related to our services remain the property of Flow AI or our licensors.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">8. Termination</h3>
                <p className="mb-6">
                  Either party may terminate service agreements according to the terms specified in individual contracts. These Terms of Service remain in effect until terminated.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">9. DIY Workflow Plans and AI Prompts</h3>
                <p className="mb-4"><strong>9.1 &quot;As-Is&quot; Resources:</strong> All DIY Workflow Plans, guides, and AI prompts (the &quot;Plans&quot;) are provided for educational purposes only. Flow AI provides these Plans on an &quot;as-is&quot; basis without warranties of any kind.</p>
                <p className="mb-4"><strong>9.2 No Professional Advice:</strong> Use of the Plans does not create a consultant-client relationship. You should consult with qualified professionals before implementing business processes involving customer data or financial transactions.</p>
                <p className="mb-4"><strong>9.3 AI Content Responsibility:</strong> You acknowledge that AI-generated content can be inaccurate. You are solely responsible for reviewing and verifying any output generated by prompts provided in the Plans before use.</p>
                <p className="mb-6"><strong>9.4 Compliance:</strong> You are responsible for ensuring that your implementation of any Plan complies with your internal policies and applicable laws (e.g., CCPA, CAN-SPAM, GDPR, TCPA, etc.).</p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">10. Changes to Terms</h3>
                <p className="mb-6">
                  We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">11. Governing Law</h3>
                <p className="mb-6">
                  These terms are governed by the laws of the jurisdiction where Flow AI is headquartered, without regard to conflict of law principles.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">12. Contact Information</h3>
                <p className="mb-6">
                  For questions about these Terms of Service, please <a href="/contact" className="text-primary hover:underline font-medium">contact us</a> through our website contact form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              Questions About Our Policies?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about our privacy policy or terms of service, we're here to help.
            </p>
            <a
              href="/contact"
              className="btn-primary bg-primary hover:bg-primary/90 text-lg px-8 py-4"
              onClick={() => Analytics.trackEvent({
                action: 'privacy_terms_cta_click',
                category: 'conversion',
                label: 'contact_about_policies',
                custom_parameters: {
                  source_page: 'privacy_terms',
                  timestamp: new Date().toISOString()
                }
              })}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
