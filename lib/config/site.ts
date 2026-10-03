export const SITE_CONFIG = {
  name: "UnderstandDog",
  tagline: "Understand Your Dog.",
  description:
    "AI-powered dog understanding platform. Explore what your dog's sounds and behavior may mean — with responsible behavioral science.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://understanddog.com",
  author: "UnderstandDog Team",
  links: {
    twitter: "https://twitter.com/understanddog",
    github: "https://github.com",
  },
  navItems: [
    { label: "Dog Translator", href: "/dog-translator", highlight: true },
    { label: "Bark Analyzer", href: "/dog-bark-analyzer" },
    { label: "Dog Sounds", href: "/dog-sounds" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ],
  footerSounds: [
    { label: "Dog Barking Meanings", href: "/dog-sounds/barking" },
    { label: "Dog Whining Cues", href: "/dog-sounds/whining" },
    { label: "Dog Growling Protocol", href: "/dog-sounds/growling" },
    { label: "Dog Howling Reasons", href: "/dog-sounds/howling" },
    { label: "Dog Whimpering Analysis", href: "/dog-sounds/whimpering" },
  ],
  footerTools: [
    { label: "AI Dog Translator", href: "/dog-translator" },
    { label: "Dog Bark Analyzer", href: "/dog-bark-analyzer" },
    { label: "Sound Library Hub", href: "/dog-sounds" },
    { label: "Dog Breed Identifier (Coming Soon)", href: "#" },
    { label: "Body Language Guide (Coming Soon)", href: "#" },
  ],
  footerLegal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  limits: {
    maxAudioMb: 10,
    maxAudioSeconds: 30,
    minAudioSeconds: 0.5,
  },
};

export type SiteConfig = typeof SITE_CONFIG;
