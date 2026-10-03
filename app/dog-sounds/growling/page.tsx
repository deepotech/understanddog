import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { SoundDetailLayout } from "@/components/sounds/SoundDetailLayout";
import { SITE_CONFIG } from "@/lib/config/site";

const sound = DOG_SOUNDS_DATA.growling;

export const metadata: Metadata = {
  title: "Dog Growling Meaning — Play Growls vs. Warning Signals & Safety",
  description: sound.metaDescription,
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-sounds/growling`,
  },
  openGraph: {
    title: sound.title,
    description: sound.metaDescription,
    url: `${SITE_CONFIG.url}/dog-sounds/growling`,
  },
};

export default function GrowlingPage() {
  if (!sound) notFound();
  return <SoundDetailLayout sound={sound} />;
}
