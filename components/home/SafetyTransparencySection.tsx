import React from "react";
import { ShieldCheck, Stethoscope, FileLock2, BrainCircuit } from "lucide-react";

export function SafetyTransparencySection() {
  const commitments = [
    {
      title: "No Deceptive False Precision",
      description:
        "We never claim fake precision like '97.4% happy'. Canine emotions are dynamic states best described with honest qualitative indicators (Possible, Likely, Strong).",
      icon: BrainCircuit,
    },
    {
      title: "Veterinary-First Safety Protocols",
      description:
        "If a sound or contextual report indicates possible pain, distress, or sudden behavioral regression, our system immediately recommends professional veterinary care.",
      icon: Stethoscope,
    },
    {
      title: "Strict Ephemeral Audio Privacy",
      description:
        "In our MVP architecture, audio buffers are processed purely in memory and discarded immediately after interpretation. No permanent audio files or speech profiles are stored.",
      icon: FileLock2,
    },
    {
      title: "No Literal Translation Claims",
      description:
        "Dogs do not speak human syntax. We provide probabilistic behavioral interpretations grounded in canine ethology, not gimmick translations.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Our Ethical Commitment
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Responsible Animal AI Grounded in Bioacoustics
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Dog Translator is engineered with scientific humility. We provide probabilistic behavioral interpretations grounded in canine behavioral and acoustic principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {commitments.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-stone-200 shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
