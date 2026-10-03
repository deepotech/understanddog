export type AnalyticsEventName =
  | "translator_started"
  | "translator_completed"
  | "translator_failed"
  | "audio_recorded"
  | "audio_uploaded"
  | "bark_analyzer_started"
  | "bark_analyzer_completed";

export interface AnalyticsEventPayloads {
  translator_started: { source: "recording" | "upload"; hasContext: boolean };
  translator_completed: {
    vocalization: string;
    confidence: string;
    durationSeconds?: number;
    isDemoMode?: boolean;
  };
  translator_failed: { errorType: string; status?: string };
  audio_recorded: { durationSeconds: number };
  audio_uploaded: { sizeBytes: number; format: string };
  bark_analyzer_started: { triggerContext?: string };
  bark_analyzer_completed: { patternIdentified?: string };
}
