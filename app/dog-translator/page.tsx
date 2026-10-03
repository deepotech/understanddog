import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/site";
import { TranslatorShell } from "@/components/translator/TranslatorShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { Sparkles, HeartPulse } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dog Translator — Understand Your Dog's Sounds Online",
  description:
    "AI-powered dog translator. Record or upload your dog's barks, whines, or growls with optional context for probabilistic behavioral insights. Free & private.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-translator`,
  },
  openGraph: {
    title: "Dog Translator — Understand Your Dog's Sounds Online",
    description:
      "Record or upload your dog's vocalizations with optional context for instant behavioral insights grounded in canine ethology.",
    url: `${SITE_CONFIG.url}/dog-translator`,
  },
};

const TRANSLATOR_FAQS = [
  {
    question: "Can this tool literally translate my dog's thoughts into words?",
    answer:
      "No. Canine vocalizations do not operate with human syntactic grammar. Our platform evaluates bioacoustic spectral metrics (pitch, duration, repetition rate) and correlates them with situational context to suggest probable emotional motivations and behavioral needs.",
  },
  {
    question: "Do I need to fill out a questionnaire before analyzing?",
    answer:
      "No. We believe in 'simple first, deeper later.' You can tap record or upload an audio file and hit 'Analyze My Dog' in seconds. Situational context is strictly optional, though selecting a trigger can refine behavioral precision.",
  },
  {
    question: "What audio formats and limits apply?",
    answer:
      "You can record directly through your browser or upload WAV, MP3, M4A, WebM, or OGG files up to 10 MB and up to 30 seconds in duration.",
  },
  {
    question: "Is my dog's audio stored permanently or shared?",
    answer:
      "Never. In our MVP architecture, audio buffers are processed ephemerally in server memory and discarded immediately after interpretation. No audio files, databases, or speech models store your recordings.",
  },
];

export default function DogTranslatorPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-translator`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dog Translator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    browserRequirements: "Requires Web Audio API / HTML5 Audio support",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "AI-powered tool for analyzing canine sounds and providing probabilistic behavioral interpretations.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TRANSLATOR_FAQS.map((faq) => ({
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
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />

      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <Breadcrumbs items={[{ label: "Dog Translator" }]} />

          {/* Page Hero */}
          <header className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Flagship Canine Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Dog Translator — Understand Your Dog&apos;s Sounds
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Capture your dog&apos;s bark, whine, or growl. Combine bioacoustic frequency with situational context for a probabilistic behavioral interpretation.
            </p>
          </header>

          {/* Interactive Tool Shell */}
          <section aria-label="Dog Translator Tool Interface">
            <TranslatorShell />
          </section>

          {/* Educational Content & Ethical Context */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Understanding Canine Vocal Patterns
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Canine vocal communication is nuanced and context-dependent. While humans use language with symbolic grammar, dogs produce vocal sounds that may reflect internal emotional arousal and social motivation:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Fundamental Frequency
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Lower-frequency sounds (growls, deep barks) can correlate with distance-increasing signals or heightened wariness. Higher-frequency sounds (whines, yips) often correlate with social solicitation, excitement, or distress.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Burst Repetition Rate
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Rapid bursts may indicate higher arousal or urgency. Intermittent, widely spaced vocalizations often correspond with relaxed situational monitoring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Situational Context
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Acoustic characteristics alone cannot distinguish between play excitement and barrier frustration. Adding context helps provide a more grounded behavioral interpretation.
                </p>
              </div>
            </div>
          </section>

          {/* Veterinary Notice Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
            <HeartPulse className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-900">
                A Note on Canine Welfare
              </p>
              <p className="leading-relaxed text-amber-800">
                No algorithm can replace professional veterinary diagnosis. If your dog exhibits signs of acute discomfort, sudden behavioral changes, lethargy, or persistent guarding, please schedule an appointment with a licensed veterinarian or certified animal behaviorist.
              </p>
            </div>
          </div>

          {/* FAQs Section */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Common Questions
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Dog Translator FAQ
              </h2>
            </div>
            <FaqAccordion items={TRANSLATOR_FAQS} />
          </section>

          {/* Quick links to Bark Analyzer & Sounds */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-bark-analyzer"
              className="hover:text-amber-800 font-medium underline"
            >
              Learn more about specific barking patterns in our Bark Analyzer &rarr;
            </Link>
            <Link
              href="/dog-sounds"
              className="hover:text-amber-800 font-medium underline"
            >
              Browse all 5 sound categories in the Canine Vocal Library &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
