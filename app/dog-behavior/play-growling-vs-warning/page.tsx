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
  Shield,
  Activity,
  AlertOctagon,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Play Growl vs. Warning Growl in Dogs: How to Tell the Difference",
  description:
    "Learn how to tell if a dog is play growling or warning you. Discover how body language, loose posturing, and context reveal whether a growl is playful or defensive.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/play-growling-vs-warning`,
  },
  openGraph: {
    title: "Play Growl vs. Warning Growl in Dogs: Canine Behavioral Guide",
    description:
      "Explore the crucial ethological differences between playful tug-of-war growling and distance-increasing warning signals. Grounded in canine ethology.",
    url: `${SITE_CONFIG.url}/dog-behavior/play-growling-vs-warning`,
  },
};

const GROWL_FAQS = [
  {
    question: "Is it normal for dogs to growl while playing tug-of-war?",
    answer:
      "Yes. Growling during tug-of-war, fetch, or rough-and-tumble canine play is common and often completely harmless. Play growls are typically higher in pitch, punctuated by play bows, loose body curves, and bouncy pauses. However, if the dog's body stiffens, eyes widen with sclera visible, or the dog freezes over the toy, play should be paused.",
  },
  {
    question: "Should I punish my dog for growling when they are upset?",
    answer:
      "No. Animal behaviorists universally advise against punishing a warning growl. A growl is an essential distance-increasing communication tool that warns a dog is uncomfortable or fearful. If you punish the growl, the dog may learn to suppress the warning signal and escalate directly to snapping or biting without warning in future high-stress moments.",
  },
  {
    question: "Can audio alone distinguish a play growl from an aggressive growl?",
    answer:
      "Bioacoustic research shows that play growls often exhibit higher pitch fluctuations and broader frequency variation compared to the deeper, continuous resonance of defensive warning growls. However, audio frequency alone is never 100% conclusive without observing accompanying body language and context.",
  },
  {
    question: "What should I do if my dog suddenly freezes and growls at me?",
    answer:
      "Freeze your own motion immediately. Avoid direct, hard eye contact or leaning over the dog. Speak in a calm, soft voice, and slowly give the dog space. Do not attempt to grab whatever the dog might be guarding. Once safe, identify what triggered the discomfort to prevent similar confrontation.",
  },
];

export default function PlayGrowlVsWarningPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/play-growling-vs-warning`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Play Growl vs. Warning Growl: How to Tell the Difference",
    description:
      "Ethological framework for differentiating harmless play growling from distance-increasing warning growls using body language parity and acoustic context.",
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
    mainEntity: GROWL_FAQS.map((faq) => ({
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
              { label: "Play Growl vs. Warning", href: "/dog-behavior/play-growling-vs-warning" },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Canine Ethology & Safety</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Play Growl vs. Warning Growl: How to Tell the Difference
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Hearing your dog growl can be startling, especially during games of tug or close interactions. Learning to evaluate the whole dog—combining acoustic frequency with physical posture—ensures you know when to enjoy play and when to give space.
            </p>
          </header>

          {/* Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Answer</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              The crucial difference between a play growl and a warning growl lies in <strong>body language and physical tension</strong> rather than sound alone. A play growl features loose, bouncy body movements, play bows (elbows down, rump up), and frequent natural pauses. A warning growl features a stiff body freeze, closed or retracted lips, hard eye contact, and distance-increasing intent.
            </p>
          </section>

          {/* Comparison Cards: Play vs Warning */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Ethological Comparison
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Evaluating the Full Behavioral Picture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Play Growl Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      The Play Growl
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Harmless Interaction
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Used as part of social solicitation, mock-battle, or exuberant object play such as tug-of-war.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-stone-700 pt-2">
                  <p className="font-semibold text-stone-900">Observable Physical Signs:</p>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span><strong>Body Posture:</strong> Loose, curvaceous spine, exaggerated bouncy movements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span><strong>Play Bows:</strong> Front elbows flat on floor with tail waving in high, loose wag.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span><strong>Facial Expression:</strong> Soft eyes, open mouth with tongue loosely out.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span><strong>Acoustics:</strong> Shifting pitch with frequent interruptions and breathy pauses.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Warning Growl Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-amber-700" />
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      The Warning Growl
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Distance-Increasing Cues
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Used to establish boundaries when feeling threatened, guarding resources, in pain, or startled.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-stone-700 pt-2">
                  <p className="font-semibold text-stone-900">Observable Physical Signs:</p>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      <span><strong>Body Posture:</strong> Rigid freeze, weight pitched forward or leaning back tensely.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      <span><strong>Tail Carriage:</strong> Low, stiff, or held rigid with fast twitching at the tip.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      <span><strong>Gaze:</strong> Hard unblinking stare, &quot;whale eye&quot; showing the white sclera.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-800 font-bold">•</span>
                      <span><strong>Acoustics:</strong> Lower fundamental frequency relative to the individual dog&apos;s typical pitch range, often sustained with minimal pitch fluctuation.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Ethological Science: Why Growling Is Good Communication */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Why You Should Never Punish a Warning Growl
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              When a human hears a warning growl, the natural instinct might be to reprimand the dog with a loud <em>&quot;No!&quot;</em> Ethologists describe this as a dangerous mistake. A growl is an early safety valve in canine communication.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              If you train a dog that growling brings punishment, they may stop vocalizing when frightened—but the underlying stress remains. This creates a dog that escalates straight to snapping or biting without giving a vocal warning. Always address what made the dog uncomfortable, not the vocalization itself.
            </p>
          </section>

          {/* Safe Caregiver Protocol */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Safe Protocol: What to Do in the Moment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="font-bold text-stone-900">1. Stop Moving</p>
                <p className="text-stone-600">
                  Instantly freeze whatever motion triggered the growl (e.g. petting, moving toward food, leaning over).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="font-bold text-stone-900">2. Avoid Eye Contact</p>
                <p className="text-stone-600">
                  Avert your gaze slightly to the side. Hard direct eye contact can be perceived as an escalated challenge.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                <p className="font-bold text-stone-900">3. Give Space Slowly</p>
                <p className="text-stone-600">
                  Calmly step backward. Allow the dog to retain their boundary, then calmly reassess the environment.
                </p>
              </div>
            </div>
          </section>

          {/* Veterinary Welfare Callout */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When Growling May Indicate Medical Pain
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Sudden behavioral changes in an otherwise gentle dog often have a physiological cause. Consult a veterinarian or certified animal behaviorist (DACVB/CAAB) if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5">
              <li>Your dog growls when touched in a specific anatomical area (such as the hips, ears, paws, or abdomen).</li>
              <li>A friendly older dog growls when being woken from sleep (sleep startle or arthritic stiffness).</li>
              <li>Resource guarding or aggression appears abruptly with no prior history.</li>
            </ul>
          </section>

          {/* Interactive Tool CTA */}
          <section className="bg-gradient-to-tr from-amber-800 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bioacoustic Analysis Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
              Recorded your dog growling?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Upload the sound to Dog Translator with optional context (such as &quot;Playing / Excited&quot;) for an objective, bioacoustic behavioral interpretation.
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
            <FaqAccordion items={GROWL_FAQS} />
          </section>

          {/* Related Internal Links */}
          <section className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <Link
              href="/dog-sounds/growling"
              className="hover:text-amber-800 font-medium underline"
            >
              Read the full Canine Growling Acoustic Profile &rarr;
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-amber-800 font-medium underline"
            >
              Learn about frequency and threat resonance in How It Works &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
