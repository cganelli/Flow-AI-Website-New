"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [showFallback, setShowFallback] = useState(false);

  // Detect if we're on localhost and adjust embed domain accordingly
  const isLocalhost = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Use appropriate embed domain for development vs production
  const embedDomain = isLocalhost ? 'localhost' : 'same.dev';
  const calendlyIframeUrl = `https://calendly.com/carissa-thisisflowai/30min?embed_domain=${embedDomain}&embed_type=Inline&hide_event_type_details=1&primary_color=f97316`;

  // Calendly popup fallback for when iframe fails
  const openCalendlyPopup = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.showPopupWidget('https://calendly.com/carissa-thisisflowai/30min?primary_color=f97316');
    } else {
      // If Calendly widget isn't loaded, show inline widget
      setShowFallback(true);
    }
  };

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <footer
      id="book-appointment"
      className="bg-black text-white py-20"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="container-custom">
        <section className="flex flex-col items-center mb-12">
          <h2
            id="footer-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-3xl mb-8"
          >
            We handle complex AI, so your business can focus on growth.
          </h2>

          {/* CTA Above Calendly Widget */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Book Your FREE AI Audit
            </h3>
          </div>

          {/* Calendly Widget Container */}
          <div className="w-full max-w-5xl">
            {!showFallback ? (
              <>
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    src={calendlyIframeUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Schedule your free AI audit meeting with Flow AI"
                    className="rounded-lg"
                    style={{
                      minWidth: '320px',
                      height: '700px'
                    }}
                    onError={() => setShowFallback(true)}
                    aria-label="Calendly booking widget to schedule your free AI audit"
                  />
                </div>

                {/* Alternative booking option */}
                <div className="text-center mt-6">
                  <p className="text-white/80 mb-4">Prefer a popup booking experience?</p>
                  <button
                    onClick={openCalendlyPopup}
                    className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Open Calendly booking popup for scheduling your AI audit"
                  >
                    Open Booking Popup
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Calendly Inline Widget Fallback */}
                <div
                  className="calendly-inline-widget bg-white rounded-lg"
                  data-url="https://calendly.com/carissa-thisisflowai/30min?primary_color=f97316"
                  style={{ minWidth: '320px', height: '700px' }}
                  role="region"
                  aria-label="Alternative Calendly booking widget"
                ></div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowFallback(false)}
                    className="text-white/80 hover:text-white underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                    aria-label="Switch back to iframe booking view"
                  >
                    ← Back to iframe view
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <nav
          className="flex flex-col items-center mt-8 border-t border-white/20 pt-8"
          aria-label="Footer navigation"
        >
          <div className="flex items-center flex-wrap justify-center gap-4 mb-4">
            <Link
              href="/faq"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              FAQ
            </Link>
            <span className="text-white/40" aria-hidden="true">|</span>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Contact
            </Link>
            <span className="text-white/40" aria-hidden="true">|</span>
            <Link
              href="/privacy-terms"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Privacy & Terms
            </Link>
            <span className="text-white/40" aria-hidden="true">|</span>
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Home
            </Link>
          </div>
          <p className="text-white/60 text-center">©2025 Flow AI</p>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
