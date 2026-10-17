import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import {
  Sparkles,
  ArrowRight,
  Stethoscope,
  Moon,
  Ear,
  Eye,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Is My Dog Barking at Night? Causes, Cues & What to Do",
  description:
    "Discover why dogs bark at night. Learn how nocturnal wildlife, sound sensitivity, routine disruptions, and cognitive changes influence nighttime barking.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/barking-at-night`,
  },
  openGraph: {
    title: "Why Is My Dog Barking at Night? Canine Nighttime Barking Guide",
    description:
      "Explore the common reasons dogs bark after dark. Differentiate alert barks from isolation or cognitive changes with practical calming steps.",
    url: `${SITE_CONFIG.url}/dog-behavior/barking-at-night`,
  },
};

const NIGHT_BARK_FAQS = [
  {
    question: "Why does my dog bark at night when nothing is there?",
    answer:
      "Dogs have auditory perception extending up to roughly 45,000 Hz (compared to 20,000 Hz in humans) and olfactory sensitivity thousands of times keener than ours. A dog barking at 'nothing' is often reacting to nocturnal animals outside, HVAC harmonic vibrations, shifting floorboards, or distant sirens imperceptible to humans.",
  },
  {
    question: "Should I comfort or ignore my dog when they bark at night?",
    answer:
      "Avoid harsh verbal corrections, which dogs often perceive as you joining in the vocalization. If the barking is fear- or alert-based, a calm, low-arousal reassurance and a quick environment check can lower stress. If the barking is learned demand barking for attention or treats, quietly redirecting to a bed or rewarding silence once calm is typically more effective.",
  },
  {
    question: "Why did my older dog suddenly start barking at night?",
    answer:
      "Sudden nocturnal vocalization in senior dogs warrants a veterinary examination. It can be an early indicator of Canine Cognitive Dysfunction (CCD), progressive vision or hearing loss leading to disorientation in the dark, or discomfort related to arthritis when resting on firm surfaces.",
  },
  {
    question: "How can white noise help dogs who bark at night?",
    answer:
      "A white noise machine, air purifier, or low-volume classical music creates an acoustic buffer that masks sudden outdoor frequency spikes (such as nocturnal wildlife or distant traffic), reducing startled alert responses.",
  },
];

export default function BarkingAtNightPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/barking-at-night`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Is My Dog Barking at Night?",
    description:
      "Evidence-based behavioral guide examining why dogs vocalize at night, acoustic alert patterns, and veterinary safety considerations.",
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
    mainEntity: NIGHT_BARK_FAQS.map((faq) => ({
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
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Barking at Night", href: "/dog-behavior/barking-at-night" },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Moon className="w-3.5 h-3.5 text-amber-700" />
              <span>Canine Nocturnal Behavior</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Why Is My Dog Barking at Night?
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              When a dog barks after hours, it rarely happens without an underlying sensory trigger, routine disruption, or emotional need. Understanding the acoustic cadence and context helps you respond calmly and effectively.
            </p>
          </header>

          {/* Quick Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Takeaway</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              Dogs primarily bark at night because of <strong>unseen sensory stimuli</strong> (nocturnal animals, ultrasonic utility sounds), <strong>territorial alert responses</strong> to nighttime footsteps or deliveries, <strong>isolation distress</strong>, or <strong>age-related cognitive changes</strong>. Rather than scolding, identifying whether the bark is a sharp alarm pattern or a rhythmic demand cadence is the first step toward restoring peaceful nights.
            </p>
          </section>

          {/* Core Explanations & Triggers */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Behavioral Ethology
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Common Reasons Dogs Bark After Dark
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Ear className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold">1. Heightened Sensory Sensitivity</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Nighttime brings a dramatic drop in ambient human noise, making faint high-frequency vibrations noticeable. Raccoons, rodents, foxes, or wind against windows easily trigger an alert reaction in dogs with intact guardian instincts.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold">2. Visual Shadows & Dim Lighting</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  While dogs have excellent motion detection in low light, their visual acuity for fine detail is lower than humans. Tree branches swaying on blinds or passing headlight reflections can be misinterpreted as novel boundary intrusions.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Moon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold">3. Unmet Physical Needs or Energy</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Under-exercised dogs or dogs without sufficient mental enrichment during the day can enter the night with surplus energy. This often manifests as restlessness, pacing, and intermittent barking at minor household sounds.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-lg font-serif font-bold">4. Isolation & Separation Anxiety</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  If your dog sleeps in a separate room or crate, nocturnal quiet can trigger social isolation distress. The vocalization often begins as a whine or soft woof before escalating into continuous rhythmic barking.
                </p>
              </div>
            </div>
          </section>

          {/* Acoustic & Posture Observations */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              What to Observe: Acoustic Cadence & Body Language
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              Evaluating the pitch, repetition rate, and accompanying body posture provides helpful clues about the underlying emotional state:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Sharp, Rapid Bursts (Alert Bark)
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  2 to 4 rapid, mid-pitch barks followed by motionless listening. Ears prick forward, body tenses, and head points toward doors or windows. This is typical of environmental monitoring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Monotonous, Spaced Barks (Boredom / Discomfort)
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Single barks spaced several seconds apart with loose, restless pacing. The dog may yawn, stretch frequently, or repeatedly check doors without focused fixation on an external target.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Caregiver Steps */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Practical Steps You Can Safely Try
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Mask Environmental Noise:</strong> Use a white noise machine, HEPA filter, or soft ambient sound in your dog&apos;s sleeping area to buffer sudden external auditory spikes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Block Visual Nighttime Triggers:</strong> Close curtains or blinds in rooms overlooking streets to eliminate shadows from streetlights or nocturnal animals.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Decompress Before Bed:</strong> Provide a calming 15-minute sniff walk or a lick-mat with frozen wet food 30 minutes before sleep to stimulate calming parasympathetic response.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Adjust Sleeping Proximity:</strong> If isolation anxiety is suspected, moving their bed into the bedroom or closer to family often provides immediate security without reinforcing frantic barking.
                </span>
              </li>
            </ul>
          </section>

          {/* Veterinary Welfare Callout */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When to Seek Veterinary Advice
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Nocturnal vocalization can sometimes stem from physical pain or sensory loss rather than behavioral habits. Schedule a consultation with a licensed veterinarian if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5">
              <li>An older dog who was previously calm begins pacing, circling, or staring into corners at night (signs consistent with Canine Cognitive Dysfunction).</li>
              <li>The dog whimpers or groans when lying down, shifting positions, or standing up after resting.</li>
              <li>Night barking is accompanied by panting, trembling, appetite changes, or sudden house-soiling accidents.</li>
            </ul>
          </section>

          {/* Interactive Tool CTA Banner */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Acoustic Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Heard your dog barking tonight?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Record a short audio clip and select &quot;Someone arrived&quot; or &quot;Resting or waking&quot; context in our Dog Translator for a probabilistic behavioral interpretation.
            </p>
            <div className="pt-2">
              <Link
                href="/dog-translator"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-amber-900 shadow-md hover:bg-amber-50 transition-all"
              >
                <span>Analyze My Dog&apos;s Sound</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Common Questions
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion items={NIGHT_BARK_FAQS} />
          </section>

          {/* Related Internal Links */}
          <section className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/barking"
              className="hover:text-amber-800 font-medium underline"
            >
              Explore our comprehensive Canine Barking Guide &rarr;
            </Link>
            <Link
              href="/dog-behavior/whining-at-night"
              className="hover:text-amber-800 font-medium underline"
            >
              Dog whining or crying at night instead? Read our Whining at Night Guide &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
