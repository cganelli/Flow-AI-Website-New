// Contact form submission hook
import { useState } from 'react';
import { EmailJSService } from '@/lib/emailjs-service';

export function useContactSubmit() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const company = String(formData.get('company') || '');
    const phone = String(formData.get('phone') || '');
    const inquiryType = String(formData.get('inquiryType') || '');
    const subject = String(formData.get('subject') || '');
    const message = String(formData.get('message') || '');

    try {
      // SIMPLE version:
      // const res = await EmailJSService.sendSimpleContact({ name, email, company, phone });

      // FULL version:
      const res = await EmailJSService.sendContactForm({ name, email, company, phone, inquiryType, subject, message });

      if (res.success) {
        setStatus('ok');
        setMsg('Thanks! We'll be in touch shortly.');
        form.reset();
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      setStatus('error');
      setMsg(err?.message || 'Something went wrong. Please try again.');
    }
  }

  return { status, msg, onSubmit };
}
