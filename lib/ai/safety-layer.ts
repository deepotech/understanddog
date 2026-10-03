import { DogAnalysisResult } from "./types";

const DISTRESS_TRIGGERS: RegExp[] = [
  /\bpain\b/i,
  /\bhurt\b/i,
  /\binjur/i,
  /\bphysical distress\b/i,
  /\bsevere distress\b/i,
  /\bacute distress\b/i,
  /\bsudden (behavioral )?change\b/i,
  /\bletharg/i,
  /\blimp(ing)?\b/i,
  /\bgroan(ing)?\b/i,
  /\bwhimper(ing)?\b/i,
  /\bcrying\b/i,
  /\bdiscomfort\b/i,
  /\borthopedic\b/i,
  /\bgastrointestinal\b/i,
  /\bsick(ness)?\b/i,
  /\billness\b/i,
  /\bseizure\b/i,
  /\btrembl(e|ing)\b/i,
  /\bseparation distress\b/i,
];

const DEFAULT_VET_ADVISORY =
  "This interpretation may be consistent with distress or discomfort. If this vocalization is sudden, persistent, or accompanied by changes in mobility, appetite, or posture, consider contacting a qualified veterinarian.";

/**
 * Deterministic server-side safety verification:
 * Scans the AI interpretation, summary, observations, and contexts for distress indicators.
 * If detected, guarantees that an appropriate, cautious veterinary advisory is attached.
 */
export function applySafetyLayer(
  result: DogAnalysisResult,
  userContext?: string
): DogAnalysisResult {
  // If result is already an error/edge-state, leave as-is
  if (result.status !== "success") {
    return result;
  }

  const searchableText = [
    result.interpretation.primary,
    result.interpretation.summary,
    ...result.observations,
    ...result.possibleContexts,
    ...result.suggestions,
    userContext || "",
    result.vocalization === "whimpering" ? "whimpering discomfort" : "",
  ].join(" ");

  const hasDistressSignal = DISTRESS_TRIGGERS.some((regex) =>
    regex.test(searchableText)
  );

  if (hasDistressSignal) {
    // If no safety note or safety note lacks veterinary advice, apply standard cautious advisory
    if (
      !result.safetyNote ||
      !/veterinar|vet\b/i.test(result.safetyNote)
    ) {
      result.safetyNote = DEFAULT_VET_ADVISORY;
    }

    if (!result.recommendedAction || result.recommendedAction === "observe") {
      result.recommendedAction = "check_comfort";
    }
  }

  // Ensure disclaimer is always present
  if (!result.disclaimer) {
    result.disclaimer =
      "Dog Translator provides probabilistic behavioral interpretations grounded in canine bioacoustics. It does not literally translate dog language or diagnose medical conditions.";
  }

  return result;
}
