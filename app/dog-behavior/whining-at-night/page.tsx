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
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Is My Dog Whining at Night? Puppy, Adult & Senior Dog Cues",
  description:
    "Understand why your dog whines at night. Differentiate bathroom urgency, crate adjustment, separation anxiety, and physical discomfort with practical caregiver steps.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/whining-at-night`,
  },
  openGraph: {
    title: "Why Is My Dog Whining at Night? Canine Behavioral & Welfare Guide",
    description:
      "Explore the common motivations behind nighttime whining across puppies, adult dogs, and seniors. Practical routines and veterinary checkup guidelines.",
    url: `${SITE_CONFIG.url}/dog-behavior/whining-at-night`,
  },
};

const WHINE_NIGHT_FAQS = [
  {
    question: "Should I let a new puppy 'cry it out' when whining in the crate?",
    answer:
      "Modern behavioral ethology strongly advises against prolonged, distressed 'crying it out'. While brief protest whining for a minute or two is normal during crate adjustment, persistent frantic whining triggers high cortisol levels and negative emotional associations with sleeping spaces. Keeping the crate beside your bed during early weeks provides comfort while establishing house-training habits.",
  },
  {
    question: "How do I know if nighttime whining is for a bathroom break or attention?",
    answer:
      "A bathroom whine is typically accompanied by urgency, restlessness, pacing toward the door, or direct eye contact. Take the dog out on a short leash calmly, allow 3-5 minutes strictly for business with minimal verbal engagement, and return them immediately to sleep. If they repeatedly seek play or cuddles, they are learning that whining functions as an operant attention lever.",
  },
  {
    question: "Why has my senior dog started pacing and whining at 3 AM?",
    answer:
      "Nocturnal pacing and whining in older dogs can be an indicator of cognitive changes (such as Canine Cognitive Dysfunction, or CCD), sensory decline in darkness, or physical discomfort (such as joint stiffness or increased urge to eliminate). A veterinary evaluation is recommended whenever an older dog's nighttime behavior shifts noticeably.",
  },
  {
    question: "Can feeding my dog closer to bedtime reduce night whining?",
    answer:
      "Feeding 3 to 4 hours before bedtime is usually optimal. Eating too late can cause indigestion or midnight bowel urgency, while an excessively early dinner can lead to early-morning hunger pangs or acid reflux, both of which trigger distress whines.",
  },
];

export default function WhiningAtNightPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/whining-at-night`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Is My Dog Whining at Night?",
    description:
      "A comprehensive guide to understanding canine nocturnal whining, differentiating emotional, physical, and developmental causes without medical overreach.",
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
    mainEntity: WHINE_NIGHT_FAQS.map((faq) => ({
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
              { label: "Whining at Night", href: "/dog-behavior/whining-at-night" },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Moon className="w-3.5 h-3.5 text-amber-700" />
              <span>Nocturnal Vocalization</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Why Is My Dog Whining at Night?
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Whining is one of the most poignant sounds a dog makes. Because whines can indicate everything from urgent bathroom needs to puppy loneliness or physical discomfort, understanding what your dog is communicating is essential.
            </p>
          </header>

          {/* Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Answer</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              Dogs whine at night primarily for four distinct reasons: <strong>physical needs</strong> (urgent elimination, thirst), <strong>social isolation</strong> (especially in newly adopted rescue dogs or young puppies), <strong>learned demand behaviors</strong> (seeking human interaction or bed access), or <strong>age-related cognitive changes/discomfort</strong>. Pinpointing your dog&apos;s life stage and routine is the key to solving the behavior.
            </p>
          </section>

          {/* Life Stage Breakdown */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Developmental Context
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Night Whining Across Different Life Stages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-lg font-serif font-bold">Puppies (8–24 Wks)</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Puppies have limited bladder control (as a general guideline, roughly one hour per month of age during daytime) and natural litter separation distress. Whining is an instinctive distress petition that functions to summon maternal care.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-lg font-serif font-bold">Adult Dogs</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  In healthy adults with established house-training, nighttime whining is frequently operant behavior (learned expectation of attention) or sudden acute needs (stomach upset, outdoor wildlife outside the window).
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-lg font-serif font-bold">Senior Dogs (8+ Yrs)</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Older dogs frequently experience disrupted sleep-wake circadian cycles. Night whining is often coupled with pacing or panting due to Canine Cognitive Dysfunction, sensory decline in darkness, or arthritic aches.
                </p>
              </div>
            </div>
          </section>

          {/* Differentiating Needs vs Demand */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Bathroom Need vs. Attention Solicitation: How to Tell
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Signs of an Urgent Physical Need
                </p>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                  <li>Rapidly escalating pitch with high tension.</li>
                  <li>Dog immediately heads for the door upon release.</li>
                  <li>Accompanied by restless circling or belly gurgling.</li>
                  <li>The dog eliminates promptly when taken outside.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Signs of Attention / Social Whining
                </p>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                  <li>Stops immediately when you speak or touch them.</li>
                  <li>Accompanied by tail wags, play bows, or toy grabbing.</li>
                  <li>Sniffs aimlessly or attempts to play when taken outdoors.</li>
                  <li>Follows an intermittent, trial-and-error cadence.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Caregiver Steps */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Gentle Management Protocols
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Keep Bathroom Trips Business-Like:</strong> If your dog whines at night, leash them calmly, proceed directly to the elimination spot in quiet darkness, reward prompt relief, and return to bed with zero playtime.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Calming Bedtime Transition:</strong> Ensure the sleeping area has a comfortable orthopedic bed, consistent temperature, and an article of clothing with your scent for soothing reassurance.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Avoid Late Heavy Meals & Excessive Water:</strong> Offer dinner 3 to 4 hours before bedtime and a final outdoor relief opportunity immediately prior to turning out lights.
                </span>
              </li>
            </ul>
          </section>

          {/* Veterinary Welfare Callout */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When to Consult a Veterinarian
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Whining is an innate bioacoustic signal of discomfort. Arrange an appointment with a licensed veterinarian if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5">
              <li>Your dog whines repeatedly while posturing to urinate or defecate (which may suggest urinary or gastrointestinal discomfort).</li>
              <li>A senior dog exhibits sudden disorientation, wandering, getting stuck behind doors, or vocalizing in corners.</li>
              <li>Night whining is accompanied by shaking, rapid shallow breathing, vomiting, or reluctance to bear weight on limbs.</li>
            </ul>
          </section>

          {/* Interactive Tool CTA */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bioacoustic Analysis Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Heard your dog whining at night?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Capture a 5-second audio clip and select &quot;Left alone&quot; or &quot;Resting or waking&quot; in our Dog Translator for an objective, cautious behavioral interpretation.
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
            <FaqAccordion items={WHINE_NIGHT_FAQS} />
          </section>

          {/* Related Internal Links */}
          <section className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/whining"
              className="hover:text-amber-800 font-medium underline"
            >
              Explore our full Canine Whining Acoustic Guide &rarr;
            </Link>
            <Link
              href="/dog-sounds/whimpering"
              className="hover:text-amber-800 font-medium underline"
            >
              Learn about softer whimpers in our Whimpering Guide &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
