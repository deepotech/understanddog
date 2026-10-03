import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Lock, EyeOff, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Ephemeral Audio Architecture",
  description:
    "Learn about UnderstandDog's privacy-first architecture: zero audio retention, ephemeral in-memory processing, and no accounts required.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-8 sm:py-12 bg-stone-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Zero Audio Retention</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-stone-500">
            Last updated: September 2026
          </p>
        </header>

        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
            <EyeOff className="w-5 h-5 text-amber-700" />
            <h2 className="text-sm font-bold text-stone-900">No User Accounts</h2>
            <p className="text-xs text-stone-600">
              You do not need to register, log in, or provide personal identity data to use UnderstandDog.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
            <Server className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-stone-900">Ephemeral Audio</h2>
            <p className="text-xs text-stone-600">
              Audio is held solely in volatile RAM during validation and analysis, then immediately discarded.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5">
            <Lock className="w-5 h-5 text-amber-700" />
            <h2 className="text-sm font-bold text-stone-900">No Audio Storage</h2>
            <p className="text-xs text-stone-600">
              No files are written to hard drives, cloud S3 buckets, or permanent databases.
            </p>
          </div>
        </div>

        {/* Full Text */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 text-stone-700 text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              1. Information We Process
            </h2>
            <p>
              When you submit a dog audio clip for interpretation, our server receives the temporary binary data, reported duration, and any optional contextual tags you chose to select. This data is handled in volatile memory strictly to calculate acoustic metrics and behavioral probabilities.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              2. Ephemeral Audio Processing Pipeline
            </h2>
            <p>
              Our processing architecture follows a strict disposable pipeline:
            </p>
            <div className="p-3 bg-stone-50 rounded-lg text-xs font-mono text-stone-800">
              Browser Upload &rarr; API Ingestion &rarr; In-Memory Validation &rarr; AI Processing &rarr; Structured Result &rarr; Audio Discarded
            </div>
            <p>
              We do not build voiceprints, acoustic profiles of your household, or retain recordings for resale.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              3. Rate Limiting and Security Logs
            </h2>
            <p>
              To protect our infrastructure against automated abuse and denial-of-service attempts, our servers maintain temporary rolling IP request counts in memory. These counts are wiped periodically and are not correlated with personal identities.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              4. Cookies and Tracking
            </h2>
            <p>
              UnderstandDog does not use third-party behavioral advertising cookies. We do not sell, rent, or monetize your usage data with data brokers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              5. Contact Us
            </h2>
            <p>
              If you have questions regarding this privacy policy or our technical architecture, you can contact us at privacy@understanddog.com.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
