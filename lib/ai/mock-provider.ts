import { DogAiProvider } from "./provider";
import { DogAnalysisResult, DogVocalizationInput, QualitativeConfidence, VocalizationType } from "./types";

export class MockDogAiProvider implements DogAiProvider {
  name = "mock-dog-ai";

  async analyzeDogSound(input: DogVocalizationInput): Promise<DogAnalysisResult> {
    // Artificial latency to simulate realistic processing in local testing
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Edge case 1: Insufficient audio length/buffer
    if (input.audioBuffer.length < 500 || (input.durationSeconds && input.durationSeconds < 0.5)) {
      return {
        status: "insufficient_audio",
        isDemoMode: true,
        vocalization: "unidentified",
        interpretation: {
          primary: "Audio Clip Too Short",
          summary:
            "The recorded sound was too brief or low in amplitude to reliably detect canine vocal patterns.",
          confidence: "possible",
        },
        possibleContexts: ["Microphone cut off early", "Background silence"],
        observations: ["Signal length was below the minimum 0.5s acoustic threshold"],
        suggestions: [
          "Try recording again for 3 to 10 seconds while your dog vocalizes.",
          "Hold the microphone closer to your dog if safe to do so.",
        ],
        disclaimer:
          "AI behavioral interpretation requires sufficient acoustic signal duration to differentiate canine frequencies from background noise.",
      };
    }

    const context = (input.context || "unknown").toLowerCase();

    // Classification heuristics based on context and realistic behavioral canine science
    let vocalization: VocalizationType = "barking";
    let primary = "Alert or Attention Seeking";
    let summary =
      "Acoustic frequency and cadence suggest an alert or attention-seeking vocalization, typical when noticing environmental stimuli.";
    let confidence: QualitativeConfidence = "likely";
    let contexts: string[] = ["Noticing people outside", "Seeking immediate interaction", "Anticipating routine"];
    let observations: string[] = [
      "Moderate pitch with repeated rhythmic bursts.",
      "Clear inter-bark pauses suggesting watchful monitoring.",
    ];
    let suggestions: string[] = [
      "Acknowledge your dog calmly without over-exciting their vigilance.",
      "Observe body orientation: note whether the body is relaxed or stiffened.",
    ];
    let safetyNote: string | undefined = undefined;
    let recommendedAction: DogAnalysisResult["recommendedAction"] = "observe";

    if (context === "playing") {
      vocalization = "barking";
      primary = "Playful Arousal & Social Invitation";
      summary =
        "Higher-pitched, variable vocal bursts consistent with social play initiation or high-energy arousal.";
      confidence = "strong";
      contexts = ["Interactive toy play", "Rough-and-tumble with another dog or human", "Frustration at pause in play"];
      observations = [
        "Pitch variation with occasional playful yips.",
        "Short burst durations typically paired with play bows or loose body wiggles.",
      ];
      suggestions = [
        "Check for loose, bouncy body posture to confirm mutual enjoyment.",
        "Take brief calm breaks if arousal levels escalate too high.",
      ];
      recommendedAction = "play_or_engage";
    } else if (context === "someone_arrived") {
      vocalization = "barking";
      primary = "Territorial or Greeting Alert";
      summary =
        "Sharp, repetitive alert barking communicating environmental change or excitement at arrival.";
      confidence = "strong";
      contexts = ["Doorbell or knocking", "Family member returning", "Delivery carrier at boundary"];
      observations = [
        "Rapid onset bursts with forward ear positioning.",
        "Moderate-to-high volume designed to project across distances.",
      ];
      suggestions = [
        "Guide your dog to a designated calm spot (mat or bed) with positive reinforcement.",
        "Avoid shouting, which dogs often interpret as joining in the vocal alert.",
      ];
      recommendedAction = "observe";
    } else if (context === "left_alone") {
      vocalization = "whining";
      primary = "Social Isolation or Separation Distress";
      summary =
        "High-frequency tonal sounds consistent with seeking proximity or mild-to-moderate isolation concern.";
      confidence = "likely";
      contexts = ["Owner departing or closed doors", "Confinement anxiety", "Unmet social expectation"];
      observations = [
        "Elevated fundamental frequency with sustained harmonic contours.",
        "Repetitive, ascending pitch sweeps typical of canine distress calls.",
      ];
      suggestions = [
        "Gradually desensitize departure cues in short, low-stress increments.",
        "Provide calming enrichment (stuffed KONG, lick mat) during alone time.",
      ];
      safetyNote =
        "If whining transitions to continuous distress, destructive attempts, or self-harm when alone, consult a certified veterinary behaviorist (DACVB).";
      recommendedAction = "check_comfort";
    } else if (context === "saw_another_dog") {
      vocalization = "barking";
      primary = "Barrier Frustration or Reactive Alert";
      summary =
        "Staccato vocalization often driven by leashed restraint or barrier frustration when desiring to interact or defend distance.";
      confidence = "likely";
      contexts = ["Leash walking proximity", "Window or fence barrier", "Uncertainty of unfamiliar canine signals"];
      observations = [
        "Tense acoustic onset with rapid succession.",
        "Often accompanied by forward weight shift or leash tension.",
      ];
      suggestions = [
        "Create comfortable distance from the other dog until your dog regains focus.",
        "Reward calm disengagement and loose-leash refocusing.",
      ];
      recommendedAction = "give_space";
    } else if (context === "wanted_food") {
      vocalization = "whining";
      primary = "Anticipatory Demand Vocalization";
      summary =
        "Short, urgent tonal whines or soft barks directed toward an inaccessible resource or meal preparation.";
      confidence = "strong";
      contexts = ["Kitchen meal preparation", "Table begging", "Scheduled dinner time reminder"];
      observations = [
        "Direct visual orientation toward the food source or handler.",
        "Intermittent whines mixed with expectant licking or shifting paws.",
      ];
      suggestions = [
        "Ask for a polite alternate behavior (sit or lie down) before feeding.",
        "Avoid inadvertently reinforcing persistent demand vocalizations at the table.",
      ];
      recommendedAction = "observe";
    } else if (context === "resting_sleeping") {
      vocalization = "whimpering";
      primary = "REM Sleep Vocalization or Physical Discomfort";
      summary =
        "Muffled, rhythmic twitches or soft whimpers common during canine dream states, or potential stiffness upon waking.";
      confidence = "possible";
      contexts = ["Active dream state (REM sleep)", "Joint stiffness in senior dogs", "Mild gastrointestinal discomfort"];
      observations = [
        "Low amplitude, muffled vocalizations accompanied by rapid eye or paw twitches.",
      ];
      suggestions = [
        "Allow your dog to complete their sleep cycle; waking a startled dog can trigger defensive reflexes.",
        "If whimpering occurs while awake and trying to rise, monitor closely for mobility changes.",
      ];
      safetyNote =
        "Unexplained vocalizations while resting or shifting positions warrant a veterinary evaluation for underlying orthopedic pain.";
      recommendedAction = "observe";
    }

    return {
      status: "success",
      isDemoMode: true,
      vocalization,
      interpretation: {
        primary,
        summary,
        confidence,
      },
      possibleContexts: contexts,
      observations,
      suggestions,
      safetyNote,
      recommendedAction,
      disclaimer:
        "This analysis provides probabilistic behavioral insights based on canine bioacoustics and contextual factors. It does not constitute medical diagnosis or literal translation.",
    };
  }
}
