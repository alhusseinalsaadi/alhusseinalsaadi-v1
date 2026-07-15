// Minimal type declarations for facebook-nodejs-business-sdk (no official types).
// Covers only the Conversions API surface used in lib/meta-capi.ts.
declare module "facebook-nodejs-business-sdk" {
  export class FacebookAdsApi {
    static init(accessToken: string): FacebookAdsApi;
  }

  export class UserData {
    setEmails(emails: string[]): UserData;
    setPhones(phones: string[]): UserData;
    setFirstName(hashedFirstName: string): UserData;
    setLastName(hashedLastName: string): UserData;
    setClientIpAddress(ip: string): UserData;
    setClientUserAgent(userAgent: string): UserData;
    setFbp(fbp: string): UserData;
    setFbc(fbc: string): UserData;
  }

  export class CustomData {
    setContentName(name: string): CustomData;
    setValue(value: number): CustomData;
    setCurrency(currency: string): CustomData;
  }

  export class ServerEvent {
    setEventName(name: string): ServerEvent;
    setEventTime(time: number): ServerEvent;
    setEventId(id: string): ServerEvent;
    setEventSourceUrl(url: string): ServerEvent;
    setUserData(userData: UserData): ServerEvent;
    setCustomData(customData: CustomData): ServerEvent;
    setActionSource(source: string): ServerEvent;
  }

  export class EventRequest {
    constructor(accessToken: string, pixelId: string);
    setEvents(events: ServerEvent[]): EventRequest;
    execute(): Promise<unknown>;
  }
}
