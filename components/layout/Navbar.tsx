"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Volume2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-none">
              Understand<span className="text-amber-700">Dog</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide uppercase text-stone-500 mt-1">
              Understand Your Dog
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {SITE_CONFIG.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                  isActive
                    ? "text-amber-900 bg-amber-50 font-semibold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/dog-translator"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Analyze Sound</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {SITE_CONFIG.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-base font-medium rounded-lg ${
                    isActive
                      ? "bg-amber-50 text-amber-900 font-semibold"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2">
            <Link
              href="/dog-translator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-700 py-3 text-base font-semibold text-white shadow-sm hover:bg-amber-800"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Start Dog Translator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
