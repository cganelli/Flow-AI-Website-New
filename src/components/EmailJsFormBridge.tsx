// FILE: src/components/EmailJsFormBridge.tsx
'use client';

import { useEffect } from 'react';

// This component does TWO things:
// 1) Emits hidden forms so Netlify registers them at deploy time.
// 2) At runtime, adds the required Netlify attributes + hidden inputs
//    to your visible forms so submissions are routed correctly.

function NetlifyRegistrationMarkup() {
  return (
    <>
      {/* Hidden "contact" form (richer form that includes a message) */}
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
        <textarea name="message" />
      </form>

      {/* Hidden "audit" form (simple home-page form) */}
      <form name="audit" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
      </form>
    </>
  );
}

export default function EmailJsFormBridge() {
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('form')) as HTMLFormElement[];

    forms.forEach((form) => {
      const isContact =
        !!form.querySelector('textarea[name="message"]') ||
        !!form.querySelector('[name="subject"]') ||
        !!form.querySelector('[name="inquiryType"]');
      const formName = isContact ? 'contact' : 'audit';

      if (!form.getAttribute('method')) form.setAttribute('method', 'POST');
      if (!form.hasAttribute('data-netlify')) form.setAttribute('data-netlify', 'true');

      if (!form.querySelector('input[name="form-name"]')) {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'form-name';
        hidden.value = formName;
        form.appendChild(hidden);
      }

      if (!form.querySelector('input[name="bot-field"]')) {
        const hp = document.createElement('input');
        hp.type = 'text';
        hp.name = 'bot-field';
        (hp.style as any).display = 'none';
        form.appendChild(hp);
        form.setAttribute('netlify-honeypot', 'bot-field');
      }

      // Success redirect to /thank-you (only if not already set)
      if (!form.querySelector('input[name="redirect"]')) {
        const redir = document.createElement('input');
        redir.type = 'hidden';
        redir.name = 'redirect';
        redir.value = '/thank-you';
        form.appendChild(redir);
      }
    });
  }, []);

  // Hidden registration markup is rendered into the HTML at build time
  return <NetlifyRegistrationMarkup />;
}
