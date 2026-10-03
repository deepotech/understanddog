"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log privately without exposing secrets or stack traces to UI
    if (process.env.NODE_ENV !== "production") {
      console.error("[Application Error Boundary]", error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 mx-auto flex items-center justify-center border border-amber-200">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Something went unexpectedly wrong
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            An unexpected error occurred while processing this page. Your dog data has not been affected.
          </p>
          {error.digest && (
            <p className="text-xs text-stone-400 font-mono">
              Reference Code: {error.digest.slice(0, 12)}
            </p>
          )}
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
