import React from "react";
import Link from "next/link";
import { ArrowRight, Volume2 } from "lucide-react";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";

export function SoundLibraryGrid() {
  const soundList = Object.values(DOG_SOUNDS_DATA);

  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Canine Vocal Library
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Explore Dog Vocalizations
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every sound category has distinct bioacoustic signatures. Learn what canine ethology reveals about each.
            </p>
          </div>
          <Link
            href="/dog-sounds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 transition-colors self-start md:self-auto"
          >
            <span>View All Sound Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soundList.map((sound) => (
            <Link
              key={sound.slug}
              href={`/dog-sounds/${sound.slug}`}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {sound.acousticProfile.pitch} Pitch
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {sound.slug.charAt(0).toUpperCase() + sound.slug.slice(1)}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {sound.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                <span>Read behavioral guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
