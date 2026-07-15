// Meta Pixel tracking utilities
// Use these functions to track events throughout your application

const PIXEL_ID = '1571495927725589';

export type StandardEventName =
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

export interface EventParameters {
  content_name?: string;
  content_type?: string;
  value?: number;
  currency?: string;
  content_ids?: string[];
  num_items?: number;
  status?: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: StandardEventName | string, parameters?: EventParameters, eventId?: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    if (eventId) {
      (window as any).fbq('track', eventName, parameters || {}, { eventID: eventId });
    } else {
      (window as any).fbq('track', eventName, parameters || {});
    }
  }
}

export function trackPageView() {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }
}

export function trackLead(parameters?: EventParameters) {
  trackEvent('Lead', parameters);
}

export function trackContactForm(contactInfo?: Partial<EventParameters>, eventId?: string) {
  trackEvent('Lead', {
    content_name: 'Contact Form Submission',
    ...contactInfo,
  }, eventId);
}

export function trackConsultationRequest(parameters?: EventParameters) {
  trackEvent('Lead', {
    content_name: 'Consultation Request',
    ...parameters,
  });
}

export function trackScheduleAppointment(parameters?: EventParameters) {
  trackEvent('Lead', {
    content_name: 'Appointment Scheduled',
    ...parameters,
  });
}

export function trackContentView(contentName: string, parameters?: EventParameters) {
  trackEvent('ViewContent', {
    content_name: contentName,
    ...parameters,
  });
}
