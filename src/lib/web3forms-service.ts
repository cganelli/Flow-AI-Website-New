// Web3Forms service for direct email delivery (no API keys required)
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
}

// Web3Forms access key (free, no signup required for basic use)
const ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Get free key from web3forms.com

// Send contact form email directly
export async function sendContactEmailViaWeb3Forms(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  ticketNumber: string;
}> {
  const ticketNumber = `FA-${Date.now()}`;

  try {
    // Prepare form data
    const formDataToSend = new FormData();
    formDataToSend.append('access_key', ACCESS_KEY);
    formDataToSend.append('email', 'carissa@thisisflowai.com'); // Your email
    formDataToSend.append('subject', `New Contact Form Submission - ${formData.subject || 'General Inquiry'}`);
    formDataToSend.append('from_name', formData.name);
    formDataToSend.append('from_email', formData.email);
    formDataToSend.append('company', formData.company || 'Not provided');
    formDataToSend.append('phone', formData.phone || 'Not provided');
    formDataToSend.append('inquiry_type', formData.inquiryType || 'General Inquiry');
    formDataToSend.append('ticket_number', ticketNumber);

    // Format the message
    const messageContent = `
Contact Form Submission Details:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.inquiryType || 'General Inquiry'}
Ticket Number: ${ticketNumber}
Submission Date: ${new Date().toLocaleString()}

Message:
${formData.message || 'No message provided'}

---
This email was sent from the FlowAI contact form.
Reply directly to this email to respond to the inquiry.
    `;

    formDataToSend.append('message', messageContent);

    // Send to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Email sent successfully',
        ticketNumber
      };
    }
    throw new Error(result.message || 'Web3Forms submission failed');
  } catch (error) {
    console.error('Web3Forms sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      ticketNumber
    };
  }
}

// Alternative: Formspree service (another no-setup option)
const FORM_ID = 'YOUR_FORM_ID'; // Get from formspree.io

export async function sendContactEmailViaFormspree(formData: ContactFormData): Promise<{
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
        email: formData.email,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        subject: formData.subject,
        message: formData.message,
        ticketNumber: ticketNumber,
        _replyto: formData.email,
        _subject: `New Contact Form - ${formData.subject || 'General Inquiry'}`
      })
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Email sent successfully',
        ticketNumber
      };
    }
    throw new Error('Formspree submission failed');
  } catch (error) {
    console.error('Formspree sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      ticketNumber
    };
  }
}

// Export old class interface for backward compatibility
export const Web3FormsService = {
  sendContactEmail: sendContactEmailViaWeb3Forms
};

export const FormspreeService = {
  sendContactEmail: sendContactEmailViaFormspree
};
