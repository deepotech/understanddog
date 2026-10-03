import React from "react";
import { DogAnalysisResult, QualitativeConfidence } from "@/lib/ai/types";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Info,
  ArrowRight,
  Stethoscope,
  Volume2,
  Compass,
  Clock,
  MicOff,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface AnalysisResultCardProps {
  result: DogAnalysisResult;
  onReset: () => void;
}

export function AnalysisResultCard({ result, onReset }: AnalysisResultCardProps) {
  const getConfidenceBadge = (confidence: QualitativeConfidence) => {
    switch (confidence) {
      case "strong":
        return {
          label: "Strong Indicator",
          classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "likely":
        return {
          label: "Likely Interpretation",
          classes: "bg-amber-50 text-amber-800 border-amber-200",
        };
      case "possible":
      default:
        return {
          label: "Possible Interpretation",
          classes: "bg-stone-100 text-stone-700 border-stone-200",
        };
    }
  };

  const badge = getConfidenceBadge(result.interpretation.confidence);

  // Handle all edge & error states with tailored user-friendly UI
  if (result.status !== "success") {
    let icon = <Info className="w-5 h-5 text-amber-800" />;
    let iconBg = "bg-amber-100";
    const title = result.interpretation.primary;
    const description = result.interpretation.summary;

    if (result.status === "not_a_dog_sound") {
      icon = <MicOff className="w-5 h-5 text-amber-800" />;
      iconBg = "bg-amber-100";
    } else if (result.status === "insufficient_audio" || result.status === "audio_too_short") {
      icon = <Volume2 className="w-5 h-5 text-amber-800" />;
      iconBg = "bg-amber-100";
    } else if (result.status === "ai_timeout") {
      icon = <Clock className="w-5 h-5 text-amber-800" />;
      iconBg = "bg-amber-100";
    } else if (result.status === "rate_limited") {
      icon = <Clock className="w-5 h-5 text-amber-800" />;
      iconBg = "bg-amber-100";
    } else if (
      result.status === "ai_provider_error" ||
      result.status === "internal_error" ||
      result.status === "malformed_ai_response"
    ) {
      icon = <AlertTriangle className="w-5 h-5 text-red-700" />;
      iconBg = "bg-red-50";
    } else if (result.status === "ai_unavailable") {
      icon = <Sparkles className="w-5 h-5 text-stone-600" />;
      iconBg = "bg-stone-100";
    }

    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in-50 duration-200">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
          >
            {icon}
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-mono">
              Status: {result.status.replace(/_/g, " ")}
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900">{title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
          </div>
        </div>

        {result.suggestions.length > 0 && (
          <div className="bg-stone-50 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-stone-700 space-y-2 border border-stone-200/70">
            <p className="font-semibold text-stone-900">Recommended next steps:</p>
            <ul className="space-y-1.5 pl-1">
              {result.suggestions.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
          <Link
            href="/dog-sounds"
            className="text-xs font-semibold text-amber-800 hover:text-amber-950"
          >
            Explore the Canine Sound Library &rarr;
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Another Recording</span>
          </button>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden animate-in fade-in-50 duration-300">
      {/* Top Header Banner */}
      <div className="border-b border-stone-200 bg-stone-50/70 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Acoustic Classification
            </span>
            <p className="text-sm sm:text-base font-bold text-stone-900 capitalize">
              {result.vocalization} Vocalization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Demo / Mock simulation indicator */}
          {result.isDemoMode ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Demo / Simulation Mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Real AI Analysis
            </span>
          )}

          {/* Qualitative Confidence Badge (NO fake precision) */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badge.classes}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {badge.label}
          </span>
        </div>
      </div>

      {/* Primary Interpretation Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Possible Interpretation
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
            {result.interpretation.primary}
          </h3>
          <p className="text-stone-700 text-sm sm:text-base mt-2 leading-relaxed">
            {result.interpretation.summary}
          </p>
        </div>

        {/* Possible Contexts & Acoustic Observations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {result.possibleContexts.length > 0 && (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>Likely Contextual Triggers</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                {result.possibleContexts.map((ctx, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-700 mt-0.5">•</span>
                    <span>{ctx}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.observations.length > 0 && (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Acoustic Patterns Observed</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                {result.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-700 mt-0.5">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Useful Next Steps / Suggestions */}
        {result.suggestions.length > 0 && (
          <div className="bg-amber-50/50 rounded-xl p-4 sm:p-5 border border-amber-200/60 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Helpful Next Steps for You
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
              {result.suggestions.map((sug, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prominent Veterinary / Safety Callout if distress or discomfort suspected */}
        {result.safetyNote && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 sm:p-5 text-red-900 flex items-start gap-3"
          >
            <Stethoscope className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-red-950">
                Veterinary Advisory Notice
              </p>
              <p className="leading-relaxed text-red-800">{result.safetyNote}</p>
            </div>
          </div>
        )}

        {/* Transparent Responsible Disclaimer */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 text-xs text-stone-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
          <p>{result.disclaimer}</p>
        </div>

        {/* Bottom Actions & Topical Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/dog-sounds/${result.vocalization !== "unidentified" ? result.vocalization : "barking"}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 transition-colors"
          >
            <span>Learn more about {result.vocalization} in our Sound Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            Analyze Another Sound
          </button>
        </div>
      </div>
    </div>
  );
}
