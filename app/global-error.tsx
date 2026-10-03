"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-stone-100 text-stone-900 p-4 font-sans">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-700 mx-auto flex items-center justify-center border border-red-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              Application encountered a system error
            </h1>
            <p className="text-sm text-stone-600">
              A critical error prevented this page from loading. No personal audio or data was retained.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
