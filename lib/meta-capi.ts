// Meta Conversions API (server-side) — complements the browser pixel in lib/meta-pixel.ts.
// Events sent from both sides share an eventId so Meta deduplicates them.
// No-ops silently when META_CAPI_ACCESS_TOKEN is not configured.

import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1571495927725589";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Meta requires E.164-like digits for phone hashing: 05xxxxxxxx -> 9665xxxxxxxx
function normalizeSaudiPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("966")) return digits;
  if (digits.startsWith("05")) return "966" + digits.slice(1);
  if (digits.startsWith("5")) return "966" + digits;
  return digits;
}

export interface LeadEventInput {
  eventId?: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  clientIp?: string;
  userAgent?: string;
  sourceUrl?: string;
  fbp?: string; // _fbp cookie
  fbc?: string; // _fbc cookie
  contentName?: string;
}

export async function sendLeadEvent(input: LeadEventInput): Promise<void> {
  if (!ACCESS_TOKEN) return;

  try {
    const bizSdk = await import("facebook-nodejs-business-sdk");
    const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } = bizSdk;

    FacebookAdsApi.init(ACCESS_TOKEN);

    const userData = new UserData();
    if (input.email) userData.setEmails([sha256(input.email.trim().toLowerCase())]);
    if (input.phone) userData.setPhones([sha256(normalizeSaudiPhone(input.phone))]);
    if (input.name) {
      const parts = input.name.trim().toLowerCase().split(/\s+/);
      userData.setFirstName(sha256(parts[0]));
      if (parts.length > 1) userData.setLastName(sha256(parts[parts.length - 1]));
    }
    if (input.clientIp) userData.setClientIpAddress(input.clientIp);
    if (input.userAgent) userData.setClientUserAgent(input.userAgent);
    if (input.fbp) userData.setFbp(input.fbp);
    if (input.fbc) userData.setFbc(input.fbc);

    const customData = new CustomData();
    customData.setContentName(input.contentName || "Consultation Request");

    const serverEvent = new ServerEvent()
      .setEventName("Lead")
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource("website");

    if (input.eventId) serverEvent.setEventId(input.eventId);
    if (input.sourceUrl) serverEvent.setEventSourceUrl(input.sourceUrl);

    const request = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([serverEvent]);
    await request.execute();
  } catch (err) {
    // Tracking must never break lead capture — log and move on.
    console.error("[meta-capi] Lead event failed:", err instanceof Error ? err.message : err);
  }
}
