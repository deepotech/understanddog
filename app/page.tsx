import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SoundLibraryGrid } from "@/components/home/SoundLibraryGrid";
import { ContextImportanceSection } from "@/components/home/ContextImportanceSection";
import { SafetyTransparencySection } from "@/components/home/SafetyTransparencySection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { Sparkles, ArrowRight, Dna, Compass, Volume2 } from "lucide-react";

export const metadata: Metadata = {
  title: "UnderstandDog — Understand Your Dog's Sounds & Behavior",
  description:
    "Explore what your dog's barks, whines, and growls may mean. AI-powered canine sound analysis with responsible behavioral science. Free, private, no account needed.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
  openGraph: {
    title: "UnderstandDog — Understand Your Dog",
    description:
      "Explore what your dog's sounds and behavior may mean. AI-powered canine bioacoustics and behavioral interpretation — responsibly.",
    url: `${SITE_CONFIG.url}/`,
  },
};

const HOMEPAGE_FAQS = [
  {
    question: "Can AI really translate what my dog is saying?",
    answer:
      "No system can provide a literal word-for-word translation because dogs do not speak human language. Instead, UnderstandDog analyzes the acoustic physics of your dog's vocalization (pitch, harmonics, cadence) alongside situational context to provide a probabilistic behavioral interpretation of their emotional state and needs.",
  },
  {
    question: "How is UnderstandDog different from generic translation apps?",
    answer:
      "Most generic apps simply play pre-recorded sound effects or generate random humorous sentences. UnderstandDog is built on canine bioacoustic science: we emphasize that sound alone is only half the story, integrate situational context, use qualitative confidence indicators rather than fake percentages, and provide veterinary advisories whenever distress is detected.",
  },
  {
    question: "Is there any cost or account required?",
    answer:
      "No. The core Dog Translator tool is free and accessible without creating an account or logging in. We prioritize instant utility and anonymous privacy.",
  },
  {
    question: "Are my audio recordings stored on your servers?",
    answer:
      "No. Audio buffers are processed in temporary server memory and discarded immediately after interpretation. No audio files or voice profiles are stored.",
  },
  {
    question: "Can UnderstandDog diagnose illness or physical pain?",
    answer:
      "Never. UnderstandDog is an educational behavioral tool, not a veterinary diagnostic device. If our system detects vocal patterns consistent with physical discomfort or sudden distress, it immediately prompts you to consult a licensed veterinarian.",
  },
];

export default function HomePage() {
  const pageUrl = `${SITE_CONFIG.url}/`;

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: pageUrl,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${pageUrl}dog-sounds/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_CONFIG.name,
    url: pageUrl,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JsonLd data={webSiteSchema} />
      <JsonLd data={webAppSchema} />

      <div className="space-y-0">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Interactive Tool Quick Preview Banner */}
        <section className="bg-amber-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-800/80 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Tool</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Start an analysis in under 10 seconds
              </h2>
              <p className="text-amber-200 text-sm max-w-xl">
                No questionnaires required. Tap record or upload an audio clip to decode your dog&apos;s vocalization immediately.
              </p>
            </div>
            <Link
              href="/dog-translator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-amber-950 shadow-md hover:bg-amber-50 transition-all flex-shrink-0"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
              <span>Launch Dog Translator</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
        </section>

        {/* 3. How It Works */}
        <HowItWorksSection />

        {/* 4. Dog Sounds Library Overview */}
        <SoundLibraryGrid />

        {/* 5. Why Context Matters */}
        <ContextImportanceSection />

        {/* 6. Other Dog Tools (Future Architecture Preview) */}
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Ecosystem
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                The Complete Dog Understanding Platform
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Dog Translator is our flagship tool. Explore our upcoming behavioral and visual understanding modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tool 1: Dog Bark Analyzer */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Dog Bark Analyzer
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Dedicated acoustic taxonomy for barking cadences, burst rates, and emotional triggers.
                  </p>
                </div>
                <Link
                  href="/dog-bark-analyzer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950"
                >
                  <span>Explore Bark Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tool 2: Dog Breed Identifier (Coming Soon) */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-4 opacity-80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center">
                      <Dna className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      In Development
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Dog Breed Identifier
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    AI visual breed recognition correlating morphology with genetic vocal and behavioral predispositions.
                  </p>
                </div>
                <span className="text-xs text-stone-400 font-medium">
                  Phase 2 Expansion Module
                </span>
              </div>

              {/* Tool 3: Dog Body Language Guide (Coming Soon) */}
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-4 opacity-80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      In Development
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Body Language Guide
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Comprehensive visual atlas covering ear angles, tail carriage, eye shapes, and posture tension cues.
                  </p>
                </div>
                <span className="text-xs text-stone-400 font-medium">
                  Phase 2 Expansion Module
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Safety & Transparency */}
        <SafetyTransparencySection />

        {/* 8. FAQ */}
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Everything you need to know about canine sound analysis, privacy, and our scientific methodology.
              </p>
            </div>
            <FaqAccordion items={HOMEPAGE_FAQS} />
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className="py-16 sm:py-20 bg-stone-900 text-white text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Ready to understand what your dog is communicating?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Join thousands of pet owners decoding canine vocalizations with scientifically responsible AI.
            </p>
            <div className="pt-2">
              <Link
                href="/dog-translator"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Analyze Your Dog&apos;s Sound Now</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
