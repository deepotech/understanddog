import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { SoundDetailLayout } from "@/components/sounds/SoundDetailLayout";
import { SITE_CONFIG } from "@/lib/config/site";

const sound = DOG_SOUNDS_DATA.howling;

export const metadata: Metadata = {
  title: "Why Dogs Howl — Evolutionary Roots, Siren Triggers & Vocal Packs",
  description: sound.metaDescription,
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-sounds/howling`,
  },
  openGraph: {
    title: sound.title,
    description: sound.metaDescription,
    url: `${SITE_CONFIG.url}/dog-sounds/howling`,
  },
};

export default function HowlingPage() {
  if (!sound) notFound();
  return <SoundDetailLayout sound={sound} />;
}
