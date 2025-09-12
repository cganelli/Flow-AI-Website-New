"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on FAQ or Contact page and need to link back to home page sections
  const isOnFAQPage = pathname === '/faq';
  const isOnContactPage = pathname === '/contact';
  const needsHomeLinks = isOnFAQPage || isOnContactPage;
  const solutionsHref = needsHomeLinks ? '/#ai-capabilities' : '#ai-capabilities';
  const processHref = needsHomeLinks ? '/#process' : '#process';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray/10"
      role="banner"
    >
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-primary text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Flow AI - Go to homepage"
          >
            <div className="flex items-center overflow-hidden h-16">
              <img
                src="/images/Flow_AI_Horizontal_Logo.png"
                alt="Flow AI company logo"
                width={200}
                height={50}
                className="h-52 w-auto object-cover"
                style={{
                  objectPosition: 'center',
                  clipPath: 'inset(25% 0 25% 0)',
                  transform: 'translateY(5%)'
                }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href={solutionsHref}
              className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            >
              Solutions
            </Link>
            <Link
              href={processHref}
              className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            >
              Process
            </Link>
            <Link
              href="/faq"
              className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            >
              Contact
            </Link>
            <a
              href="#book-appointment"
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Claim Your FREE AI Audit - Book appointment"
            >
              Claim Your FREE Audit
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden py-4 border-t border-gray/10"
            id="mobile-navigation"
          >
            <nav
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <a
                href={solutionsHref}
                className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Solutions
              </a>
              <a
                href={processHref}
                className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Process
              </a>
              <Link
                href="/faq"
                className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-gray hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="#book-appointment"
                className="btn-primary inline-block text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                onClick={() => setIsOpen(false)}
                aria-label="Claim Your FREE AI Audit - Book appointment"
              >
                Claim Your FREE Audit
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
