// FILE: src/components/EmailJsFormBridge.tsx
'use client';

import { useEffect } from 'react';

// 1) Hidden forms so Netlify registers at deploy time
function NetlifyRegistrationMarkup() {
  return (
    <>
      {/* Contact page – has message/subject/inquiryType */}
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
        <input type="text" name="subject" />
        <input type="text" name="inquiryType" />
        <textarea name="message" />
      </form>

      {/* Home page audit / capture form – no message */}
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
      // Decide which registered form this visible form should use
      const isContact =
        !!form.querySelector('textarea[name="message"]') ||
        !!form.querySelector('[name="subject"]') ||
        !!form.querySelector('[name="inquiryType"]');
      const targetName = isContact ? 'contact' : 'audit';

      // Ensure required Netlify attributes
      if (!form.getAttribute('method')) form.setAttribute('method', 'POST');
      if (!form.hasAttribute('data-netlify')) form.setAttribute('data-netlify', 'true');

      // Ensure exactly ONE form-name with our target value
      const existingNames = form.querySelectorAll('input[name="form-name"]');
      existingNames.forEach((n, i) => i > 0 && n.remove()); // keep at most one
      let nameInput = existingNames[0] as HTMLInputElement | undefined;
      if (!nameInput) {
        nameInput = document.createElement('input');
        nameInput.type = 'hidden';
        nameInput.name = 'form-name';
        form.appendChild(nameInput);
      }
      nameInput.value = targetName;

      // Honeypot
      if (!form.querySelector('input[name="bot-field"]')) {
        const hp = document.createElement('input');
        hp.type = 'text';
        hp.name = 'bot-field';
        hp.id = 'bot-field';
        hp.tabIndex = -1;
        hp.setAttribute('autoComplete', 'off');
        hp.setAttribute('aria-hidden', 'true');
        hp.style.position = 'absolute';
        hp.style.left = '-9999px';
        form.appendChild(hp);
        
        // Add label for honeypot
        const label = document.createElement('label');
        label.htmlFor = 'bot-field';
        label.className = 'sr-only';
        label.textContent = 'Leave this field blank';
        form.insertBefore(label, hp);
        
        form.setAttribute('netlify-honeypot', 'bot-field');
      }

      // No redirect needed - we'll show inline thank you message
    });

    // Function to show inline thank you message
    function showThankYouMessage(form: HTMLFormElement) {
      // Hide the form
      form.style.display = 'none';
      
      // Create thank you message element
      const thankYouDiv = document.createElement('div');
      thankYouDiv.className = 'bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center';
      thankYouDiv.innerHTML = `
        <div class="mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Thanks — we got it!</h3>
          <p class="text-gray-600">
            We'll be in touch shortly.
          </p>
        </div>
      `;
      
      // Insert the thank you message after the form
      form.parentNode?.insertBefore(thankYouDiv, form.nextSibling);
    }

    // 2) Intercept submit BEFORE React handlers and post in Netlify's expected format
    async function onSubmit(ev: SubmitEvent) {
      const form = ev.target as HTMLFormElement | null;
      if (!form || form.tagName !== 'FORM') return;

      // Only handle forms we marked for Netlify
      if (!form.hasAttribute('data-netlify')) return;

      // Stop other JS handlers (like legacy JSON submits)
      ev.stopPropagation();
      ev.stopImmediatePropagation();

      // Native validation first
      if (!form.checkValidity()) return;

      ev.preventDefault();

      // Build x-www-form-urlencoded body (what Netlify expects)
      const fd = new FormData(form);
      const body = new URLSearchParams(Array.from(fd.entries()) as [string, string][]).toString();

      const action = form.getAttribute('action') || window.location.pathname || '/';
      try {
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (res.ok) {
          // Show inline thank you message instead of redirecting
          showThankYouMessage(form);
        } else {
          console.error('Netlify Forms submission failed:', res.status, await res.text());
          alert('Sorry — sending failed. Please email us at carissa@thisisflowai.com');
        }
      } catch (err) {
        console.error('Netlify Forms submission error:', err);
        alert('Sorry — sending failed. Please email us at carissa@thisisflowai.com');
      }
    }

    // Use capture phase to pre-empt React onSubmit
    document.addEventListener('submit', onSubmit as unknown as EventListener, true);
    return () => document.removeEventListener('submit', onSubmit as unknown as EventListener, true);
  }, []);

  return <NetlifyRegistrationMarkup />;
}
