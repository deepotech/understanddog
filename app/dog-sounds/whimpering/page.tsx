import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { SoundDetailLayout } from "@/components/sounds/SoundDetailLayout";
import { SITE_CONFIG } from "@/lib/config/site";

const sound = DOG_SOUNDS_DATA.whimpering;

export const metadata: Metadata = {
  title: "Dog Whimpering Sounds — Appeasement, Sleep Twitches & Pain Signs",
  description: sound.metaDescription,
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-sounds/whimpering`,
  },
  openGraph: {
    title: sound.title,
    description: sound.metaDescription,
    url: `${SITE_CONFIG.url}/dog-sounds/whimpering`,
  },
};

export default function WhimperingPage() {
  if (!sound) notFound();
  return <SoundDetailLayout sound={sound} />;
}
