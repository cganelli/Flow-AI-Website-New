// EmailJS service for direct email delivery (no backend required)
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG, INQUIRY_TYPE_LABELS } from './emailjs-config';

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

export interface EmailResponse {
  success: boolean;
  message: string;
  ticketNumber: string;
  error?: Error | string | unknown;
}

export class EmailJSService {
  private static isInitialized = false;

  // Initialize EmailJS with configuration validation
  static init(): boolean {
    if (typeof window === 'undefined') {
      console.warn('EmailJS can only be initialized in browser environment');
      return false;
    }

    if (!EMAILJS_CONFIG.PUBLIC_KEY) {
      console.error('EmailJS PUBLIC_KEY is missing. Please check your environment variables.');
      return false;
    }

    if (!EMAILJS_CONFIG.SERVICE_ID) {
      console.error('EmailJS SERVICE_ID is missing. Please check your environment variables.');
      return false;
    }

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      this.isInitialized = true;
      console.log('EmailJS initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      return false;
    }
  }

  // Generate unique ticket number
  private static generateTicketNumber(): string {
    return `FA-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  // Send simple contact capture form (for lead generation)
  static async sendSimpleContact(data: SimpleContactData): Promise<EmailResponse> {
    const ticketNumber = this.generateTicketNumber();

    // Initialize if not already done
    if (!this.isInitialized && !this.init()) {
      return {
        success: false,
        message: 'EmailJS initialization failed. Please check configuration.',
        ticketNumber,
        error: 'INIT_FAILED'
      };
    }

    try {
      // Validate required fields
      if (!data.email) {
        throw new Error('Email address is required');
      }

      if (!data.name?.trim()) {
        throw new Error('Name is required');
      }

      // Prepare template parameters for simple contact
      const templateParams = {
        to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        company: data.company?.trim() || 'Not provided',
        phone: data.phone?.trim() || 'Not provided',
        ticket_number: ticketNumber,
        submission_date: new Date().toLocaleString(),
        reply_to: data.email.trim()
      };

      console.log('Sending simple contact email with params:', templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.SIMPLE_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (response.status === 200) {
        console.log('Simple contact email sent successfully:', response);
        return {
          success: true,
          message: 'Email sent successfully! We\'ll get back to you soon.',
          ticketNumber
        };
      } else {
        throw new Error(`EmailJS error: ${response.text || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('EmailJS simple contact error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email. Please try again.',
        ticketNumber,
        error
      };
    }
  }

  // Send full contact form (for detailed inquiries)
  static async sendContactForm(data: ContactFormData): Promise<EmailResponse> {
    const ticketNumber = this.generateTicketNumber();

    // Initialize if not already done
    if (!this.isInitialized && !this.init()) {
      return {
        success: false,
        message: 'EmailJS initialization failed. Please check configuration.',
        ticketNumber,
        error: 'INIT_FAILED'
      };
    }

    try {
      // Validate required fields
      if (!data.email) {
        throw new Error('Email address is required');
      }

      if (!data.name?.trim()) {
        throw new Error('Name is required');
      }

      // Prepare template parameters for full contact form
      const templateParams = {
        to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        company: data.company?.trim() || 'Not provided',
        phone: data.phone?.trim() || 'Not provided',
        inquiry_type: INQUIRY_TYPE_LABELS[data.inquiryType || 'general'] || 'General Inquiry',
        subject: data.subject?.trim() || 'No subject provided',
        message: data.message?.trim() || 'No message provided',
        ticket_number: ticketNumber,
        submission_date: new Date().toLocaleString(),
        reply_to: data.email.trim()
      };

      console.log('Sending full contact form email with params:', templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.FULL_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (response.status === 200) {
        console.log('Full contact form email sent successfully:', response);
        return {
          success: true,
          message: 'Your message has been sent successfully! We\'ll respond within 24 hours.',
          ticketNumber
        };
      } else {
        throw new Error(`EmailJS error: ${response.text || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('EmailJS full contact form error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email. Please try again.',
        ticketNumber,
        error
      };
    }
  }

  // Test EmailJS configuration
  static async testConfiguration(): Promise<{
    success: boolean;
    message: string;
    details?: string | unknown;
  }> {
    if (!this.isInitialized && !this.init()) {
      return {
        success: false,
        message: 'EmailJS initialization failed',
        details: 'Missing or invalid configuration'
      };
    }

    try {
      // Send a test email to verify configuration
      const testParams = {
        to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
        from_name: 'EmailJS Test',
        from_email: 'test@flowai.com',
        company: 'FlowAI Test',
        phone: 'N/A',
        ticket_number: 'TEST-' + Date.now(),
        submission_date: new Date().toLocaleString(),
        reply_to: 'test@flowai.com'
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.SIMPLE_TEMPLATE_ID,
        testParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      return {
        success: response.status === 200,
        message: response.status === 200 ? 'EmailJS configuration is working correctly' : 'EmailJS test failed',
        details: response
      };
    } catch (error) {
      return {
        success: false,
        message: 'EmailJS test failed',
        details: error
      };
    }
  }

  // Get configuration status
  static getConfigurationStatus(): {
    isInitialized: boolean;
    hasServiceId: boolean;
    hasPublicKey: boolean;
    hasSimpleTemplate: boolean;
    hasFullTemplate: boolean;
    recipientEmail: string;
  } {
    return {
      isInitialized: this.isInitialized,
      hasServiceId: !!EMAILJS_CONFIG.SERVICE_ID,
      hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY,
      hasSimpleTemplate: !!EMAILJS_CONFIG.SIMPLE_TEMPLATE_ID,
      hasFullTemplate: !!EMAILJS_CONFIG.FULL_TEMPLATE_ID,
      recipientEmail: EMAILJS_CONFIG.RECIPIENT_EMAIL
    };
  }
}
