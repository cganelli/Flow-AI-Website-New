// Analytics tracking for conversion optimization

// Define proper types for analytics functions
type GtagFunction = (command: string, ...args: unknown[]) => void;
type FbqFunction = (command: string, ...args: unknown[]) => void;
type HsqFunction = unknown[];

declare global {
  interface Window {
    gtag?: GtagFunction;
    fbq?: FbqFunction;
    _hsq?: HsqFunction;
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  preferredDate: string;
  preferredTime: string;
  businessDetails?: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: Keeping class structure for namespace organization and future extensibility
export class Analytics {
  private static isInitialized = false;

  // Initialize analytics services
  static init() {
    if (Analytics.isInitialized) return;

    // Google Analytics 4
    Analytics.initGA4();

    // Facebook Pixel (optional)
    Analytics.initFacebookPixel();

    // HubSpot (optional)
    Analytics.initHubSpot();

    Analytics.isInitialized = true;
  }

  // Google Analytics 4 initialization
  private static initGA4() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) return;

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || ((...args: unknown[]) => {
      (window.gtag as unknown as { q: unknown[] }).q = (window.gtag as unknown as { q: unknown[] }).q || [];
      (window.gtag as unknown as { q: unknown[] }).q.push(args);
    });

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Facebook Pixel initialization
  private static initFacebookPixel() {
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (!FB_PIXEL_ID) return;

    window.fbq = window.fbq || ((...args: unknown[]) => {
      const fbqExtended = window.fbq as unknown as { callMethod?: (...args: unknown[]) => void; queue: unknown[] };
      if (fbqExtended.callMethod) {
        fbqExtended.callMethod.apply(window.fbq, args);
      } else {
        fbqExtended.queue.push(args);
      }
    });

    const fbqExtended = window.fbq as unknown as { loaded?: boolean; queue: unknown[] };
    if (!fbqExtended.loaded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
      fbqExtended.loaded = true;
    }

    fbqExtended.queue = fbqExtended.queue || [];
    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // HubSpot initialization
  private static initHubSpot() {
    const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    if (!HUBSPOT_PORTAL_ID) return;

    window._hsq = window._hsq || [];
    const script = document.createElement('script');
    script.async = true;
    script.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
    document.head.appendChild(script);
  }

  // Track generic events - overloaded method signatures
  static trackEvent(event: AnalyticsEvent): void;
  static trackEvent(eventName: string, properties?: Record<string, string | number | boolean>): void;
  static trackEvent(
    eventOrName: AnalyticsEvent | string,
    properties?: Record<string, string | number | boolean>
  ): void {
    let action: string;
    let category: string;
    let label: string | undefined;
    let value: number | undefined;
    let custom_parameters: Record<string, string | number | boolean> | undefined;

    // Handle both signature patterns
    if (typeof eventOrName === 'string') {
      // New signature: trackEvent(eventName, properties)
      action = eventOrName;
      category = (properties?.category as string) || 'general';
      label = properties?.label as string;
      value = properties?.value as number;
      custom_parameters = properties;
    } else {
      // Legacy signature: trackEvent(event)
      const event = eventOrName;
      action = event.action;
      category = event.category;
      label = event.label;
      value = event.value;
      custom_parameters = event.custom_parameters;
    }

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters,
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', action, {
        category,
        label,
        value,
        ...custom_parameters,
      });
    }

    // HubSpot
    if (window._hsq) {
      window._hsq.push(['trackEvent', {
        id: action,
        category,
        label,
        value,
        ...custom_parameters,
      }]);
    }

    // Console log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', { action, category, label, value, custom_parameters });
    }
  }

  // Booking funnel tracking
  static trackBookingFunnelStep(step: 'page_view' | 'form_start' | 'form_field_complete' | 'form_submit' | 'calendly_open' | 'booking_complete', data?: Partial<BookingData>) {
    Analytics.trackEvent({
      action: 'booking_funnel',
      category: 'conversion',
      label: step,
      custom_parameters: {
        funnel_step: step,
        timestamp: new Date().toISOString(),
        ...data,
      },
    });
  }

  // Form interaction tracking
  static trackFormInteraction(field: string, action: 'focus' | 'blur' | 'change' | 'error') {
    Analytics.trackEvent({
      action: 'form_interaction',
      category: 'engagement',
      label: `${field}_${action}`,
      custom_parameters: {
        field,
        interaction: action,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // CTA click tracking
  static trackCTAClick(ctaName: string, location: string, destination: string) {
    Analytics.trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: ctaName,
      custom_parameters: {
        cta_name: ctaName,
        cta_location: location,
        destination,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Calendly integration tracking
  static trackCalendlyEvent(eventType: 'embed_load' | 'event_scheduled' | 'embed_close') {
    Analytics.trackEvent({
      action: 'calendly_interaction',
      category: 'conversion',
      label: eventType,
      custom_parameters: {
        calendly_event: eventType,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Lead generation tracking
  static trackLead(leadData: BookingData) {
    // Google Analytics conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion ID
        event_category: 'lead_generation',
        event_label: 'booking_form_submission',
        value: 1,
      });
    }

    // Facebook Pixel lead event
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'AI Strategy Session Booking',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'USD',
      });
    }

    // Track the lead details
    Analytics.trackEvent({
      action: 'lead_generated',
      category: 'conversion',
      label: 'booking_form',
      value: 1,
      custom_parameters: {
        lead_source: 'website_booking_form',
        company: leadData.company || '',
        has_business_details: !!leadData.businessDetails,
        preferred_date: leadData.preferredDate,
        preferred_time: leadData.preferredTime,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Page view tracking with enhanced data
  static trackPageView(pageName: string, additionalData?: Record<string, string | number | boolean>) {
    Analytics.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pageName,
      custom_parameters: {
        page_name: pageName,
        page_url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        ...additionalData,
      },
    });
  }

  // Email collection tracking
  static trackEmailCollection(email: string, source: string) {
    Analytics.trackEvent({
      action: 'email_collected',
      category: 'lead_generation',
      label: source,
      custom_parameters: {
        email_domain: email.split('@')[1],
        source,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

// Form analytics hook for React components
export const useFormAnalytics = () => {
  const trackFieldInteraction = (field: string, action: 'focus' | 'blur' | 'change' | 'error') => {
    Analytics.trackFormInteraction(field, action);
  };

  const trackFormStart = () => {
    Analytics.trackBookingFunnelStep('form_start');
  };

  const trackFormSubmit = (data: BookingData) => {
    Analytics.trackBookingFunnelStep('form_submit', data);
    Analytics.trackLead(data);
    Analytics.trackEmailCollection(data.email, 'booking_form');
  };

  return {
    trackFieldInteraction,
    trackFormStart,
    trackFormSubmit,
  };
};

// CTA analytics hook
export const useCTAAnalytics = () => {
  const trackCTAClick = (ctaName: string, location: string, destination: string) => {
    Analytics.trackCTAClick(ctaName, location, destination);
  };

  return { trackCTAClick };
};
