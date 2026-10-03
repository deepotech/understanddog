import React from "react";
import { Volume2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 animate-pulse">
          <Volume2 className="w-8 h-8" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-amber-600/30 animate-ping pointer-events-none" />
      </div>
      <p className="text-sm font-medium text-stone-600">Loading Dog Translator...</p>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
