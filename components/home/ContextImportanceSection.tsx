import React from "react";
import { Eye, Clock, MapPin, Activity } from "lucide-react";

export function ContextImportanceSection() {
  const pillars = [
    {
      title: "Body Language Parity",
      description:
        "A vocalization accompanied by a play bow communicates friendly arousal; the exact same acoustic pitch paired with a stiff body freeze indicates distance-increasing tension.",
      icon: Eye,
    },
    {
      title: "Cadence & Tempo",
      description:
        "Repetition rate can provide clues about emotional urgency. Rapid, continuous bursts can indicate elevated physiological arousal, while spaced vocalizations can suggest calmer monitoring.",
      icon: Clock,
    },
    {
      title: "Environmental Trigger",
      description:
        "Knowing whether the sound occurred at a perimeter fence, in an empty living room, or beside an empty water dish radically changes the behavioral probabilities.",
      icon: MapPin,
    },
    {
      title: "Baseline Individuality",
      description:
        "Every dog possesses an individual vocal baseline. Breed heritage, age, and individual personality heavily influence vocal frequency and habits.",
      icon: Activity,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Canine Science
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Why Sound Alone Is Only Half the Story
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              No genuine canine communication platform can rely strictly on raw audio. Dogs communicate as whole-body organisms—combining vocal frequencies with ear posture, tail movement, gaze direction, and situational history.
            </p>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-900 font-medium">
              &quot;We cannot literally translate a dog&apos;s language, but we can help you interpret vocalizations and behavior in context.&quot;
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-stone-200 text-amber-800 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
