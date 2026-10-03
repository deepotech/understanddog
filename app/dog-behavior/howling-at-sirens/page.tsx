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
  Volume2,
  Radio,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Do Dogs Howl at Sirens? Acoustic Triggers & Evolutionary Ethology",
  description:
    "Discover why dogs howl at emergency sirens. Learn about harmonic pitch frequencies, acoustic resonance, wolf ancestry, and canine pack chorusing.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/howling-at-sirens`,
  },
  openGraph: {
    title: "Why Do Dogs Howl at Sirens? Canine Bioacoustic Guide",
    description:
      "Explore the bioacoustic and evolutionary reasons dogs howl when fire engines or police sirens pass by. Does it hurt their ears? Ethology explained.",
    url: `${SITE_CONFIG.url}/dog-behavior/howling-at-sirens`,
  },
};

const HOWL_SIREN_FAQS = [
  {
    question: "Does the sound of a siren hurt my dog's ears?",
    answer:
      "In most instances, no. If sirens caused physical ear pain, dogs would typically display avoidance behavior—such as retreating to a hiding spot, cowering, pinning their ears flat against the skull, or shaking their heads. When dogs howl at sirens, they usually raise their muzzles, assume an alert posture, and vocalize calmly until the sound recedes, demonstrating acoustic response rather than pain.",
  },
  {
    question: "Why do some dog breeds howl at sirens much more than others?",
    answer:
      "Genetic heritage plays a substantial role. Northern spitz breeds and working hounds (such as Siberian Huskies, Alaskan Malamutes, Bloodhounds, Bassets, and Beagles) retain stronger ancestral vocal behaviors and vocal cord morphology predisposed to sustained long-distance howling compared to brachycephalic or toy companion breeds.",
  },
  {
    question: "Can I train my dog to stop howling when sirens pass?",
    answer:
      "Because howling at sirens is an instinctive acoustic reflex, completely extinguishing it is challenging. However, you can manage it by desensitizing your dog to low-volume siren recordings paired with high-value treats, or redirecting them to a fun alternate cue (like 'touch' or finding scattered kibble) the moment a siren is heard.",
  },
  {
    question: "Why does my dog stop howling the moment the siren turns off?",
    answer:
      "Canine howling at sirens is primarily an acoustic match and chorusing response. When the stimulus pitch ceases, the communicative trigger vanishes, and the dog naturally returns to their previous baseline activity.",
  },
];

export default function HowlingAtSirensPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/howling-at-sirens`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Do Dogs Howl at Sirens?",
    description:
      "An evidence-based bioacoustic examination of why canine vocal tracts resonate with municipal emergency sirens.",
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
    mainEntity: HOWL_SIREN_FAQS.map((faq) => ({
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
              { label: "Howling at Sirens", href: "/dog-behavior/howling-at-sirens" },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Bioacoustics & Ethology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Why Do Dogs Howl at Sirens?
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              When a fire truck, ambulance, or police vehicle blares its siren down the street, many dogs throw their heads back and unleash an operatic howl. Discover the fascinating intersection of acoustic physics and ancient pack behavior behind this reaction.
            </p>
          </header>

          {/* Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Takeaway</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              Dogs often howl at sirens because of <strong>acoustic frequency overlap and ancestral chorusing behavior</strong>. Emergency sirens frequently modulate between 500 Hz and 2,500 Hz—frequencies that overlap with the harmonic range of canid long-distance vocalizations. Rather than necessarily indicating ear pain, the prominent sweeping sound may trigger an instinctive chorusing reflex, prompting the dog to join in with vocal acknowledgment.
            </p>
          </section>

          {/* Key Ethological Mechanisms */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Scientific Breakdown
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                The Science of Siren Howling
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  1. Pitch Frequency Sweep
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Municipal sirens (such as the &quot;wail&quot; and &quot;yelp&quot; modes) mimic the frequency modulations of wild canid howls, hitting acoustic peaks that resonate with the canine tympanic membrane and vocal tract.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  2. Communal Chorusing Reflex
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  In wild canid groups, howling helps assemble separated pack members, reinforce social bonds, and communicate territory across distance. Domestic dogs retain varying degrees of this vocal chorusing tendency, which can be activated by siren frequencies.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  3. Individual Variation
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Not all dogs howl at sirens. Genetic heritage (Huskies, Hounds, German Shepherds vs. Pugs or Terriers), individual personality, and early socialization determine whether a dog participates in siren chorusing.
                </p>
              </div>
            </div>
          </section>

          {/* Ear Pain vs Healthy Communication */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Does the Siren Hurt Their Ears?
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              A common worry among pet guardians is whether their dog is crying out in acoustic agony. Canine bioacousticians point to observable behavioral markers to differentiate communication from physical pain:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Instinctive Chorusing (Normal)
                </p>
                <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
                  <li>Muzzle points upward toward ceiling or sky.</li>
                  <li>Body is alert and relaxed, not cowering.</li>
                  <li>Tail is in a neutral or high position.</li>
                  <li>Dog calmly resumes resting once siren fades away.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Acoustic Sensitivity / Pain (Seek Care)
                </p>
                <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
                  <li>Ears pinned tightly flat against neck.</li>
                  <li>Tucked tail, panting, and trembling.</li>
                  <li>Frantic pacing or attempting to hide in small spaces.</li>
                  <li>Repeated head shaking or scratching at ear canals.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Management Tips */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Tips for Pet Guardians
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Avoid Scolding:</strong> Howling at sirens is an involuntary evolutionary reflex. Punishing the dog creates anxiety and confusion around normal sound stimuli.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Redirect with Low-Arousal Tasks:</strong> If you live near a hospital or fire station and the howling is disruptive, toss a handful of kibble across the rug to engage their sense of smell immediately upon hearing the siren.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Recognize the Natural Instinct:</strong> For many dogs, siren howling is simply a brief, harmless vocal response related to canine acoustic communication. If the dog is relaxed and not showing fear, remaining calm and unfazed is often the most reassuring response.
                </span>
              </li>
            </ul>
          </section>

          {/* Veterinary Welfare Section */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When Sound Sensitivity Requires Veterinary Care
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              While siren chorusing is typical, extreme noise phobia or auditory distress requires attention. Consult a veterinarian or board-certified veterinary behaviorist (DACVB) if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5">
              <li>The siren triggers panic defecation, destructive clawing at doors, or attempts to jump through windows.</li>
              <li>Your dog continues shaking and remains in distress for more than 20 minutes after the noise has passed.</li>
              <li>Noise sensitivity began suddenly in an older dog (frequently correlates with undetected musculoskeletal or dental pain).</li>
            </ul>
          </section>

          {/* Interactive Tool CTA */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bioacoustic Analysis Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Captured your dog howling?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Upload the sound to our Dog Translator tool. Our acoustic engine evaluates frequency range and harmonics for an objective behavioral interpretation.
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
            <FaqAccordion items={HOWL_SIREN_FAQS} />
          </section>

          {/* Related Internal Links */}
          <section className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/howling"
              className="hover:text-amber-800 font-medium underline"
            >
              Explore our full Canine Howling Sound Guide &rarr;
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-amber-800 font-medium underline"
            >
              Learn how our bioacoustic engine analyzes harmonics &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
