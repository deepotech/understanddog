"use client";

import React from "react";
import { ContextTrigger } from "@/lib/ai/types";
import { HelpCircle } from "lucide-react";

interface ContextOption {
  value: ContextTrigger;
  label: string;
  emoji: string;
}

const CONTEXT_OPTIONS: ContextOption[] = [
  { value: "playing", label: "Playing / Excited", emoji: "🎾" },
  { value: "someone_arrived", label: "Someone arrived", emoji: "🚪" },
  { value: "left_alone", label: "Left alone", emoji: "🛋️" },
  { value: "saw_another_dog", label: "Saw another dog", emoji: "🐕" },
  { value: "wanted_food", label: "Wanted food / treats", emoji: "🥩" },
  { value: "resting_sleeping", label: "Resting or waking", emoji: "💤" },
  { value: "unknown", label: "Not sure / other", emoji: "❓" },
];

interface ContextSelectorProps {
  selectedContext: ContextTrigger;
  onChange: (context: ContextTrigger) => void;
}

export function ContextSelector({ selectedContext, onChange }: ContextSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
          <span>What was happening?</span>
          <span className="text-xs font-normal text-stone-500">(Optional context)</span>
        </label>
        <span className="text-xs text-stone-500 hidden sm:inline">
          Context refines behavioral accuracy
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Situational context during dog vocalization"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {CONTEXT_OPTIONS.map((opt) => {
          const isSelected = selectedContext === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`flex items-center gap-2 p-3 sm:px-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left min-h-[44px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                isSelected
                  ? "bg-amber-100/80 border-amber-500 text-amber-950 font-semibold shadow-xs"
                  : "bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <span className="text-base select-none" aria-hidden="true">
                {opt.emoji}
              </span>
              <span className="truncate">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-stone-500 flex items-center gap-1">
        <HelpCircle className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <span>
          Context is optional. You can analyze the sound directly without selecting an option.
        </span>
      </p>
    </div>
  );
}
