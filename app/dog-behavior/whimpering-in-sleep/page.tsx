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
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Is My Dog Whimpering in Their Sleep? Dreams, REM Cycles & Cues",
  description:
    "Learn why dogs whimper, twitch, and make muffled sounds while sleeping. Understand canine REM dream cycles, puppy sleep patterns, and when to consult a vet.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/whimpering-in-sleep`,
  },
  openGraph: {
    title: "Why Is My Dog Whimpering in Their Sleep? Canine Sleep Science",
    description:
      "Explore canine sleep architecture. Discover why paw twitches, muffled whimpers, and soft barks during REM sleep are normal and when to let sleeping dogs lie.",
    url: `${SITE_CONFIG.url}/dog-behavior/whimpering-in-sleep`,
  },
};

const SLEEP_WHIMPER_FAQS = [
  {
    question: "Do dogs have dreams and nightmares like humans?",
    answer:
      "Comparative sleep research strongly suggests that dogs experience sleep stages similar to human REM dreaming. Electroencephalogram (EEG) studies show that during Rapid Eye Movement (REM) sleep, canine brainwave activity resembles patterns observed in humans during memory consolidation. Soft twitches and whimpers during REM are widely considered motor reflections of this activity, though subjective dream content cannot be confirmed directly.",
  },
  {
    question: "Should I wake my dog up if they are crying or whimpering in their sleep?",
    answer:
      "Generally, no. The old proverb 'let sleeping dogs lie' holds sound behavioral wisdom. Waking a dog abruptly from deep REM sleep can induce sleep startle, confusion, disorientation, and occasional defensive snaps. If you feel compelled to comfort them, call their name softly from several feet away rather than touching them physically.",
  },
  {
    question: "How can I tell a normal sleep dream from a canine seizure?",
    answer:
      "A normal dreaming whimper involves soft, irregular twitches of the paws, whiskers, or tail, brief muffled vocalizations, and the dog can be gently roused by calling their name. A seizure, by contrast, typically involves rigid whole-body stiffening, violent rhythmic convulsions, unresponsive eyes, foaming at the mouth, and involuntary loss of bladder or bowel control.",
  },
  {
    question: "Why do puppies whimper in their sleep more than adult dogs?",
    answer:
      "Puppies spend a much higher percentage of their total sleep time in REM sleep compared to adult dogs. Their developing central nervous system lacks full motor inhibition, resulting in frequent sleep twitches, sucking motions, and soft whimpers.",
  },
];

export default function WhimperingInSleepPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/whimpering-in-sleep`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Is My Dog Whimpering in Their Sleep?",
    description:
      "A scientific walkthrough of canine sleep architecture, dreaming vocalizations, and distinguishing normal REM activity from clinical distress.",
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
    mainEntity: SLEEP_WHIMPER_FAQS.map((faq) => ({
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
              { label: "Whimpering in Sleep", href: "/dog-behavior/whimpering-in-sleep" },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Moon className="w-3.5 h-3.5 text-amber-700" />
              <span>Canine Sleep Science</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Why Is My Dog Whimpering in Their Sleep?
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Watching your dog twitch their paws, flutter their eyelids, and let out soft, muffled whimpers can be both endearing and concerning. Learn what comparative sleep science reveals about dreaming dogs.
            </p>
          </header>

          {/* Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Answer</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              In most cases, a dog whimpering in their sleep is simply experiencing <strong>Rapid Eye Movement (REM) sleep</strong>. Comparative neurophysiology shows that during REM sleep, a brainstem structure called the <em>pons</em> suppresses major motor activity while allowing minor twitches, gentle paw movements, and muffled vocalizations to surface. These sleep vocalizations are generally considered normal and do not automatically indicate distress or pain.
            </p>
          </section>

          {/* Canine Sleep Architecture */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Comparative Neurophysiology
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                How Dogs Sleep and Dream
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                  SWS
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Slow-Wave Sleep
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  The initial stage of sleep where heart rate, breathing, and blood pressure decrease. Muscles relax, and the dog is easily roused by minor sounds.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                  REM
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Rapid Eye Movement
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Roughly 20 minutes into sleep, dogs enter REM. Brain waves speed up, eyes dart beneath lids, and motor inhibition allows soft vocalizations and twitches to escape.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                  PONS
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  The Pons Mechanism
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  The pons prevents dogs from physically acting out their dreams. In puppies and elderly dogs, this inhibitory circuit is less developed or slightly weakened, making sleep whimpers more pronounced.
                </p>
              </div>
            </div>
          </section>

          {/* Normal Dream vs Seizure Differentiation */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Normal REM Dream vs. Medical Seizure: Critical Differences
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              While sleep whimpering is benign, owners occasionally confuse dreaming with a neurological seizure. Here is how to distinguish between the two:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 font-semibold">
                  Benign REM Sleep Dreaming
                </p>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                  <li>Gentle, irregular twitches of toes, tail, or lips.</li>
                  <li>Soft, muffled whimpers, chirps, or muffled woofs.</li>
                  <li>Body remains supple and relaxed to the touch.</li>
                  <li>Dog responds or wakes if you softly call their name.</li>
                  <li>Wakes naturally without disorientation or confusion.</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-950 font-semibold">
                  Neurological Seizure Event (Seek Vet)
                </p>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
                  <li>Full body stiffening with limbs held rigid and locked.</li>
                  <li>Violent, rhythmic jerking or paddling of legs.</li>
                  <li>Unresponsive to voice or gentle touch.</li>
                  <li>May involve foaming at the mouth, drooling, or jaw chattering.</li>
                  <li>Post-event confusion, temporary blindness, or stumbling.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Caregiver Advice */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Why You Should &quot;Let Sleeping Dogs Lie&quot;
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              It is tempting to nudge a whimpering dog to &quot;save them from a bad dream.&quot; However, ethologists advise allowing dogs to sleep uninterrupted:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Avoid Sleep Startle:</strong> Sudden physical contact during deep REM sleep can disorient a dog, potentially triggering a defensive snap before they realize where they are.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Preserve Memory Consolidation:</strong> REM sleep is essential for brain health, learning, and emotional processing. Fragmenting sleep disrupts restorative neural recovery.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Soft Voice Reassurance:</strong> If whimpering seems unusually intense, speak their name in a soft, gentle whisper from a few feet away until their breathing evens out.
                </span>
              </li>
            </ul>
          </section>

          {/* Veterinary Welfare Callout */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When Sleep Whimpering May Indicate Discomfort
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              While REM sleep whimpering is natural, physical discomfort can also disrupt resting hours. Consult a licensed veterinarian if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5">
              <li>Your dog whimpers audibly every time they shift sleeping positions or stand up after resting.</li>
              <li>Sleep vocalizations are accompanied by panting, coughing, or labored breathing while lying down.</li>
              <li>A dog displays tremors, rigid leg paddling, or remains unresponsive when called.</li>
            </ul>
          </section>

          {/* Interactive Tool CTA */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bioacoustic Analysis Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Recorded your dog whimpering?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Upload an audio clip to our Dog Translator tool and select the &quot;Resting or waking&quot; context for a cautious, probabilistic behavioral analysis.
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
            <FaqAccordion items={SLEEP_WHIMPER_FAQS} />
          </section>

          {/* Related Internal Links */}
          <section className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/whimpering"
              className="hover:text-amber-800 font-medium underline"
            >
              Explore our full Canine Whimpering Sound Guide &rarr;
            </Link>
            <Link
              href="/dog-sounds/whining"
              className="hover:text-amber-800 font-medium underline"
            >
              Learn about higher-frequency whines in the Whining Guide &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
