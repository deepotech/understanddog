import React from "react";
import Link from "next/link";
import { Volume2, ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      {/* Top Disclaimer Band */}
      <div className="border-b border-stone-800 bg-stone-950/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm text-stone-400">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-stone-200 font-semibold">
              Veterinary & Behavioral Notice:
            </strong>{" "}
            Dog Translator provides probabilistic behavioral interpretations, not literal translations or veterinary medical diagnoses. If your dog exhibits signs of pain, distress, or sudden behavioral changes, always consult a licensed veterinarian.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Understand<span className="text-amber-500">Dog</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Understand Your Dog. AI-powered canine bioacoustics and contextual behavioral science to strengthen the bond between dogs and their human guardians.
            </p>
            <div className="text-xs text-stone-500">
              Ephemeral audio processing &bull; No accounts required &bull; Science-first approach
            </div>
          </div>

          {/* Sound Library Hub */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              Canine Sound Guides
            </h3>
            <ul className="space-y-2 text-sm">
              {SITE_CONFIG.footerSounds.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Architecture */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              Canine Tools
            </h3>
            <ul className="space-y-2 text-sm">
              {SITE_CONFIG.footerTools.map((item) => (
                <li key={item.label}>
                  {item.href !== "#" ? (
                    <Link
                      href={item.href}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-stone-500 text-xs cursor-default">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3">
              About & Trust
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Our Science
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>&copy; {currentYear} UnderstandDog. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-300">
              Terms
            </Link>
            <Link href="/how-it-works" className="hover:text-stone-300">
              Methodology
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
