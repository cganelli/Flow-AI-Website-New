"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const consentChoice = localStorage.getItem('cookieConsent');
    if (!consentChoice) {
      setShowBanner(true);
      // Delay showing animation for better UX
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());

    // Track analytics consent
    Analytics.trackEvent({
      action: 'cookie_consent_accepted',
      category: 'privacy',
      label: 'accept_all_cookies',
      custom_parameters: {
        consent_type: 'all',
        timestamp: new Date().toISOString()
      }
    });

    closeBanner();
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary_only');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());

    // Track essential consent only
    Analytics.trackEvent({
      action: 'cookie_consent_necessary_only',
      category: 'privacy',
      label: 'necessary_cookies_only',
      custom_parameters: {
        consent_type: 'necessary_only',
        timestamp: new Date().toISOString()
      }
    });

    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="bg-white border-t-2 border-primary shadow-lg">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Cookie Notice Text */}
            <div className="flex-1 text-sm text-gray-700">
              <p className="mb-2">
                <strong>🍪 We use cookies to enhance your experience</strong>
              </p>
              <p>
                We use essential cookies for website functionality and optional cookies for analytics and marketing.
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences in our{' '}
                <Link
                  href="/privacy-terms"
                  className="text-primary hover:underline font-medium"
                  onClick={() => Analytics.trackEvent({
                    action: 'cookie_banner_privacy_link_click',
                    category: 'navigation',
                    label: 'privacy_policy_from_banner'
                  })}
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Cookie Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                Necessary Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                type="button"
              >
                Accept All Cookies
              </button>
            </div>
          </div>

          {/* Cookie Categories */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
              <div>
                <strong className="text-gray-800">Essential Cookies:</strong> Required for website functionality
              </div>
              <div>
                <strong className="text-gray-800">Analytics Cookies:</strong> Help us understand how you use our site
              </div>
              <div>
                <strong className="text-gray-800">Marketing Cookies:</strong> Used for targeted advertising and tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
