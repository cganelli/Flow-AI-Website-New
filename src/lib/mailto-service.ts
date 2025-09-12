// Mailto service for opening user's email client
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

interface SimpleContactData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

const RECIPIENT_EMAIL = 'carissa@thisisflowai.com';

export async function sendContactEmail(data: ContactFormData): Promise<{
  success: boolean;
  message: string;
  ticketNumber: string;
}> {
  try {
    const ticketNumber = `FA-${Date.now()}`;

    const subject = `Contact Form: ${data.subject || 'General Inquiry'} - ${ticketNumber}`;

    const body = formatContactFormBody(data, ticketNumber);

    const mailtoLink = createMailtoLink(subject, body);

    // Open mailto link
    window.open(mailtoLink, '_self');

    return {
      success: true,
      message: 'Email client opened successfully',
      ticketNumber
    };
  } catch (error) {
    console.error('Mailto error:', error);
    return {
      success: false,
      message: 'Failed to open email client',
      ticketNumber: `FA-${Date.now()}`
    };
  }
}

export async function sendSimpleContact(data: SimpleContactData): Promise<{
  success: boolean;
  message: string;
  ticketNumber: string;
}> {
  try {
    const ticketNumber = `FA-${Date.now()}`;

    const subject = `New Lead: ${data.name || 'Contact Request'} - ${ticketNumber}`;

    const body = formatSimpleContactBody(data, ticketNumber);

    const mailtoLink = createMailtoLink(subject, body);

    // Open mailto link
    window.open(mailtoLink, '_self');

    return {
      success: true,
      message: 'Email client opened successfully',
      ticketNumber
    };
  } catch (error) {
    console.error('Mailto error:', error);
    return {
      success: false,
      message: 'Failed to open email client',
      ticketNumber: `FA-${Date.now()}`
    };
  }
}

function createMailtoLink(subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
}

function formatContactFormBody(data: ContactFormData, ticketNumber: string): string {
  return `
New Contact Form Submission - FlowAI

Ticket Number: ${ticketNumber}
Submission Date: ${new Date().toLocaleString()}

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
- Inquiry Type: ${data.inquiryType || 'General Inquiry'}
- Subject: ${data.subject || 'Contact Form Submission'}

Message:
${data.message || 'No message provided'}

---
This email was generated from the FlowAI contact form.
  `.trim();
}

function formatSimpleContactBody(data: SimpleContactData, ticketNumber: string): string {
  return `
New Lead - FlowAI

Ticket Number: ${ticketNumber}
Submission Date: ${new Date().toLocaleString()}

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}

---
This lead was captured from the FlowAI website.
  `.trim();
}

/**
 * Test if mailto functionality is available
 */
export function isMailtoSupported(): boolean {
  return typeof window !== 'undefined' && typeof window.open === 'function';
}

/**
 * Get the contact email address
 */
export function getContactEmail(): string {
  return RECIPIENT_EMAIL;
}

// Export old class interface for backward compatibility
export const MailtoService = {
  sendContactEmail,
  sendSimpleContact,
  isMailtoSupported,
  getContactEmail
};
