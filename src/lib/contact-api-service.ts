// Contact API service using the internal API route
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

interface ContactSubmissionResult {
  success: boolean;
  message: string;
  ticketNumber: string;
  emailSent?: boolean;
}

/* biome-ignore lint/complexity/noStaticOnlyClass: centralized contact API utilities */
export class ContactAPIService {
  // Submit contact form via internal API
  static async submitContactForm(formData: ContactFormData): Promise<ContactSubmissionResult> {
    try {
      const response = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'API request failed');
      }

      return {
        success: result.success,
        message: result.message,
        ticketNumber: result.ticketNumber,
        emailSent: result.emailSent
      };
    } catch (error) {
      console.error('Contact API service error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit contact form',
        ticketNumber: `FA-${Date.now()}`
      };
    }
  }

  // Submit simple contact (for contact capture form)
  static async submitSimpleContact(
    name: string,
    email: string,
    company?: string,
    phone?: string,
    message?: string
  ): Promise<ContactSubmissionResult> {
    return ContactAPIService.submitContactForm({
      name,
      email,
      company,
      phone,
      message: message || `Contact capture form submission from ${name}${company ? ` at ${company}` : ''}`,
      inquiryType: 'General Inquiry',
      subject: 'Contact Form Submission'
    });
  }

  // Submit full contact form (for detailed contact page)
  static async submitFullContact(formData: ContactFormData): Promise<ContactSubmissionResult> {
    return ContactAPIService.submitContactForm(formData);
  }
}
