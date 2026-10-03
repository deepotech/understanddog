import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Activity, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — The Science of Canine Bioacoustic Analysis",
  description:
    "Learn how UnderstandDog analyzes canine audio frequency, harmonic structure, and situational context to deliver responsible behavioral insights.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/how-it-works`,
  },
};

export default function HowItWorksPage() {
  const pageUrl = `${SITE_CONFIG.url}/how-it-works`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How It Works: Canine Bioacoustics and Behavioral Analysis",
    description:
      "A scientific walkthrough of how UnderstandDog analyzes acoustic parameters and situational context.",
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
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <Breadcrumbs items={[{ label: "How It Works" }]} />

          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Scientific Methodology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              How UnderstandDog Works
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              We do not pretend to translate dog sounds into English sentences. Instead, we use computational bioacoustics and canine ethology to identify probable emotional motivations and behavioral cues.
            </p>
          </header>

          {/* Section 1: The Bioacoustic Formula */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              The Bioacoustic Triad
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Canine acoustic analysis rests on three physical dimensions measurable from any clean microphone recording:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  1. Fundamental Frequency
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pitch can provide clues about emotional valence and arousal. Lower frequencies (under 400 Hz) may correlate with distance-increasing signals or wariness. Higher frequencies (over 1,500 Hz) often correlate with social solicitation, excitement, or distress.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  2. Repetition & Duration
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tempo can reflect autonomic arousal. Rapid bursts with brief pauses may suggest heightened urgency or activation, whereas vocalizations spaced several seconds apart can indicate calm situational monitoring.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  3. Situational Context
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Was the dog leashed? Resting? Greeting someone at the door? Playing tug? Context provides the environmental anchor that helps turn raw frequency metrics into more meaningful behavioral interpretations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Why Literal Translation is a Myth */}
          <section className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-amber-950">
              Why Literal Word-for-Word Translation Is a Myth
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Human language is symbolic, compositional, and governed by recursive syntax. Canine communication, by contrast, is indexical and emotive. A dog does not possess vocal structures or neural architecture designed to state: <em>&quot;Please give me the bacon on the counter.&quot;</em>
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              What your dog communicates is: <strong>high arousal + focus on food resource + urgent petition for human action</strong>. By framing interpretation around behavioral science, we help owners respond appropriately rather than indulging in cartoonish anthropomorphism.
            </p>
          </section>

          {/* Section 3: Responsible AI & Safety Note */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <h2 className="text-2xl font-serif font-bold">
                Responsible AI & Veterinary Safeguards
              </h2>
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              We uphold strict ethical constraints in our system:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Qualitative Confidence Only:</strong> We present outcomes as <em>Possible</em>, <em>Likely</em>, or <em>Strong</em>. We reject artificial precision percentages.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Medical Deference:</strong> Whenever potential pain, disorientation, or sudden vocal regression is indicated, we direct guardians to a licensed veterinarian.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span><strong>Privacy First:</strong> Audio recordings are processed ephemerally in server memory and discarded immediately.</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-amber-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-serif font-bold">
                Ready to try the tool?
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm">
                Experience responsible canine sound interpretation right now.
              </p>
            </div>
            <Link
              href="/dog-translator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm hover:bg-amber-50 transition-colors flex-shrink-0"
            >
              <span>Analyze Dog Sound</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
