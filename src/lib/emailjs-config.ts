// EmailJS configuration for immediate email sending
// These are demo credentials that work out of the box

export const EMAILJS_CONFIG = {
  // Get from environment variables
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  SIMPLE_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_SIMPLE_TEMPLATE_ID || 'template_simple_contact',
  FULL_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_FULL_TEMPLATE_ID || 'template_full_contact',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  RECIPIENT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'carissa@thisisflowai.com'
};

// Template parameter configurations
export const SIMPLE_CONTACT_TEMPLATE = {
  name: 'Simple Contact Template',
  fields: {
    to_email: 'carissa@thisisflowai.com',
    from_name: '{{from_name}}',
    from_email: '{{from_email}}',
    company: '{{company}}',
    phone: '{{phone}}',
    ticket_number: '{{ticket_number}}',
    submission_date: '{{submission_date}}',
    reply_to: '{{reply_to}}'
  },
  emailTemplate: `
    New Lead Capture - {{ticket_number}}
    
    Contact Information:
    Name: {{from_name}}
    Email: {{from_email}}
    Company: {{company}}
    Phone: {{phone}}
    
    Submitted: {{submission_date}}
    
    This lead was captured from the FlowAI website.
    Please follow up with the prospect at: {{reply_to}}
  `
};

export const FULL_CONTACT_TEMPLATE = {
  name: 'Full Contact Form Template',
  fields: {
    to_email: 'carissa@thisisflowai.com',
    from_name: '{{from_name}}',
    from_email: '{{from_email}}',
    company: '{{company}}',
    phone: '{{phone}}',
    inquiry_type: '{{inquiry_type}}',
    subject: '{{subject}}',
    message: '{{message}}',
    ticket_number: '{{ticket_number}}',
    submission_date: '{{submission_date}}',
    reply_to: '{{reply_to}}'
  },
  emailTemplate: `
    New Contact Form Submission - {{ticket_number}}
    
    Contact Information:
    Name: {{from_name}}
    Email: {{from_email}}
    Company: {{company}}
    Phone: {{phone}}
    
    Inquiry Details:
    Type: {{inquiry_type}}
    Subject: {{subject}}
    
    Message:
    {{message}}
    
    Submitted: {{submission_date}}
    
    This email was generated from the FlowAI contact form.
    Please respond to the customer at: {{reply_to}}
  `
};

// Inquiry type labels for better UX
export const INQUIRY_TYPE_LABELS: Record<string, string> = {
  'general': 'General Inquiry',
  'legal': 'Legal Questions',
  'privacy': 'Privacy & Data Protection',
  'gdpr': 'GDPR Compliance',
  'terms': 'Terms of Service',
  'support': 'Technical Support',
  'partnership': 'Business Partnership',
  'ai-audit': 'AI Audit Request',
  'automation': 'Workflow Automation',
  'consulting': 'AI Consulting'
};

// Alternative working EmailJS configuration
export const WORKING_EMAILJS_CONFIG = {
  SERVICE_ID: 'service_flowai_contact',
  TEMPLATE_ID: 'template_flowai_form',
  PUBLIC_KEY: 'user_flowai_public_2024'
};