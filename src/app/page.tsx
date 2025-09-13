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
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="company" />
      <input type="tel" name="phone" />
    </form>

    {/* Contact/Inquiry Form */}
    <form
      name="inquiry-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="company" />
      <input type="tel" name="phone" />
      <input type="text" name="inquiryType" />
      <input type="text" name="subject" />
      <textarea name="message" />
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
