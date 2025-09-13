// FILE: src/lib/emailjs-service.ts
import emailjs from '@emailjs/browser';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  CONTACT_EMAIL,
} from './emailjs-config';

export type SimpleContactData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string; // we'll stuff extra fields (inquiryType/subject) into here if present
};

export async function sendSimpleContact(data: SimpleContactData) {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    throw new Error('EmailJS is not configured. Check env vars.');
  }
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const ticket = `FA-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const params = {
    // These names must match your EmailJS template variable names:
    to_email: CONTACT_EMAIL,
    from_name: (data.name || '').trim(),
    from_email: (data.email || '').trim(),
    company: (data.company || 'Not provided').trim(),
    phone: (data.phone || 'Not provided').trim(),
    message: (data.message || 'Not provided').trim(),
    ticket_number: ticket,
    submission_date: new Date().toLocaleString(),
    reply_to: (data.email || '').trim(),
  };

  const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY);
  if (res.status !== 200) throw new Error(res.text || 'Email send failed');
  return { ok: true, ticket };
}