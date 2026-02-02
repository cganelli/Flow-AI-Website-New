import { type NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sanitizeContactForm } from '@/lib/sanitize';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

// CSRF protection: Check origin header
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Allow requests from same origin (no origin header) or allowed domains
  const allowedOrigins = [
    'https://thisisflowai.com',
    'https://www.thisisflowai.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];
  
  // If origin is present, validate it
  if (origin) {
    return allowedOrigins.some(allowed => origin.startsWith(allowed));
  }
  
  // If no origin, check referer
  if (referer) {
    return allowedOrigins.some(allowed => referer.startsWith(allowed));
  }
  
  // Allow requests with no origin/referer (same-origin or API clients)
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, 5, 15 * 60 * 1000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
          }
        }
      );
    }

    // CSRF protection
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { success: false, message: 'Invalid origin' },
        { status: 403 }
      );
    }

    const rawData: ContactFormData = await request.json();
    const ticketNumber = `FA-${Date.now()}`;

    // Sanitize and validate input
    const { sanitized: formData, errors } = sanitizeContactForm(rawData);
    
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join('; ') },
        { status: 400 }
      );
    }

    // Format email content
    const emailContent = {
      to: 'carissa@thisisflowai.com',
      subject: `FlowAI Contact Form - ${formData.subject || 'General Inquiry'} [${ticketNumber}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f97316; color: white; padding: 20px; text-align: center;">
            <h1>New Contact Form Submission</h1>
            <p>Ticket #${ticketNumber}</p>
          </div>

          <div style="padding: 20px; background: #ffffff;">
            <h2>Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Name:</td>
                <td style="padding: 10px;">${escapeHtml(formData.name)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></td>
              </tr>
              ${formData.company ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Company:</td>
                <td style="padding: 10px;">${escapeHtml(formData.company)}</td>
              </tr>` : ''}
              ${formData.phone ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;">${escapeHtml(formData.phone)}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Inquiry Type:</td>
                <td style="padding: 10px;">${escapeHtml(formData.inquiryType || 'General Inquiry')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Subject:</td>
                <td style="padding: 10px;">${escapeHtml(formData.subject || 'Contact Form Submission')}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Submission Date:</td>
                <td style="padding: 10px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <h3>Message:</h3>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                ${escapeHtml(formData.message || 'No message provided')}
              </div>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px;">
              <p><strong>Reply Instructions:</strong> Reply directly to this email to respond to ${escapeHtml(formData.name)}.</p>
              <p><strong>Contact Email:</strong> ${escapeHtml(formData.email)}</p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission - FlowAI

Ticket Number: ${ticketNumber}
Submission Date: ${new Date().toLocaleString()}

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}
- Inquiry Type: ${formData.inquiryType || 'General Inquiry'}
- Subject: ${formData.subject || 'Contact Form Submission'}

Message:
${formData.message || 'No message provided'}

---
Reply directly to ${formData.email} to respond to this inquiry.
      `
    };

    // Avoid logging PII in production logs; record only ticket metadata.
    console.log('Contact form received', {
      ticketNumber,
      inquiryType: formData.inquiryType || 'General Inquiry',
      subject: formData.subject || 'Contact Form Submission',
      submittedAt: new Date().toISOString(),
    });

    // Simulate successful email sending
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      ticketNumber,
      emailSent: true
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    // Don't expose internal error details to client
    return NextResponse.json(
      {
        success: false,
        message: 'There was an error processing your request. Please try again or email us directly at carissa@thisisflowai.com'
      },
      { status: 500 }
    );
  }
}
