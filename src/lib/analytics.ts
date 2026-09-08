export type ConversionEvent = 'hero_demo_play' | 'hero_primary_cta_click' | 'smart_call_demo_play' | 'smart_call_cta_click' | 'contact_form_start' | 'contact_form_submit' | 'calendar_booking_click' | 'phone_demo_click';
type EventPayload = { name: ConversionEvent; page: string };
let sink: ((event: EventPayload) => void) | undefined;
// Connect one provider only after the required consent. No storage or network by default.
export function configureAnalytics(provider?: (event: EventPayload) => void) { sink = provider; }
export function trackEvent(name: ConversionEvent) {
  if (typeof window === 'undefined' || !sink) return;
  try { sink({ name, page: window.location.pathname }); } catch { /* Analytics must never interrupt navigation or forms. */ }
}
