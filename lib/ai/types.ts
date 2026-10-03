export type QualitativeConfidence = "possible" | "likely" | "strong";

export type VocalizationType =
  | "barking"
  | "whining"
  | "growling"
  | "howling"
  | "whimpering"
  | "mixed"
  | "unidentified";

export type AnalysisStatus =
  | "success"
  | "not_a_dog_sound"
  | "insufficient_audio"
  | "rate_limited"
  | "invalid_audio"
  | "unsupported_audio"
  | "audio_too_large"
  | "audio_too_short"
  | "audio_too_long"
  | "ai_timeout"
  | "ai_unavailable"
  | "ai_provider_error"
  | "malformed_ai_response"
  | "internal_error"
  | "error";

export type ContextTrigger =
  | "playing"
  | "someone_arrived"
  | "left_alone"
  | "saw_another_dog"
  | "wanted_food"
  | "resting_sleeping"
  | "unknown";

export interface DogVocalizationInput {
  audioBuffer: Buffer;
  mimeType: string;
  durationSeconds?: number;
  fileName?: string;
  context?: ContextTrigger | string;
  observedBehaviors?: string[];
}

export interface DogAnalysisResult {
  status: AnalysisStatus;
  isDemoMode?: boolean;
  vocalization: VocalizationType;
  interpretation: {
    primary: string;
    summary: string;
    confidence: QualitativeConfidence;
  };
  possibleContexts: string[];
  observations: string[];
  suggestions: string[];
  safetyNote?: string;
  recommendedAction?:
    | "observe"
    | "play_or_engage"
    | "give_space"
    | "check_comfort"
    | "vet_consult";
  disclaimer: string;
  errorCode?: string;
  latencyMs?: number;
}
