import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShieldAlert, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Educational Disclaimer & Usage Terms",
  description:
    "Terms of service for UnderstandDog. Outlines educational usage limitations, veterinary non-diagnostic disclaimers, and user responsibilities.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="py-8 sm:py-12 bg-stone-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <header className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Usage Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-stone-500">
            Last updated: September 2026
          </p>
        </header>

        {/* Highlighted Warning Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-amber-950 text-xs sm:text-sm leading-relaxed">
          <ShieldAlert className="w-6 h-6 text-amber-800 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">
              Important Non-Veterinary Disclaimer
            </p>
            <p>
              UnderstandDog is an informational and educational tool designed to foster understanding of canine ethology and bioacoustics. It is NOT a substitute for professional veterinary care, veterinary diagnosis, or certified animal behavior counseling. Never disregard or delay seeking professional medical advice for your dog because of an output from this platform.
            </p>
          </div>
        </div>

        {/* Terms Articles */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 text-stone-700 text-sm leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using UnderstandDog (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must discontinue use of the platform.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              2. Nature of the Service
            </h2>
            <p>
              The Service provides probabilistic behavioral interpretations based on acoustic parameters (pitch, rhythm, duration) and user-supplied situational contexts. Canine vocalizations cannot be literally translated into syntactic human language. Results represent potential behavioral correlations, not guaranteed facts.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              3. Acceptable Use
            </h2>
            <p>
              You agree to use the Service solely for lawful purposes involving domestic canine pets in your care or observation. You may not:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-stone-600">
              <li>Upload malicious, corrupted, or non-audio executable files.</li>
              <li>Attempt to reverse-engineer, bypass rate limiters, or flood the API endpoints.</li>
              <li>Use the tool to provoke, torment, or intentionally distress any animal to record vocalizations.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              4. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, UnderstandDog and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to veterinary medical costs, pet behavioral escalation, dog bites, property damage, or distress resulting from the use or inability to use the Service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              5. Modifications to the Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any feature of the platform at any time without prior notice.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
