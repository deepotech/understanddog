import React from "react";
import Link from "next/link";
import { SoundGuide, DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { AcousticProfileCard } from "./AcousticProfile";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import {
  Sparkles,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

export interface RelatedBehaviorGuide {
  title: string;
  href: string;
  description: string;
}

interface SoundDetailLayoutProps {
  sound: SoundGuide;
  relatedBehaviorGuide?: RelatedBehaviorGuide;
}

export function SoundDetailLayout({
  sound,
  relatedBehaviorGuide,
}: SoundDetailLayoutProps) {
  const pageUrl = `${SITE_CONFIG.url}/dog-sounds/${sound.slug}`;

  // JSON-LD Schemas: Article + FAQPage (visible content only)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sound.title,
    description: sound.metaDescription,
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
    mainEntity: sound.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const otherSounds = Object.values(DOG_SOUNDS_DATA).filter(
    (s) => s.slug !== sound.slug
  );

  return (
    <>
      <JsonLd data={articleSchema} />
      {sound.faqs.length > 0 && <JsonLd data={faqSchema} />}

      <div className="py-8 sm:py-12 bg-stone-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Dog Sounds", href: "/dog-sounds" },
              { label: sound.slug.charAt(0).toUpperCase() + sound.slug.slice(1) },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{sound.heroBadge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              {sound.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {sound.shortDescription}
            </p>
          </header>

          {/* Acoustic Profile Card */}
          <AcousticProfileCard profile={sound.acousticProfile} />

          {/* Overview Section */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Canine Bioacoustic Overview
            </h2>
            {sound.overview.map((para, idx) => (
              <p key={idx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </section>

          {/* Common Contexts & Body Language */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Situational Triggers
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Common Contexts for {sound.slug.charAt(0).toUpperCase() + sound.slug.slice(1)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {sound.commonContexts.map((ctx, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-3 shadow-xs"
                >
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    {ctx.scenario}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {ctx.description}
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-500">
                    <Eye className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-700">Posture cues:</strong>{" "}
                      {ctx.associatedBodyLanguage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Context Matters */}
          <section className="bg-amber-50/50 rounded-2xl border border-amber-200/60 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-amber-950">
              Why Context Matters for This Vocalization
            </h2>
            <div className="space-y-3">
              {sound.whyContextMatters.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-amber-950">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Behavioral Caveats */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-2xl font-serif font-bold">
                Behavioral Guidance & Misconceptions
              </h2>
            </div>
            <div className="space-y-3">
              {sound.behavioralCaveats.map((caveat, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {caveat}
                </p>
              ))}
            </div>
          </section>

          {/* Veterinary Advisory Section */}
          <section className="bg-red-50 rounded-2xl border border-red-200 p-6 sm:p-8 space-y-4 text-red-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-red-700 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-red-900">
                When to Consult a Licensed Veterinarian
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
              Vocalizations can be an early indicator of pain, sensory decline, or cognitive dysfunction. Schedule a veterinary examination if you notice:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-red-900 list-disc pl-5">
              {sound.whenToConsultVet.map((vetPoint, idx) => (
                <li key={idx} className="leading-relaxed">
                  {vetPoint}
                </li>
              ))}
            </ul>
          </section>

          {/* Interactive Tool CTA Banner */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyze Your Dog in Real-Time</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Heard this sound from your dog today?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Record or upload the audio clip into our Dog Translator tool. Combine acoustic frequency with your situational context for an instant behavioral readout.
            </p>
            <div className="pt-2">
              <Link
                href="/dog-translator"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-amber-900 shadow-md hover:bg-amber-50 transition-all"
              >
                <span>Launch Dog Translator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* FAQs Section */}
          {sound.faqs.length > 0 && (
            <section className="space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Questions & Answers
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <FaqAccordion items={sound.faqs} />
            </section>
          )}

          {/* Related Behavioral Guide Callout */}
          {relatedBehaviorGuide && (
            <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Related Behavioral Guide
                </p>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {relatedBehaviorGuide.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                  {relatedBehaviorGuide.description}
                </p>
              </div>
              <Link
                href={relatedBehaviorGuide.href}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-amber-900 transition-colors flex-shrink-0"
              >
                <span>Read Behavioral Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>
          )}

          {/* Sibling Sound Guides Internal Linking */}
          <section className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Explore Other Canine Vocalizations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherSounds.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/dog-sounds/${sibling.slug}`}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 hover:border-amber-400 hover:text-amber-800 transition-colors text-center"
                >
                  Dog {sibling.slug.charAt(0).toUpperCase() + sibling.slug.slice(1)}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
