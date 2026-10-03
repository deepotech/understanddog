import Link from "next/link";
import { Volume2, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            404 — Page Not Found
          </p>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            This trail went cold
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            We could not locate the page you were looking for. Perhaps your dog nudged the keyboard, or this route has moved.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/dog-sounds"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Explore Dog Sounds</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
