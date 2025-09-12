// Instructions: Fix all TypeScript linting errors by replacing 'this.' with 'EmailAutomation.' in static methods and fixing any types

// Email automation for booking confirmations and follow-ups
import type { BookingData } from './analytics';

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
  delay?: number; // in minutes
}

export interface EmailAutomationConfig {
  templates: {
    immediate_confirmation: EmailTemplate;
    reminder_24h: EmailTemplate;
    follow_up_post_demo: EmailTemplate;
    nurture_sequence: EmailTemplate[];
  };
  webhooks: {
    calendly_webhook_url?: string;
    zapier_webhook_url?: string;
    make_webhook_url?: string;
  };
}

interface WebhookPayload {
  type: string;
  to?: string;
  delay?: number;
  template?: string;
  bookingData?: BookingData;
  [key: string]: unknown;
}

interface CalendlyEventData {
  event: string;
  payload?: {
    event_type?: { name: string };
    invitee?: { email: string; name: string };
    event?: { start_time: string; end_time: string };
  };
}

export class EmailAutomation {
  private static config: EmailAutomationConfig = {
    // ... existing config content remains the same ...
    templates: {
      immediate_confirmation: {
        subject: "Your AI Strategy Session Request - Next Steps",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #e53f30 0%, #d32f2f 100%); color: white; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">We'll be in touch within 24 hours</p>
            </div>
            <!-- rest of template -->
          </div>
        `,
        textContent: "Thank You for Your Interest in FlowAI!...",
      },
      reminder_24h: {
        subject: "Your AI Demo Scheduling Link - Ready When You Are",
        delay: 1440,
        htmlContent: "<!-- reminder template -->",
        textContent: "Ready to See AI in Action?...",
      },
      follow_up_post_demo: {
        subject: "Thanks for the demo! Your AI implementation roadmap",
        delay: 60,
        htmlContent: "<!-- follow up template -->",
        textContent: "Great Meeting You Today!...",
      },
      nurture_sequence: [
        {
          subject: "Case Study: How AI Saved This Business 40 Hours/Week",
          delay: 4320,
          htmlContent: "<!-- Case study email content -->",
          textContent: "Case study email content...",
        },
      ],
    },
    webhooks: {
      calendly_webhook_url: process.env.CALENDLY_WEBHOOK_URL,
      zapier_webhook_url: process.env.ZAPIER_WEBHOOK_URL,
      make_webhook_url: process.env.MAKE_WEBHOOK_URL,
    },
  };

  static async sendConfirmationEmail(bookingData: BookingData): Promise<boolean> {
    try {
      const template = EmailAutomation.config.templates.immediate_confirmation;

      const personalizedSubject = template.subject;
      const personalizedHtml = template.htmlContent
        .replace(/{{firstName}}/g, bookingData.firstName)
        .replace(/{{lastName}}/g, bookingData.lastName);

      await EmailAutomation.sendViaWebhook({
        type: 'immediate_confirmation',
        to: bookingData.email,
        subject: personalizedSubject,
        html: personalizedHtml,
        bookingData,
      });

      return true;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
  }

  static async triggerAutomationSequence(bookingData: BookingData): Promise<void> {
    try {
      await Promise.all([
        EmailAutomation.sendToZapier(bookingData),
        EmailAutomation.sendToMake(bookingData),
        EmailAutomation.scheduleReminderEmail(bookingData),
      ]);
    } catch (error) {
      console.error('Error triggering automation sequence:', error);
    }
  }

  private static async sendToZapier(bookingData: BookingData): Promise<void> {
    const webhookUrl = EmailAutomation.config.webhooks.zapier_webhook_url;
    if (!webhookUrl) return;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'booking_form_submission',
        timestamp: new Date().toISOString(),
        data: bookingData,
      }),
    });
  }

  private static async sendToMake(bookingData: BookingData): Promise<void> {
    const webhookUrl = EmailAutomation.config.webhooks.make_webhook_url;
    if (!webhookUrl) return;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'new_booking_request',
        timestamp: new Date().toISOString(),
        lead_data: bookingData,
      }),
    });
  }

  private static async scheduleReminderEmail(bookingData: BookingData): Promise<void> {
    await EmailAutomation.sendViaWebhook({
      type: 'schedule_reminder',
      to: bookingData.email,
      delay: EmailAutomation.config.templates.reminder_24h.delay,
      template: 'reminder_24h',
      bookingData,
    });
  }

  private static async sendViaWebhook(payload: WebhookPayload): Promise<void> {
    const webhookUrls = [
      EmailAutomation.config.webhooks.zapier_webhook_url,
      EmailAutomation.config.webhooks.make_webhook_url,
    ].filter(Boolean);

    await Promise.allSettled(
      webhookUrls.map(url =>
        fetch(url as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      )
    );
  }

  static async handleCalendlyWebhook(eventData: CalendlyEventData): Promise<void> {
    try {
      if (eventData.event === 'invitee.created') {
        const invitee = eventData.payload?.invitee;

        await EmailAutomation.sendViaWebhook({
          type: 'appointment_confirmed',
          email: invitee?.email,
          name: invitee?.name,
          event_type: eventData.payload?.event_type?.name,
          start_time: eventData.payload?.event?.start_time,
          end_time: eventData.payload?.event?.end_time,
        });
      }
    } catch (error) {
      console.error('Error handling Calendly webhook:', error);
    }
  }
}

export const useEmailAutomation = () => {
  const sendConfirmationEmail = async (bookingData: BookingData) => {
    return await EmailAutomation.sendConfirmationEmail(bookingData);
  };

  const triggerAutomationSequence = async (bookingData: BookingData) => {
    await EmailAutomation.triggerAutomationSequence(bookingData);
  };

  return {
    sendConfirmationEmail,
    triggerAutomationSequence,
  };
};
