import { type NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    const ticketNumber = `FA-${Date.now()}`;

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
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
                <td style="padding: 10px;">${formData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${formData.email}">${formData.email}</a></td>
              </tr>
              ${formData.company ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Company:</td>
                <td style="padding: 10px;">${formData.company}</td>
              </tr>` : ''}
              ${formData.phone ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;">${formData.phone}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Inquiry Type:</td>
                <td style="padding: 10px;">${formData.inquiryType || 'General Inquiry'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Subject:</td>
                <td style="padding: 10px;">${formData.subject || 'Contact Form Submission'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold;">Submission Date:</td>
                <td style="padding: 10px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <h3>Message:</h3>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                ${formData.message || 'No message provided'}
              </div>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 5px;">
              <p><strong>Reply Instructions:</strong> Reply directly to this email to respond to ${formData.name}.</p>
              <p><strong>Contact Email:</strong> ${formData.email}</p>
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

    // For now, we'll log the email content and return success
    // In production, you would send this via your preferred email service
    console.log('Email would be sent:', emailContent);

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
    return NextResponse.json(
      {
        success: false,
        message: 'There was an error processing your request. Please try again or email us directly at carissa@thisisflowai.com'
      },
      { status: 500 }
    );
  }
}
