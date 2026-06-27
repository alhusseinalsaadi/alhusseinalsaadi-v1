# Meta Pixel Installation Guide

## Overview
Meta Pixel (formerly Facebook Pixel) has been installed on your website to track user actions for advertising and analytics purposes.

**Pixel ID:** `1571495927725589`

## What's Been Installed

### 1. Base Code (Automatic on All Pages)
The Meta Pixel base code is automatically loaded on every page through the `MetaPixel` component in `app/layout.tsx`. This includes:
- Pixel initialization
- Automatic PageView tracking
- Fallback pixel image for users without JavaScript

### 2. Event Tracking
Event tracking has been implemented on the following pages:

#### Contact Form (`app/contact/page.tsx`)
- **Event:** `Lead`
- **Triggers:** When a user successfully submits the contact form
- **Data Tracked:** 
  - Service type selected (if provided)
  - Form submission success
  - Automatically tracked by `trackContactForm()` utility

## How to Use the Tracking Utilities

### Basic Setup
Import the tracking functions in any client component:

```typescript
'use client';

import { 
  trackEvent, 
  trackLead, 
  trackContactForm,
  trackConsultationRequest,
  trackScheduleAppointment,
  trackContentView 
} from '@/lib/meta-pixel';
```

### Available Functions

#### 1. `trackEvent(eventName, parameters)`
Track a standard Meta Pixel event.

```typescript
trackEvent('ViewContent', {
  content_name: 'Service Page',
  content_type: 'product',
});
```

#### 2. `trackLead(parameters)`
Track a Lead event (general conversion).

```typescript
trackLead({
  content_name: 'Consultation Request',
  value: 0,
  currency: 'SAR',
});
```

#### 3. `trackContactForm(contactInfo)`
Track a contact form submission.

```typescript
trackContactForm({
  content_name: 'Legal Services - Commercial Law',
});
```

#### 4. `trackConsultationRequest(parameters)`
Track a consultation request.

```typescript
trackConsultationRequest({
  service_type: 'Commercial Law',
});
```

#### 5. `trackScheduleAppointment(parameters)`
Track an appointment booking.

```typescript
trackScheduleAppointment({
  appointment_type: 'Free Consultation',
});
```

#### 6. `trackContentView(contentName, parameters)`
Track when users view important content.

```typescript
trackContentView('Service - Commercial Law', {
  content_type: 'service',
});
```

#### 7. `trackPageView()`
Manually trigger a PageView event (automatically called on page load).

## Adding Tracking to Your Components

### Example 1: Track Service Page Views
In `app/services/[slug]/page.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { trackContentView } from '@/lib/meta-pixel';

export default function ServicePage({ params }: { params: { slug: string } }) {
  useEffect(() => {
    trackContentView(`Service - ${params.slug}`);
  }, [params.slug]);

  return (
    // Your component JSX
  );
}
```

### Example 2: Track Button Clicks
In a client component:

```typescript
'use client';

import { trackConsultationRequest } from '@/lib/meta-pixel';

export default function ConsultationButton() {
  const handleClick = () => {
    trackConsultationRequest({
      button_location: 'hero_section',
    });
    // Navigate or perform other actions
  };

  return (
    <button onClick={handleClick}>
      احجز استشارتك المجانية
    </button>
  );
}
```

### Example 3: Track Appointment Scheduling
In an appointment booking component:

```typescript
'use client';

import { trackScheduleAppointment } from '@/lib/meta-pixel';

const handleAppointmentSubmit = async () => {
  try {
    // Your appointment submission logic
    await submitAppointment(formData);
    
    // Track the successful appointment
    trackScheduleAppointment({
      appointment_date: formData.date,
      appointment_time: formData.time,
    });
  } catch (error) {
    console.error('Appointment failed:', error);
  }
};
```

## Monitoring Pixel Status

### In Meta Events Manager
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Select your Data Source (Web)
3. Check the status - should be **"Active"**
4. Data may take up to 20 minutes to appear after first installation

### Test the Pixel
1. Install the [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/)
2. Visit your website
3. You should see:
   - Pixel ID in the report
   - PageView events on page load
   - Lead events when forms are submitted

### Troubleshooting
- If status shows "No Activity Yet" after 30 minutes, verify:
  - The MetaPixel component is in `app/layout.tsx`
  - Scripts are loading in the page source
  - No browser extensions are blocking tracking
  - Console has no JavaScript errors

## Standard Events Supported

The following standard Meta Pixel events are configured:

- `ViewContent` - User views a page or content
- `Search` - User performs a search
- `AddToCart` - User adds item to cart (for e-commerce)
- `AddToWishlist` - User adds item to wishlist
- `InitiateCheckout` - Checkout process starts
- `AddPaymentInfo` - Payment information added
- `Purchase` - Purchase completed
- `Lead` - Lead generated (contact form, consultation request)
- `CompleteRegistration` - Registration completed

## Custom Events

For actions not covered by standard events, you can create custom events:

```typescript
trackEvent('CustomEventName', {
  custom_param_1: 'value1',
  custom_param_2: 'value2',
});
```

## Data Captured

The Meta Pixel automatically captures:
- URL and page title
- Device and browser information
- Referring URL
- User's IP address (hashed)
- Any custom parameters you pass

## Privacy & Compliance

Ensure compliance with:
- Your Privacy Policy mentions Meta Pixel tracking
- Users accept tracking (e.g., via cookie consent banner)
- PDPL (Personal Data Protection Law) requirements for Saudi Arabia
- GDPR if you have EU users

The existing cookie consent system (`CookieConsent` component) should handle user consent.

## Files Modified

1. **`components/layout/MetaPixel.tsx`** - New component for loading the pixel base code
2. **`app/layout.tsx`** - Added MetaPixel component to root layout
3. **`lib/meta-pixel.ts`** - New utility file with tracking functions
4. **`components/contact/ContactForm.tsx`** - Added conversion tracking for form submissions

## Next Steps

1. ✅ Base pixel code is installed
2. ✅ Contact form tracking is active
3. Add tracking to other key conversion points:
   - Appointment bookings
   - Service page views
   - WhatsApp contact button clicks
   - Call button clicks
4. Test with Meta Pixel Helper Chrome extension
5. Monitor in Meta Events Manager dashboard

## Support

For questions about:
- **Pixel Implementation:** Check the files listed above
- **Meta Pixel Features:** Visit [Meta Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- **Events Manager:** Visit [Meta Business Suite](https://business.facebook.com/)
