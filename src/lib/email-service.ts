import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

export interface SimpleContactData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

/* biome-ignore lint/complexity/noStaticOnlyClass: shared email service helper */
export class EmailService {
  private static readonly SERVICE_ID = 'service_flowai';
  private static readonly TEMPLATE_ID_CONTACT = 'template_contact';
  private static readonly TEMPLATE_ID_SIMPLE = 'template_simple';
  private static readonly PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with actual key
  private static readonly RECIPIENT_EMAIL = 'carissa@thisisflowai.com';

  /**
   * Initialize EmailJS
   */
  static init() {
    emailjs.init(EmailService.PUBLIC_KEY);
  }

  /**
   * Sends a full contact form via EmailJS
   */
  static async sendContactForm(data: ContactFormData): Promise<{ success: boolean; ticketNumber: string }> {
    try {
      const ticketNumber = `FA-${Date.now()}`;

      const templateParams = {
        to_email: EmailService.RECIPIENT_EMAIL,
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'Not provided',
        phone: data.phone || 'Not provided',
        inquiry_type: data.inquiryType || 'General Inquiry',
        subject: data.subject || 'Contact Form Submission',
        message: data.message || 'No message provided',
        ticket_number: ticketNumber,
        submitted_date: new Date().toLocaleString()
      };

      await emailjs.send(EmailService.SERVICE_ID, EmailService.TEMPLATE_ID_CONTACT, templateParams);

      return { success: true, ticketNumber };
    } catch (error) {
      console.error('Email service error:', error);
      return { success: false, ticketNumber: `FA-${Date.now()}` };
    }
  }

  /**
   * Sends a simple contact capture form via EmailJS
   */
  static async sendSimpleContact(data: SimpleContactData): Promise<{ success: boolean; ticketNumber: string }> {
    try {
      const ticketNumber = `FA-${Date.now()}`;

      const templateParams = {
        to_email: EmailService.RECIPIENT_EMAIL,
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'Not provided',
        phone: data.phone || 'Not provided',
        ticket_number: ticketNumber,
        submitted_date: new Date().toLocaleString()
      };

      await emailjs.send(EmailService.SERVICE_ID, EmailService.TEMPLATE_ID_SIMPLE, templateParams);

      return { success: true, ticketNumber };
    } catch (error) {
      console.error('Email service error:', error);
      return { success: false, ticketNumber: `FA-${Date.now()}` };
    }
  }

  /**
   * Get the contact email for fallback
   */
  static getContactEmail(): string {
    return EmailService.RECIPIENT_EMAIL;
  }
}
