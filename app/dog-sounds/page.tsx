import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Volume2, ArrowRight, Sparkles, BookOpen, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Canine Vocalization Library — Guide to Dog Sounds & Meaning",
  description:
    "Explore the science of dog sounds: barking, whining, growling, howling, and whimpering. Bioacoustic profiles and behavioral ethology decoded.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-sounds`,
  },
  openGraph: {
    title: "Canine Vocalization Library — Dog Sounds & Behavioral Meaning",
    description:
      "Acoustic frequency, cadence, and situational contexts behind barking, whining, growling, howling, and whimpering.",
    url: `${SITE_CONFIG.url}/dog-sounds`,
  },
};

export default function DogSoundsPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-sounds`;
  const sounds = Object.values(DOG_SOUNDS_DATA);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Canine Vocalization Library",
    description:
      "A comprehensive guide to canine vocal communication, bioacoustics, and behavioral ethology.",
    url: pageUrl,
    hasPart: sounds.map((s) => ({
      "@type": "Article",
      name: s.title,
      url: `${SITE_CONFIG.url}/dog-sounds/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <Breadcrumbs items={[{ label: "Dog Sounds" }]} />

          {/* Header */}
          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Bioacoustic Reference</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              The Canine Vocalization Library
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Domestic dogs possess a remarkably diverse acoustic repertoire. From sharp alert barks to deep warning growls, each sound carries bioacoustic signatures shaped by evolution and human domestication.
            </p>
          </header>

          {/* Sound Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sounds.map((sound) => (
              <div
                key={sound.slug}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                      {sound.acousticProfile.frequencyRange}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    <Link
                      href={`/dog-sounds/${sound.slug}`}
                      className="hover:text-amber-800 transition-colors"
                    >
                      {sound.slug.charAt(0).toUpperCase() + sound.slug.slice(1)}
                    </Link>
                  </h2>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {sound.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-500">
                    <span className="bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
                      Pitch: {sound.acousticProfile.pitch}
                    </span>
                    <span className="bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
                      Cadence: {sound.acousticProfile.tempo}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <Link
                    href={`/dog-sounds/${sound.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 hover:text-amber-950"
                  >
                    <span>Read complete guide & FAQs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Educational Principles */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <Activity className="w-5 h-5 text-amber-700" />
              <h2 className="text-2xl font-serif font-bold">
                The Science of Canine Bioacoustics
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Unlike human speech based on discrete linguistic phonemes, dog vocalizations operate on continuous spectral gradients. A lower pitch acoustic signal physically conveys larger vocal tract resonance (evolutionary warning or defensive spacing), while higher pitch signals convey harmlessness, excitement, or juvenile petitioning.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              When analyzing dog sounds, always consider the trifecta of acoustic analysis: <strong>fundamental frequency (pitch)</strong>, <strong>harmonic dispersion</strong>, and <strong>inter-burst repetition rate</strong>.
            </p>
          </section>

          {/* CTA Box */}
          <div className="bg-amber-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-serif font-bold">
                Have an audio clip of your dog?
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm">
                Analyze their sound now with our probabilistic behavioral engine.
              </p>
            </div>
            <Link
              href="/dog-translator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm hover:bg-amber-50 transition-colors flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Launch Dog Translator</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
