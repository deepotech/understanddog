import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-stone-200/70 bg-gradient-to-b from-amber-50/40 via-stone-50 to-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/80 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Canine Bioacoustics & Behavioral AI</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900 leading-tight">
            Understand What Your Dog&apos;s <span className="text-amber-700">Sounds May Mean</span>.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Record or upload a bark, whine, growl, or howl and get a probabilistic behavioral interpretation based on sound and context.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/dog-translator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-amber-900/10 hover:bg-amber-800 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Analyze My Dog&apos;s Sound</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/dog-bark-analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-base font-semibold text-stone-700 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              <span>Explore Bark Analyzer</span>
            </Link>
          </div>

          {/* Key Value Micro-Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-stone-500">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-700" />
              <span>Instant Sound Analysis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Zero Audio Retention</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-amber-700" />
              <span>Veterinarian-Guided Safety</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
