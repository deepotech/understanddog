import {
  DogAnalysisResult,
  QualitativeConfidence,
  VocalizationType,
  AnalysisStatus,
} from "./types";

const VALID_VOCALIZATIONS: Set<VocalizationType> = new Set([
  "barking",
  "whining",
  "growling",
  "howling",
  "whimpering",
  "mixed",
  "unidentified",
]);

const VALID_STATUSES: Set<AnalysisStatus> = new Set([
  "success",
  "not_a_dog_sound",
  "insufficient_audio",
  "rate_limited",
  "invalid_audio",
  "unsupported_audio",
  "audio_too_large",
  "audio_too_short",
  "audio_too_long",
  "ai_timeout",
  "ai_unavailable",
  "ai_provider_error",
  "malformed_ai_response",
  "internal_error",
  "error",
]);

const VALID_CONFIDENCES: Set<QualitativeConfidence> = new Set([
  "possible",
  "likely",
  "strong",
]);

/**
 * Normalizes and validates arbitrary raw provider output into a strict DogAnalysisResult.
 * Defends against hallucinations, malformed JSON, and fabricated numerical percentages.
 */
export function normalizeAiResponse(
  raw: unknown,
  isDemoMode = false
): DogAnalysisResult {
  if (!raw || typeof raw !== "object") {
    return {
      status: "malformed_ai_response",
      isDemoMode,
      vocalization: "unidentified",
      interpretation: {
        primary: "Analysis Processing Issue",
        summary:
          "The AI provider returned an unrecognized response format. Please try again.",
        confidence: "possible",
      },
      possibleContexts: [],
      observations: [],
      suggestions: ["Try submitting another audio recording of your dog."],
      disclaimer:
        "UnderstandDog provides behavioral interpretations based on canine bioacoustics.",
    };
  }

  const obj = raw as Record<string, unknown>;

  // 1. Validate & Normalize Status
  let status: AnalysisStatus = "success";
  if (typeof obj.status === "string") {
    const s = obj.status.toLowerCase().trim() as AnalysisStatus;
    if (VALID_STATUSES.has(s)) {
      status = s;
    } else if (s.includes("not_dog") || s.includes("not_a_dog") || s.includes("human") || s.includes("noise")) {
      status = "not_a_dog_sound";
    } else if (s.includes("short") || s.includes("insufficient") || s.includes("silent")) {
      status = "insufficient_audio";
    }
  }

  // If status is edge-case or non-dog, handle cleanly
  if (status === "not_a_dog_sound") {
    return {
      status: "not_a_dog_sound",
      isDemoMode,
      vocalization: "unidentified",
      interpretation: {
        primary: "No Canine Vocalization Detected",
        summary:
          "The audio appears to contain ambient background noise, human speech, or silence rather than a recognizable dog sound.",
        confidence: "possible",
      },
      possibleContexts: ["Background ambient audio", "Microphone distant from pet"],
      observations: [
        "Acoustic frequencies do not align with canine vocal tract resonances.",
      ],
      suggestions: [
        "Record closer to your dog while they are actively vocalizing.",
        "Minimize background conversations, televisions, or loud fans.",
      ],
      disclaimer:
        "UnderstandDog requires detectable canine acoustic energy to perform behavioral interpretation.",
    };
  }

  if (status === "insufficient_audio") {
    return {
      status: "insufficient_audio",
      isDemoMode,
      vocalization: "unidentified",
      interpretation: {
        primary: "Insufficient Audio Signal",
        summary:
          "The audio clip was too short, faint, or muffled to extract clear acoustic harmonics.",
        confidence: "possible",
      },
      possibleContexts: ["Microphone cut off early", "Audio level too low"],
      observations: ["Signal length or amplitude fell below minimum acoustic threshold."],
      suggestions: [
        "Record for 3 to 10 seconds while your dog vocalizes.",
        "Ensure the microphone input level is sufficiently high.",
      ],
      disclaimer:
        "Accurate bioacoustic interpretation requires sufficient signal duration.",
    };
  }

  // 2. Validate & Normalize Vocalization Type
  let vocalization: VocalizationType = "unidentified";
  if (typeof obj.vocalization === "string") {
    const v = obj.vocalization.toLowerCase().trim() as VocalizationType;
    if (VALID_VOCALIZATIONS.has(v)) {
      vocalization = v;
    } else if (v.includes("bark")) {
      vocalization = "barking";
    } else if (v.includes("whin")) {
      vocalization = "whining";
    } else if (v.includes("growl")) {
      vocalization = "growling";
    } else if (v.includes("howl")) {
      vocalization = "howling";
    } else if (v.includes("whimper")) {
      vocalization = "whimpering";
    }
  }

  // 3. Validate & Normalize Interpretation & Confidence (STRICTLY qualitative)
  const interpRaw = (obj.interpretation && typeof obj.interpretation === "object"
    ? obj.interpretation
    : {}) as Record<string, unknown>;

  const primary =
    typeof interpRaw.primary === "string" && interpRaw.primary.trim().length > 0
      ? interpRaw.primary.trim()
      : typeof obj.primaryInterpretation === "string" && obj.primaryInterpretation.trim().length > 0
      ? obj.primaryInterpretation.trim()
      : "Behavioral Vocalization Pattern";

  const summary =
    typeof interpRaw.summary === "string" && interpRaw.summary.trim().length > 0
      ? interpRaw.summary.trim()
      : typeof obj.summary === "string" && obj.summary.trim().length > 0
      ? obj.summary.trim()
      : "Acoustic characteristics are consistent with standard canine vocal communication.";

  // Normalize confidence: NEVER allow numbers (e.g. 97%, 0.95)
  let confidence: QualitativeConfidence = "likely";
  const rawConf = String(interpRaw.confidence || obj.confidence || "").toLowerCase().trim();

  if (rawConf.includes("strong") || rawConf.includes("high")) {
    confidence = "strong";
  } else if (rawConf.includes("possible") || rawConf.includes("low")) {
    confidence = "possible";
  } else if (VALID_CONFIDENCES.has(rawConf as QualitativeConfidence)) {
    confidence = rawConf as QualitativeConfidence;
  } else {
    // If model attempted to return a percentage like "98%", normalize to "likely"
    confidence = "likely";
  }

  // 4. Validate & Normalize Lists
  const sanitizeList = (arr: unknown, defaultFallback: string[]): string[] => {
    if (!Array.isArray(arr)) return defaultFallback;
    const clean = arr
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      .map((item) => item.trim());
    return clean.length > 0 ? clean : defaultFallback;
  };

  const possibleContexts = sanitizeList(
    obj.possibleContexts || obj.contexts,
    ["General interaction", "Environmental monitoring"]
  );

  const observations = sanitizeList(
    obj.observations || obj.acousticObservations,
    ["Characteristic harmonic frequency and burst structure detected."]
  );

  const suggestions = sanitizeList(
    obj.suggestions || obj.nextSteps,
    [
      "Observe your dog's overall body language and ear carriage.",
      "Respond calmly and provide appropriate environmental reassurance.",
    ]
  );

  const safetyNote =
    typeof obj.safetyNote === "string" && obj.safetyNote.trim().length > 0
      ? obj.safetyNote.trim()
      : undefined;

  let recommendedAction = obj.recommendedAction as DogAnalysisResult["recommendedAction"];
  if (
    !recommendedAction ||
    !["observe", "play_or_engage", "give_space", "check_comfort", "vet_consult"].includes(
      recommendedAction
    )
  ) {
    recommendedAction = safetyNote ? "check_comfort" : "observe";
  }

  return {
    status: "success",
    isDemoMode,
    vocalization,
    interpretation: {
      primary,
      summary,
      confidence,
    },
    possibleContexts,
    observations,
    suggestions,
    safetyNote,
    recommendedAction,
    disclaimer:
      "UnderstandDog provides probabilistic behavioral interpretations grounded in canine bioacoustics. It does not literally translate dog language or diagnose medical conditions.",
  };
}
