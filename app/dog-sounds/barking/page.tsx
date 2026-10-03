import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOG_SOUNDS_DATA } from "@/lib/data/dog-sounds-data";
import { SoundDetailLayout } from "@/components/sounds/SoundDetailLayout";
import { SITE_CONFIG } from "@/lib/config/site";

const sound = DOG_SOUNDS_DATA.barking;

export const metadata: Metadata = {
  title: "Dog Barking Meanings — Why Dogs Bark & How to Interpret Sounds",
  description: sound.metaDescription,
  alternates: {
    canonical: `${SITE_CONFIG.url}/dog-sounds/barking`,
  },
  openGraph: {
    title: sound.title,
    description: sound.metaDescription,
    url: `${SITE_CONFIG.url}/dog-sounds/barking`,
  },
};

export default function BarkingPage() {
  if (!sound) notFound();
  return <SoundDetailLayout sound={sound} />;
}
