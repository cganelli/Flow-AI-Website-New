"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@/lib/analytics";

interface CalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  className?: string;
  minWidth?: number;
  height?: number;
}

interface CalendlyPrefill {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  guests?: string[];
  customAnswers?: Record<string, string>;
  date?: string;
}

interface CalendlyUTM {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

// Calendly types are declared in src/types/calendly.d.ts

export function CalendlyWidget({
  url,
  prefill,
  utm,
  className = "",
  minWidth = 320,
  height = 700,
}: CalendlyWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Calendly script
    const loadCalendlyScript = () => {
      if (window.Calendly) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
        Analytics.trackCalendlyEvent('embed_load');
      };
      script.onerror = () => {
        setError("Failed to load Calendly widget");
      };

      document.head.appendChild(script);
    };

    loadCalendlyScript();

    // Calendly event listeners
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;

      const eventData = e.data;

      switch (eventData.event) {
        case "calendly.event_scheduled":
          Analytics.trackCalendlyEvent('event_scheduled');
          Analytics.trackEvent({
            action: 'appointment_booked',
            category: 'conversion',
            label: 'calendly_success',
            value: 1,
            custom_parameters: {
              event_type: eventData.payload?.event_type,
              invitee_email: eventData.payload?.invitee?.email,
              scheduled_time: eventData.payload?.event?.start_time,
              timestamp: new Date().toISOString(),
            },
          });

          // Track successful booking conversion
          Analytics.trackBookingFunnelStep('booking_complete');
          break;

        case "calendly.profile_page_viewed":
          Analytics.trackEvent({
            action: 'calendly_profile_viewed',
            category: 'engagement',
            label: 'profile_page',
          });
          break;

        case "calendly.event_type_viewed":
          Analytics.trackEvent({
            action: 'calendly_event_type_viewed',
            category: 'engagement',
            label: eventData.payload?.event_type || 'unknown',
          });
          break;

        case "calendly.date_and_time_selected":
          Analytics.trackEvent({
            action: 'calendly_datetime_selected',
            category: 'engagement',
            label: 'datetime_selection',
            custom_parameters: {
              selected_time: eventData.payload?.start_time,
            },
          });
          break;
      }
    };

    window.addEventListener("message", handleCalendlyEvent);

    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.Calendly) return;

    const widget = document.getElementById("calendly-inline-widget");
    if (!widget) return;

    try {
      // Clear any existing content
      widget.innerHTML = "";

      // Initialize Calendly widget
      window.Calendly.initInlineWidget({
        url,
        parentElement: widget,
        prefill: prefill as Record<string, string> || {},
        utm: utm as Record<string, string> || {},
      });

      // Track widget initialization
      Analytics.trackEvent({
        action: 'calendly_widget_initialized',
        category: 'engagement',
        label: 'inline_widget',
        custom_parameters: {
          calendly_url: url,
          has_prefill: !!prefill,
          has_utm: !!utm,
        },
      });
    } catch (err) {
      console.error("Error initializing Calendly widget:", err);
      setError("Failed to initialize Calendly widget");
    }
  }, [isLoaded, url, prefill, utm]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">Booking System Unavailable</p>
          <p className="text-red-500 text-sm">
            Please contact us directly to schedule your appointment.
          </p>
          <a
            href="mailto:contact@flowai.com"
            className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`calendly-widget-container ${className}`}>
      {!isLoaded && (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading booking calendar...</p>
            <p className="text-gray-500 text-sm mt-1">This may take a few moments</p>
          </div>
        </div>
      )}

      <div
        id="calendly-inline-widget"
        style={{
          minWidth: `${minWidth}px`,
          height: `${height}px`,
          display: isLoaded ? "block" : "none",
        }}
        className="calendly-inline-widget"
      />

      {/* Calendly badge/link */}
      <div className="calendly-badge-widget" style={{ display: isLoaded ? "block" : "none" }}>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </div>
    </div>
  );
}

// Calendly popup trigger component
interface CalendlyPopupProps {
  url: string;
  text: string;
  className?: string;
  prefill?: CalendlyPrefill;
  utm?: CalendlyUTM;
  trackingData?: {
    ctaName: string;
    location: string;
  };
  children?: React.ReactNode;
}

export function CalendlyPopup({
  url,
  text,
  className = "",
  prefill,
  utm,
  trackingData,
  children,
}: CalendlyPopupProps) {
  const handleClick = () => {
    // Track CTA click
    if (trackingData) {
      Analytics.trackCTAClick(
        trackingData.ctaName,
        trackingData.location,
        "calendly_popup"
      );
    }

    // Track Calendly opening
    Analytics.trackCalendlyEvent('embed_load');
    Analytics.trackBookingFunnelStep('calendly_open');

    if (window.Calendly) {
      // Use showPopupWidget which accepts just the URL
      const fullUrl = new URL(url);
      if (prefill) {
        for (const [key, value] of Object.entries(prefill)) {
          fullUrl.searchParams.set(key, value);
        }
      }
      if (utm) {
        for (const [key, value] of Object.entries(utm)) {
          fullUrl.searchParams.set(key, value);
        }
      }
      window.Calendly.showPopupWidget(fullUrl.toString());
    } else {
      // Fallback to direct link
      window.open(url, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      type="button"
    >
      {children || text}
    </button>
  );
}
