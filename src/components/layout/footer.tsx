"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [embedDomain, setEmbedDomain] = useState('same.dev'); // Default to production domain

  // Detect if we're on localhost and adjust embed domain accordingly (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      setEmbedDomain(isLocalhost ? 'localhost' : 'same.dev');
    }
  }, []);

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
            <h3 className="text-brand-lg mb-4">
              Book your FREE AI audit
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              In this 20 to 30 minute session we look at your workflows and tools, then highlight your best starting points for AI.
            </p>
          </div>

          {/* Calendly Widget Container with Left Content */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Content */}
              <div className="space-y-8">
                {/* Workflow and tools review */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary mr-3 flex-shrink-0 mt-1 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Workflow and tools review
                  </h4>
                  <ul className="space-y-2 ml-9">
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Walk through 2 to 3 core workflows such as lead follow up, reporting, support, or content</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Note where people spend the most time and where work stalls or gets re done</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>List the tools you already use so AI support fits into your current stack</span>
                    </li>
                  </ul>
                </div>

                {/* AI opportunity list */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary mr-3 flex-shrink-0 mt-1 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    AI opportunity list
                  </h4>
                  <ul className="space-y-2 ml-9">
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Highlight the steps in those workflows that suit AI agents or automation</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Rank opportunities by effort and impact so you know what to tackle first</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Flag quick wins your team tests in the next few weeks and bigger projects to park for later</span>
                    </li>
                  </ul>
                </div>

                {/* 30 day action outline */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary mr-3 flex-shrink-0 mt-1 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    30 day action outline
                  </h4>
                  <ul className="space-y-2 ml-9">
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Pick one or two opportunities for the next 30 days that match your capacity</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Suggest training or starter resources for your staff based on where they are today</span>
                    </li>
                    <li className="text-white/90 flex items-start">
                      <span className="text-primary mr-2 flex-shrink-0">–</span>
                      <span>Recommend simple metrics to track AI results</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side - Calendly Widget */}
              <div className="w-full">
            {!showFallback ? (
              <>
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    src={calendlyIframeUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Schedule your FREE AI audit meeting with Flow AI"
                    className="rounded-lg"
                    style={{
                      minWidth: '320px',
                      height: '700px'
                    }}
                    onError={() => setShowFallback(true)}
                        aria-label="Calendly booking widget to schedule your FREE AI audit"
                  />
                </div>

                {/* Alternative booking option */}
                <div className="text-center mt-6">
                  <button
                    onClick={openCalendlyPopup}
                    className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Book your FREE AI audit"
                      >
                        Book your FREE AI audit
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
            </div>
          </div>
        </section>

        {/* Social Media Icons */}
        <section className="flex justify-center gap-6 mt-12 mb-8" aria-label="Social media links">
          <a
            href="https://www.tiktok.com/@thisisflow.ai?_t=ZT-90cD5HaqOII&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2"
            aria-label="Follow us on TikTok"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/thisisflowai?igsh=c2h4MnEzd3pvNm01&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2"
            aria-label="Follow us on Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
            </svg>
          </a>
          <a
            href="https://www.threads.com/@thisisflowai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2"
            aria-label="Follow us on Threads"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126.742a12.967 12.967 0 0 0-2.868-.135c-1.197.062-2.146.414-2.822.996-.634.548-.96 1.283-.916 2.072.043.789.396 1.474 1 1.93.604.456 1.413.661 2.269.601 1.226-.068 2.175-.539 2.82-1.4.647-.862.984-2.133.984-3.784v-.444c0-1.848-.265-3.333-.787-4.416-.54-1.122-1.333-1.96-2.353-2.49-1.02-.53-2.273-.795-3.726-.795-1.453 0-2.706.265-3.726.795-1.02.53-1.813 1.368-2.353 2.49-.522 1.083-.787 2.568-.787 4.416v.444c0 1.651.337 2.922.984 3.784.645.861 1.594 1.332 2.82 1.4.856.06 1.665-.145 2.269-.601.604-.456.957-1.141 1-1.93.044-.789-.282-1.524-.916-2.072-.676-.582-1.625-.934-2.822-.996a12.967 12.967 0 0 0-2.868.135l-.126-.742a13.853 13.853 0 0 1 3.02-.142c1.464.084 2.703.531 3.583 1.29.922.798 1.395 1.893 1.33 3.083-.067 1.224-.689 2.275-1.752 2.964-.898.583-2.057.866-3.259.8-1.59-.085-2.844-.687-3.73-1.789-.662-.826-1.092-1.92-1.284-3.272-.761.45-1.324 1.04-1.634 1.75-.528 1.205-.557 3.185 1.09 4.798 1.442 1.414 3.177 2.025 5.8 2.045 2.909-.019 5.11-.934 6.54-2.717 1.339-1.668 2.03-4.078 2.057-7.164-.027-3.086-.718-5.496-2.057-7.164-1.43-1.781-3.631-2.695-6.54-2.717-4.406.031-7.2 2.055-8.304 6.015l-2.04-.569c.651-2.337 1.832-4.177 3.509-5.467C7.137.725 9.434.02 12.18 0h.014c3.58.024 6.334 1.205 8.184 3.509 1.645 2.052 2.495 4.903 2.525 8.482v.017c-.03 3.576-.88 6.43-2.525 8.482-1.85 2.304-4.603 3.485-8.184 3.509z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/thisisflowai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2"
            aria-label="Follow us on LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@ThisIsFlowAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2"
            aria-label="Subscribe to our YouTube channel"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
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
              href="/accessibility"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Accessibility
            </Link>
            <span className="text-white/40" aria-hidden="true">|</span>
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
            >
              Home
            </Link>
          </div>
          <p className="text-white/60 text-center">©2026 Flow AI</p>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
