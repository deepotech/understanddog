import { AnalyticsEventName, AnalyticsEventPayloads } from "./events";

export interface AnalyticsTracker {
  track<K extends AnalyticsEventName>(event: K, payload: AnalyticsEventPayloads[K]): void;
}

class ConsoleAnalyticsTracker implements AnalyticsTracker {
  track<K extends AnalyticsEventName>(event: K, payload: AnalyticsEventPayloads[K]): void {
    if (process.env.NODE_ENV !== "production") {
      // In development, log to assist debugging
      console.log(`[Analytics] ${event}`, payload);
    }
    // Production tracker will route to privacy-friendly analytics (e.g. Plausible/PostHog)
    // without tracking IP or personal identifiable data.
  }
}

export const analytics: AnalyticsTracker = new ConsoleAnalyticsTracker();
