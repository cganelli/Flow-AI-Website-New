// Netlify Forms service for direct email delivery (works with any Netlify-hosted site)
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

// Send contact form email using Netlify Forms (no setup required)
export async function sendContactEmail(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  ticketNumber: string;
}> {
  const ticketNumber = `FA-${Date.now()}`;

  try {
    // Create form data for Netlify Forms submission
    const formPayload = new URLSearchParams();
    formPayload.append('form-name', 'contact-form'); // Must match the form name in your HTML
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('company', formData.company || '');
    formPayload.append('phone', formData.phone || '');
    formPayload.append('inquiryType', formData.inquiryType || 'General Inquiry');
    formPayload.append('subject', formData.subject || 'Contact Form Submission');
    formPayload.append('message', formData.message || '');
    formPayload.append('ticketNumber', ticketNumber);
    formPayload.append('submissionDate', new Date().toISOString());

    // Submit to Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formPayload.toString()
    });

    if (response.ok) {
      console.log('Netlify Forms submission successful:', ticketNumber);
      return {
        success: true,
        message: 'Message sent successfully via Netlify Forms',
        ticketNumber
      };
    }
    throw new Error(`Netlify Forms submission failed: ${response.status}`);
  } catch (error) {
    console.error('Netlify Forms sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send message',
      ticketNumber
    };
  }
}

// Simple send function for lead capture forms
export async function sendSimpleContact(
  name: string,
  email: string,
  company?: string,
  phone?: string
): Promise<{ success: boolean; message: string; ticketNumber: string }> {
  return sendContactEmail({
    name,
    email,
    company: company || '',
    phone: phone || '',
    inquiryType: 'Lead Capture',
    subject: 'New Lead from Contact Form',
    message: 'New lead captured from website contact form'
  });
}

// Export old class interface for backward compatibility
export const NetlifyFormsService = {
  sendContactEmail,
  sendSimpleContact
};
