import { DogAnalysisResult, DogVocalizationInput } from "./types";
import { MockDogAiProvider } from "./mock-provider";
import { GeminiDogAiProvider } from "./gemini-provider";
import { OpenRouterDogAiProvider } from "./openrouter-provider";

export interface DogAiProvider {
  name: string;
  analyzeDogSound(input: DogVocalizationInput): Promise<DogAnalysisResult>;
}

class UnavailableDogAiProvider implements DogAiProvider {
  name = "unavailable-provider";

  async analyzeDogSound(): Promise<DogAnalysisResult> {
    return {
      status: "ai_unavailable",
      vocalization: "unidentified",
      interpretation: {
        primary: "AI Service Currently Unavailable",
        summary:
          "The real AI sound interpretation pipeline is currently awaiting production credentials or configuration. Please check back shortly.",
        confidence: "possible",
      },
      possibleContexts: [],
      observations: [],
      suggestions: [
        "In development: set OPENROUTER_API_KEY or GEMINI_API_KEY in .env.local, or set ALLOW_DEMO_AI=true.",
        "Refer to our Canine Sound Library for comprehensive acoustic profiles.",
      ],
      disclaimer:
        "UnderstandDog provides probabilistic behavioral interpretations grounded in canine bioacoustics.",
    };
  }
}

/**
 * Provider factory adhering to production discipline:
 * 1. If OPENROUTER_API_KEY is configured, returns OpenRouter multimodal provider.
 * 2. If GEMINI_API_KEY is configured, returns Gemini multimodal AI provider.
 * 3. If in production without credentials, returns safe 'ai_unavailable' provider.
 *    (Never silently substitutes fake mock data in production).
 * 4. In non-production with ALLOW_DEMO_AI=true, returns MockDogAiProvider for tests/dev.
 */
export function getDogAiProvider(): DogAiProvider {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const isProduction = process.env.NODE_ENV === "production";
  const allowDemo = process.env.ALLOW_DEMO_AI === "true" || process.env.NODE_ENV === "test";

  if (openRouterKey && openRouterKey.length > 0) {
    return new OpenRouterDogAiProvider(openRouterKey);
  }

  if (geminiKey && geminiKey.length > 0) {
    return new GeminiDogAiProvider(geminiKey);
  }

  if (!isProduction && allowDemo) {
    return new MockDogAiProvider();
  }

  return new UnavailableDogAiProvider();
}
