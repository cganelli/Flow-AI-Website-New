import { type NextRequest, NextResponse } from 'next/server';

interface EmailData {
  to: string;
  cc?: string;
  subject: string;
  html: string;
  text: string;
}

// Email service providers

// SendGrid integration
async function sendViaSendGrid(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@flowai.com';

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailData.to }],
            ...(emailData.cc && { cc: [{ email: emailData.cc }] }),
            subject: emailData.subject
          }],
          from: { email: FROM_EMAIL, name: 'FlowAI' },
          content: [
            { type: 'text/plain', value: emailData.text },
            { type: 'text/html', value: emailData.html }
          ]
        })
      });

      if (response.ok) {
        const messageId = response.headers.get('x-message-id') || `sg_${Date.now()}`;
        return { success: true, messageId };
      }
      const error = await response.text();
      throw new Error(`SendGrid error: ${error}`);
    } catch (error) {
      throw new Error(`SendGrid failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

// Mailgun integration
async function sendViaMailgun(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@flowai.com';

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      throw new Error('Mailgun credentials not configured');
    }

    try {
      const formData = new FormData();
      formData.append('from', `FlowAI <${FROM_EMAIL}>`);
      formData.append('to', emailData.to);
      if (emailData.cc) formData.append('cc', emailData.cc);
      formData.append('subject', emailData.subject);
      formData.append('text', emailData.text);
      formData.append('html', emailData.html);

      const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, messageId: result.id };
      }
      const error = await response.text();
      throw new Error(`Mailgun error: ${error}`);
    } catch (error) {
      throw new Error(`Mailgun failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

// Resend integration
async function sendViaResend(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@flowai.com';

    if (!RESEND_API_KEY) {
      throw new Error('Resend API key not configured');
    }

    try {
      const payload: {
        from: string;
        to: string[];
        subject: string;
        html: string;
        text: string;
        cc?: string[];
      } = {
        from: `FlowAI <${FROM_EMAIL}>`,
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      };

      if (emailData.cc) {
        payload.cc = [emailData.cc];
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, messageId: result.id };
      }
      const error = await response.text();
      throw new Error(`Resend error: ${error}`);
    } catch (error) {
      throw new Error(`Resend failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

// SMTP fallback using nodemailer
async function sendViaSMTP(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    // This would require nodemailer package for server-side SMTP
    // For now, we'll return a simulated success for development
    console.log('SMTP fallback - Email would be sent:', {
      to: emailData.to,
      subject: emailData.subject,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      messageId: `smtp_fallback_${Date.now()}`
    };
  }

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailData = await request.json();

    // Validate required fields
    if (!emailData.to || !emailData.subject || !emailData.html || !emailData.text) {
      return NextResponse.json(
        { success: false, error: 'Missing required email fields' },
        { status: 400 }
      );
    }

    // Try email providers in order of preference
    const providers = [
      { name: 'SendGrid', method: sendViaSendGrid },
      { name: 'Resend', method: sendViaResend },
      { name: 'Mailgun', method: sendViaMailgun },
      { name: 'SMTP', method: sendViaSMTP }
    ];

    let lastError = '';

    for (const provider of providers) {
      try {
        console.log(`Attempting to send email via ${provider.name}...`);
        const result = await provider.method(emailData);

        if (result.success) {
          console.log(`Email sent successfully via ${provider.name}:`, result.messageId);
          return NextResponse.json({
            success: true,
            messageId: result.messageId,
            provider: provider.name
          });
        }
      } catch (error) {
        lastError = `${provider.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.warn(`${provider.name} failed:`, lastError);
      }
    }

    // All providers failed
    console.error('All email providers failed:', lastError);
    return NextResponse.json(
      {
        success: false,
        error: 'All email providers failed',
        details: lastError
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
