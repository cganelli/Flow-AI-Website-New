import React from 'react';
import HomePage from '@/components/pages/home-page';
import { HomePageStructuredData } from '@/components/seo/structured-data';
import EmailJsFormBridge from '@/components/EmailJsFormBridge';

// Hidden forms for Netlify Forms detection
const NetlifyFormsDetection = () => (
  <>
    {/* Contact Capture Form */}
    <form
      name="contact-capture-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="text" name="name" autoComplete="name" />
      <input type="email" name="email" autoComplete="email" />
      <input type="text" name="company" autoComplete="organization" />
      <input type="tel" name="phone" autoComplete="tel" />
    </form>

    {/* Contact/Inquiry Form */}
    <form
      name="inquiry-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="text" name="name" autoComplete="name" />
      <input type="email" name="email" autoComplete="email" />
      <input type="text" name="company" autoComplete="organization" />
      <input type="tel" name="phone" autoComplete="tel" />
      <input type="text" name="inquiryType" autoComplete="off" />
      <input type="text" name="subject" autoComplete="subject" />
      <textarea name="message" autoComplete="off" />
    </form>
  </>
);

export default function Home() {
  return (
    <>
      <EmailJsFormBridge />
      <HomePageStructuredData />
      <NetlifyFormsDetection />
      <HomePage />
    </>
  );
}
