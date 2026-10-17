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
  AlertTriangle,
  ShieldAlert,
  ListChecks,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dog Whining at Night: Causes and What to Do",
  description:
    "Wondering why your dog is whining at night? Explore common causes, what to check first, practical steps to try tonight, and when veterinary care is needed.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-behavior/whining-at-night`,
  },
  openGraph: {
    title: "Dog Whining at Night: Causes and What to Do",
    description:
      "Wondering why your dog is whining at night? Explore common causes, what to check first, practical steps to try tonight, and when veterinary care is needed.",
    url: `${SITE_CONFIG.url}/dog-behavior/whining-at-night`,
  },
};

const WHINE_NIGHT_FAQS = [
  {
    question: "Should I let a new puppy 'cry it out' when whining in the crate?",
    answer:
      "Modern behavioral science advises against prolonged, distressed 'crying it out'. While a brief moment of settling whimpers (one to two minutes) can happen during crate acclimation, sustained or frantic crying indicates genuine distress and elevates stress hormones. Placing the crate right next to your bed during the first few weeks provides reassuring social presence while you establish a consistent house-training schedule.",
  },
  {
    question: "How do I know if nighttime whining is for a bathroom break or attention?",
    answer:
      "A bathroom whine is typically accompanied by physical urgency: pacing, standing tensely at the crate or bedroom door, or sudden restless waking. When you take the dog out on a short leash calmly without talking or playing, an urgent dog eliminates promptly within a couple of minutes. Attention whining, by contrast, often pauses immediately when you look at or speak to the dog, and outdoors the dog may sniff leisurely, wander, or seek interaction instead of relieving themselves.",
  },
  {
    question: "What should I do if a newly adopted rescue dog whines throughout the night?",
    answer:
      "Newly adopted dogs undergo a significant adjustment and decompression period when entering an unfamiliar home. Nighttime darkness and confinement can amplify their apprehension. Keep their sleeping area close to you rather than isolated in another room, provide an article of clothing with your scent, keep a low nightlight or gentle white noise running, and maintain an unwavering, calm evening routine so the dog learns what to expect.",
  },
  {
    question: "Why has my senior dog started pacing and whining in the middle of the night?",
    answer:
      "Sudden nocturnal whining and pacing in an older dog is a frequent clinical sign that warrants a veterinary consultation. It can stem from age-related cognitive changes (such as Canine Cognitive Dysfunction or CCD, which disrupts normal circadian sleep-wake cycles), sensory loss (vision or hearing decline making darkness disorienting), or physical discomfort from arthritis or endocrine conditions that increase the urge to eliminate at night.",
  },
  {
    question: "Could nighttime whining mean my dog is experiencing physical pain?",
    answer:
      "Yes. Whining is a common canine vocal response to acute or chronic discomfort. Signs that night whining may be pain-related include difficulty finding a comfortable resting posture, rapid or shallow panting in a cool room, trembling, stiffness when standing up, reluctance to lie down, or vocalizing specifically when shifting body position.",
  },
];

