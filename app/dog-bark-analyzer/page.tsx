import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import {
  Sparkles,
  ArrowRight,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dog Bark Analyzer — Decode Barking Types, Triggers & Meaning",
  description:
    "Analyze your dog's bark. Discover why pitch, repetition rate, and situational context determine whether a bark is playful, territorial, alarmed, or bored.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-bark-analyzer`,
  },
  openGraph: {
    title: "Dog Bark Analyzer — Canine Bark Meaning & Acoustic Ethology",
    description:
      "Decode your dog's barking patterns. Explore alert, play, demand, and boredom barks with responsible behavioral science.",
    url: `${SITE_CONFIG.url}/dog-bark-analyzer`,
  },
};

const BARK_PATTERNS = [
  {
    type: "Rapid Continuous Alarm Barking",
    pitch: "Mid-to-low pitch",
    burstRate: "3 to 5 rapid barks, brief pause, repeated",
    interpretation: "Alert to environmental novelty or perceived boundary intrusion (deliveries, footsteps).",
    advice: "Acknowledge alert calmly. Avoid shouting, which sounds like joining in.",
  },
  {
    type: "High-Pitched Play Bow Barking",
    pitch: "High, melodic pitch",
    burstRate: "1 to 2 sharp barks accompanied by bouncy body shifts",
    interpretation: "Social invitation, excitement, or playful demand.",
    advice: "Check for loose body wiggles and play bows to confirm reciprocal play.",
  },
  {
    type: "Single Staccato Demand Bark",
    pitch: "Medium pitch, sharp onset",
    burstRate: "Single barks spaced 3-6 seconds apart directed at human",
    interpretation: "Learned petition for food, outdoor access, or immediate attention.",
    advice: "Redirect to a calm alternative behavior (such as lying on mat) before granting resource.",
  },
  {
    type: "Monotonous Boredom Barking",
    pitch: "Flat, unchanging pitch",
    burstRate: "Rhythmic, persistent pacing with barks every few seconds",
    interpretation: "Under-stimulation, lack of physical/mental enrichment, or solitary confinement distress.",
    advice: "Introduce physical exercise, sniff walks, and puzzle toys to alleviate frustration.",
  },
];

const BARK_FAQS = [
  {
    question: "Can an analyzer tell the exact reason my dog is barking from audio alone?",
    answer:
      "No. Audio frequency and cadence provide essential clues about arousal and urgency, but cannot distinguish an excited greeting from leashed frustration without knowing what the dog was looking at.",
  },
  {
    question: "Why does my dog's bark change pitch depending on who is at the door?",
    answer:
      "Dogs alter vocal tract resonance based on perceived familiarity and threat level. Familiar friends trigger higher-pitched social greeting barks, whereas unfamiliar strangers elicit lower-pitched territorial alarm barks.",
  },
  {
    question: "How can I test my dog's bark right now?",
    answer:
      "You can record your dog's bark using our Dog Translator tool. The system evaluates acoustic harmonics alongside your observed context for an instant behavioral readout.",
  },
];

export default function DogBarkAnalyzerPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-bark-analyzer`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dog Bark Analyzer — Decode Barking Types & Behavioral Triggers",
    description:
      "Scientific framework for analyzing dog barks by pitch, tempo, and situational context.",
    url: pageUrl,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BARK_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <Breadcrumbs items={[{ label: "Bark Analyzer" }]} />

          {/* Header */}
          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Activity className="w-3.5 h-3.5 text-amber-700" />
              <span>Acoustic Pattern Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Dog Bark Analyzer
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Dogs bark for distinct reasons—excitement, fear, boredom, or territory. Understanding the acoustic interplay of pitch, burst frequency, and environment unlocks the true meaning behind the sound.
            </p>
          </header>

          {/* Interactive Tool Teaser Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Ready to analyze your dog&apos;s bark?
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Put your dog&apos;s bark to the test
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Use our interactive Dog Translator to record or upload your dog&apos;s bark and receive an instant probabilistic readout.
              </p>
            </div>
            <Link
              href="/dog-translator"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 transition-colors flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Launch Analyzer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Primary Acoustic Matrix */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Acoustic Observations
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Common Bark Pattern Examples
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                These are illustrative acoustic and behavioral patterns, not definitive diagnoses of why a dog is barking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {BARK_PATTERNS.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {p.pitch}
                    </span>
                    <span className="text-[11px] text-stone-500">Acoustic Class</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {p.type}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Cadence:</strong> {p.burstRate}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong className="text-stone-800">Behavioral Meaning:</strong> {p.interpretation}
                  </p>
                  <div className="pt-2 border-t border-stone-100 text-xs text-amber-900">
                    <strong>Recommended Response:</strong> {p.advice}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Sound Alone Cannot Tell the Full Story */}
          <section className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-amber-950">
              Why Sound Alone Never Determines a Single Meaning
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Two barks with identical acoustic spectrums can convey opposite intentions depending on the physical context:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-1">
                <p className="text-xs font-bold text-stone-900">Scenario A: Play Bow</p>
                <p className="text-xs text-stone-600">
                  A mid-frequency bark paired with front elbows down and a wagging tail indicates reciprocal play invitation.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-1">
                <p className="text-xs font-bold text-stone-900">Scenario B: Leash Tension</p>
                <p className="text-xs text-stone-600">
                  The identical mid-frequency bark paired with a stiff body freeze and forward weight shift indicates barrier frustration.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Knowledge Base
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion items={BARK_FAQS} />
          </section>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/barking"
              className="hover:text-amber-800 font-medium underline"
            >
              Read our in-depth Barking Guide in the Sound Library &rarr;
            </Link>
            <Link
              href="/dog-translator"
              className="hover:text-amber-800 font-medium underline"
            >
              Launch Dog Translator &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
