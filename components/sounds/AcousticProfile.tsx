import React from "react";
import { Activity, Radio, Gauge, AlertCircle } from "lucide-react";
import { SoundGuide } from "@/lib/data/dog-sounds-data";

interface AcousticProfileProps {
  profile: SoundGuide["acousticProfile"];
}

export function AcousticProfileCard({ profile }: AcousticProfileProps) {
  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">
            Acoustic & Bioacoustic Profile
          </h3>
        </div>
        <span className="text-xs text-stone-400 font-mono">CANINE ETHOLOGY</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>Pitch Level</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white">
            {profile.pitch}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Cadence / Tempo</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white">
            {profile.tempo}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Frequency Range</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white">
            {profile.frequencyRange}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Urgency Level</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white">
            {profile.urgencyLevel}
          </p>
        </div>
      </div>
    </div>
  );
}
