import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heart, Sparkles, Shield, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About UnderstandDog — Our Mission to Understand Canine Communication",
  description:
    "Learn about UnderstandDog: an independent platform dedicated to canine bioacoustics, ethical animal AI, and strengthening the human-canine bond.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  const pageUrl = `${SITE_CONFIG.url}/about`;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About UnderstandDog",
    description:
      "Mission and principles behind UnderstandDog, an AI platform built to foster canine understanding.",
    url: pageUrl,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <Breadcrumbs items={[{ label: "About" }]} />

          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Heart className="w-3.5 h-3.5 text-amber-700" />
              <span>Our Mission</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Understand Your Dog.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Rather than presenting canine vocalizations as literal human sentences, Dog Translator treats them as probabilistic behavioral signals.
            </p>
          </header>

          {/* Mission & Founding Story */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Why We Built UnderstandDog
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              For years, canine vocal tools on the web typically treated barking as a gimmick or promised literal sentence-by-sentence translation. In reality, canine communication is rich, complex, and deeply contextual. Dogs vocalize to express internal emotional states, physiological needs, and social requests.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              When a dog growls, whines, or alert-barks, misinterpreting the signal can damage the bond or lead to unintended stress. We built UnderstandDog to offer a responsible, scientifically cautious platform that helps pet parents explore what their dog&apos;s vocal patterns may mean.
            </p>
          </section>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Grounded in Bioacoustics
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Built around principles from canine behavioral ethology and bioacoustic research, emphasizing acoustic structure and context.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Privacy by Design
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                No accounts required. Audio is processed temporarily in memory and is not permanently stored or shared with advertisers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Scientific Caution
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We never claim medical certainty or diagnose illness. We provide qualitative confidence and urge veterinary care when distress is flagged.
              </p>
            </div>
          </div>

          {/* Roadmap & Looking Forward */}
          <section className="bg-stone-100 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              The Path Ahead
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              UnderstandDog is expanding into a full canine understanding platform. Upcoming releases will introduce breed-specific behavioral baselines, computer vision posture recognition (tail, ear, and facial micro-expressions), and personalized vocal timelines.
            </p>
            <div className="pt-2">
              <Link
                href="/dog-translator"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950"
              >
                <span>Try the flagship Dog Translator now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
