import React from "react";
import { Mic, Compass, Cpu, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Capture the Vocalization",
      description:
        "Record 3 to 10 seconds of your dog barking, whining, or growling with one tap, or upload an existing audio recording.",
      icon: Mic,
    },
    {
      number: "02",
      title: "Add Optional Context",
      description:
        "Note what was happening—doorbell, play session, alone time, or meal preparation. Context refines interpretation precision.",
      icon: Compass,
    },
    {
      number: "03",
      title: "Bioacoustic Analysis",
      description:
        "Our models evaluate fundamental frequency, harmonics, cadence, and duration against canine behavioral ethology.",
      icon: Cpu,
    },
    {
      number: "04",
      title: "Behavioral Readout",
      description:
        "Receive qualitative confidence, likely emotional motivations, environmental triggers, and suggested caregiver responses.",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            From Sound to Meaning
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Canine communication is rich, nuanced, and context-dependent. Here is how we bridge sound and behavior responsibly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
