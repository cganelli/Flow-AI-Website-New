// Formspree email service for direct email delivery
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

// Using a demo Formspree form that works immediately
const FORM_ID = 'xpzvpjjw'; // Demo form ID - replace with your own from formspree.io

export async function sendContactEmail(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  ticketNumber: string;
}> {
  const ticketNumber = `FA-${Date.now()}`;

  try {
    const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        inquiryType: formData.inquiryType || 'General Inquiry',
        subject: formData.subject || 'Contact Form Submission',
        message: formData.message || '',
        ticketNumber: ticketNumber,
        submissionDate: new Date().toISOString(),
        _replyto: formData.email, // Formspree will use this as reply-to
        _subject: `FlowAI Contact Form - ${formData.subject || 'General Inquiry'} [${ticketNumber}]`
      })
    });

    if (response.ok) {
      console.log('Formspree submission successful:', ticketNumber);
      return {
        success: true,
        message: 'Email sent successfully via Formspree',
        ticketNumber
      };
    }

    throw new Error(`Formspree submission failed: ${response.status}`);
  } catch (error) {
    console.error('Formspree email sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      ticketNumber
    };
  }
}

// Simple contact function for lead capture forms
export async function sendSimpleContact(
  name: string,
  email: string,
  company?: string,
  phone?: string,
  message?: string
): Promise<{ success: boolean; message: string; ticketNumber: string }> {
  return sendContactEmail({
    name,
    email,
    company: company || '',
    phone: phone || '',
    inquiryType: 'Lead Capture',
    subject: 'New Lead from Website',
    message: message || 'New lead captured from website contact form'
  });
}

// Export old class interface for backward compatibility
export const FormspreeEmailService = {
  sendContactEmail,
  sendSimpleContact
};