export default function WhiningAtNightPage() {
  const pageUrl = `${SITE_CONFIG.url}/dog-behavior/whining-at-night`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dog Whining at Night: Causes and What to Do",
    description:
      "Wondering why your dog is whining at night? Explore common causes, what to check first, practical steps to try tonight, and when veterinary care is needed.",
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
              <span>Nocturnal Vocalization &amp; Caregiver Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
              Dog Whining at Night: Causes and What to Do
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              When a dog whines in the middle of the night, it can be distressing for both caregiver and pet. Whining is an innate acoustic communication signal with a wide range of motivations—from an urgent physiological need to go outside or puppy isolation distress to subtle joint stiffness or cognitive changes. Understanding what your dog is signaling is the first step toward restoring peaceful, comfortable nights.
            </p>
          </header>

          {/* Direct Answer Box */}
          <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Direct Answer: Why Dogs Whine at Night</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              Dogs whine at night for several distinct reasons: <strong>urgent physical needs</strong> (a full bladder, gastrointestinal upset, or thirst), <strong>social isolation or fear</strong> (especially common in young puppies, newly adopted rescue dogs, or dogs reacting to nocturnal sounds), <strong>environmental discomfort</strong> (room temperature, drafty bedding), <strong>learned demand behaviors</strong> (seeking attention, play, or access to your bed), or <strong>underlying physical pain and age-related cognitive changes</strong>.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1 border-t border-amber-200/60">
              <strong>Core Caregiver Principle:</strong> Whining is a behavioral indicator, not a definitive medical diagnosis. Always rule out urgent physiological relief and comfort needs first before treating the sound as attention-seeking or testing behavioral boundaries.
            </p>
          </section>

          {/* 4-Step Immediate Assessment / Triage */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-amber-600" />
                <span>Immediate Bedtime Triage</span>
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                What to Check First: A 4-Step Checklist
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              If your dog is whining right now, walk through these four immediate checks before assuming the behavior is merely demanding attention:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Urgent Elimination &amp; Thirst</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  How many hours have passed since their last outdoor relief? Does the dog seem restless, tense, or moving toward the door? Check that their water bowl was accessible earlier in the evening and they aren&apos;t dehydrated or showing stomach gurgles.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Sleeping Environment &amp; Comfort</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Is the sleeping space too warm, cold, or drafty? Is the bed clean and cushioned enough for older joints? Young puppies and thin-coated breeds are particularly vulnerable to sudden room temperature dips during the night.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Nocturnal Sounds &amp; Startle Triggers</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Dogs have hearing extending up to 45,000 Hz. Distant wildlife, nocturnal rodents in walls, wind rattling windows, or HVAC compressor hums can startle a sensitive dog. Observe whether the whining alternates with low alert barks or cautious listening posture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">4</span>
                  <h3 className="text-sm font-serif font-bold text-stone-900">Physical Discomfort or Hidden Pain</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Does your dog hesitate to lie down, repeatedly reposition their body, pant in a cool room, or guard their abdomen? Involuntary soft whines during posture changes strongly indicate physical soreness rather than intentional communication.
                </p>
              </div>
            </div>
          </section>

          {/* Common Reasons Explained */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Acoustic &amp; Behavioral Insights
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Common Reasons Why Dogs Whine at Night
              </h2>
            </div>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p>
                From an ethological standpoint, whining is primarily a contact-seeking vocalization rooted in maternal petitioning. In adult domestic dogs, the characteristically high-pitched tonal quality of a whine functions to elicit caretaking or protective responses from human companions. To understand how pitch, tempo, and situational context interact, explore our comprehensive{" "}
                <Link
                  href="/dog-sounds/whining"
                  className="text-amber-800 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                >
                  canine whining sound guide
                </Link>
                .
              </p>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  1. Urgent Physical Relief &amp; Digestive Needs
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Even reliably house-trained adult dogs encounter sudden digestive disturbances, dietary indiscretions, or urinary urgency. When nocturnal whining is sharp, persistent, and accompanied by circling or scratching at bedroom doors, the priority must always be providing a prompt, quiet outdoor opportunity.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  2. Social Isolation, Fear, and Confinement Distress
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Dogs are deeply social animals. When separated behind closed doors, gates, or inside a crate in a remote laundry room or basement, feelings of vulnerability and barrier frustration can trigger distressing vocal loops. If your dog also exhibits quieter, muffled sounds while resting, compare their vocalizations with our guide on{" "}
                  <Link
                    href="/dog-sounds/whimpering"
                    className="text-amber-800 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                  >
                    dog whimpering cues
                  </Link>{" "}
                  or check if they are actually asleep and experiencing normal dream states in our walkthrough on{" "}
                  <Link
                    href="/dog-behavior/whimpering-in-sleep"
                    className="text-amber-800 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                  >
                    whimpering in sleep
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  3. Learned Demand Behavior (Operant Conditioning)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Dogs learn quickly what actions produce rewards. If whining at 2 AM previously resulted in being invited into your bed, receiving midnight treats, or getting 20 minutes of reassuring pets and verbal conversation, the dog has learned that vocalizing operates as an effective door chime for human engagement.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  4. Nocturnal Disturbance &amp; Startle Reactions
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Outdoor stimuli such as passing delivery trucks, urban wildlife, or wind rattling loose fixtures frequently prompt low-level anxiety. In many households, dogs alternate between whining and sharp alert barks when detecting unseen nocturnal activity. For insights on distinguishing alarm responses from demand cues, consult our{" "}
                  <Link
                    href="/dog-bark-analyzer"
                    className="text-amber-800 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                  >
                    dog bark analyzer
                  </Link>{" "}
                  and our dedicated guide on{" "}
                  <Link
                    href="/dog-behavior/barking-at-night"
                    className="text-amber-800 font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                  >
                    barking at night
                  </Link>
                  .
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
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Rapidly escalating pitch with evident physical tension and tight body posture.</li>
                  <li>Dog immediately heads toward the outdoor door upon release without hesitating.</li>
                  <li>Accompanied by restless circling, panting, or audible abdominal gurgles.</li>
                  <li>The dog eliminates promptly when taken outside and ignores distractions.</li>
                  <li>Does not cease when you speak softly or offer gentle verbal reassurance.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Signs of Attention / Social Whining
                </p>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Stops immediately the moment you look, speak, or make physical contact with them.</li>
                  <li>Accompanied by loose body language, soft tail wags, play bows, or seeking favorite toys.</li>
                  <li>Sniffs aimlessly, grazes on grass, or attempts to play when taken outdoors.</li>
                  <li>Follows an intermittent, trial-and-error cadence with pauses to assess your reaction.</li>
                  <li>Often aimed directly at gaining access to your bed, couch, or midnight snacks.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Life Stage Breakdown - Puppies, Newly Adopted, Adults, Seniors */}
          <section className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Developmental &amp; Life Stage Differences
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Night Whining Across Different Life Stages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Puppies */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-lg font-serif font-bold">Puppies (8–24 Weeks)</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Young puppies have physiologically immature bladders that physically cannot hold urine throughout an entire 8-hour night. Furthermore, having recently departed their mother and littermates, darkness and crate isolation can provoke instinctual separation panic. Whining is their biological distress whistle. Placing their crate next to your bed and scheduling one or two calm nocturnal bathroom breaks bridges this developmental stage gently.
                </p>
              </div>

              {/* Newly Adopted Dogs */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-lg font-serif font-bold">Newly Adopted Dogs</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Rescue dogs experiencing a new home undergo a sensitive decompression and adjustment period. Unfamiliar nocturnal smells, strange acoustics, and past history with confinement can induce profound anxiety when the lights go out. Allowing them to sleep within sight of their new family members and providing consistent, predictable evening routines significantly shortens this transitional adjustment.
                </p>
              </div>

              {/* Adult Dogs */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-lg font-serif font-bold">Adult Dogs</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  In healthy adults with firmly established house-training, nighttime whining is usually either an operant behavior (learned expectation of attention or bed privileges) or an acute event such as sudden digestive upset, an unaccustomed schedule shift, or nighttime pests outside. Reviewing daytime exercise, evening feeding schedules, and environmental triggers resolves most adult cases.
                </p>
              </div>

              {/* Senior Dogs */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-lg font-serif font-bold">Senior Dogs (8+ Years)</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Geriatric dogs often face altered circadian sleep-wake cycles. Night whining coupled with aimless pacing, panting, or standing in corners can indicate Canine Cognitive Dysfunction (CCD, akin to canine dementia), night vision impairment, or orthopedic discomfort from arthritis when resting on firm floors. A veterinary evaluation is always recommended when a senior dog&apos;s nighttime behavior changes suddenly.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Caregiver Steps - What to try tonight */}
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Practical Steps: What You Can Do Tonight
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When dealing with night whining right now, implement these gentle, practical management steps to restore calm without establishing undesirable habits:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Conduct a Low-Stimulation Bathroom Check:</strong> Leash your dog calmly, avoid making energetic eye contact or talking, proceed directly to the designated elimination area in dim light, allow 3 to 5 minutes strictly for business, and return them immediately to their bed with calm praise once they finish.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Move the Sleeping Area Closer:</strong> If a puppy or newly adopted dog is whining due to isolation, move their crate or dog bed right into your bedroom. Your breathing and presence provide immense soothing value without reinforcing vocal demands.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Provide Familiar Scents &amp; Orthopedic Support:</strong> Place an unwashed t-shirt carrying your scent inside their bed, and ensure older dogs have a supportive orthopedic mattress shielded from drafts.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Use Sound Masking &amp; Gentle Nightlights:</strong> A low-frequency white noise machine or fan masks jarring outdoor nocturnal noises, while a soft nightlight helps senior dogs with deteriorating night vision navigate their room comfortably.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Review Evening Feeding &amp; Exercise Routines:</strong> Offer the final meal 3 to 4 hours before sleep to prevent midnight indigestion, and always provide a dedicated outdoor relief opportunity immediately before turning the lights out.
                </span>
              </li>
            </ul>
          </section>

          {/* What to Avoid Doing */}
          <section className="bg-stone-100/90 rounded-2xl border border-stone-300/80 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-stone-900">
              <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                What Caregivers Should Avoid Doing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Certain common human reactions can inadvertently prolong or worsen nocturnal whining:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Do Not Scold, Yell, or Physically Punish:</strong> Whining is an involuntary emotional expression of distress or physical need. Scolding increases systemic cortisol, elevates anxiety, and damages trust between you and your pet.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Do Not Force Prolonged &apos;Cry It Out&apos; Sessions:</strong> Leaving a terrified puppy or distressed rescue dog to scream for hours causes traumatic associations with sleeping spaces and can worsen long-term separation distress.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Do Not Turn Midnight Breaks into Playtime:</strong> Avoid turning on bright overhead lights, playing with toys, or providing high-value treats during 3 AM wakeups, as this reinforces nighttime awakenings.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Do Not Ignore Sudden Shifts in Vocal Behavior:</strong> A dog that previously slept soundly through the night and abruptly begins whining requires an immediate physical and veterinary assessment, not behavioral correction.
                </span>
              </li>
            </ul>
          </section>

          {/* Veterinary Welfare Callout */}
          <section className="bg-amber-50/80 rounded-2xl border border-amber-300 p-6 sm:p-8 space-y-4 text-amber-950">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-6 h-6 text-amber-800 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                When to Consult a Licensed Veterinarian
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              Because vocalizations can be the only outward symptom of underlying pain or clinical distress, schedule an appointment with a licensed veterinarian if:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc pl-5 leading-relaxed">
              <li>Your dog whines or cries while posturing to urinate or defecate, or shows repeated unsuccessful attempts to eliminate.</li>
              <li>A previously calm adult or senior dog suddenly begins persistent night whining with no environmental explanation.</li>
              <li>Night whining is accompanied by shaking, rapid shallow breathing, lethargy, vomiting, fever, or refusal to bear weight.</li>
              <li>An older dog exhibits nocturnal disorientation, gets stuck behind doors or furniture, or wanders aimlessly into corners.</li>
              <li>The whining occurs consistently when the dog stands up, lies down, or shifts sleeping positions on their bed.</li>
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
              Capture a short audio recording and select &quot;Left alone&quot; or &quot;Resting or waking&quot; in our Dog Translator for an objective, cautious behavioral interpretation grounded in canine acoustic research.
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
          <section className="pt-6 border-t border-stone-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Explore Related Guides &amp; Bioacoustic Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href="/dog-sounds/whining"
                className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:border-amber-400 hover:text-amber-800 transition-colors"
              >
                <span className="font-semibold block text-sm">Canine Whining Acoustic Guide &rarr;</span>
                <span className="text-stone-500">Understand pitch frequencies, excitement, and anxiety whines.</span>
              </Link>
              <Link
                href="/dog-sounds/whimpering"
                className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:border-amber-400 hover:text-amber-800 transition-colors"
              >
                <span className="font-semibold block text-sm">Dog Whimpering Guide &rarr;</span>
                <span className="text-stone-500">Learn to interpret softer, intimate submissive and comfort whimpers.</span>
              </Link>
              <Link
                href="/dog-behavior/whimpering-in-sleep"
                className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:border-amber-400 hover:text-amber-800 transition-colors"
              >
                <span className="font-semibold block text-sm">Whimpering in Sleep &rarr;</span>
                <span className="text-stone-500">Explore REM dream cycles and distinguish dreams from waking distress.</span>
              </Link>
              <Link
                href="/dog-behavior/barking-at-night"
                className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:border-amber-400 hover:text-amber-800 transition-colors"
              >
                <span className="font-semibold block text-sm">Barking at Night Guide &rarr;</span>
                <span className="text-stone-500">Learn how to address nocturnal alert, territorial, and boredom barking.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
