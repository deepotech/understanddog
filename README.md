# Dog Translator — Understand Your Dog

> **"Understand Your Dog."**
> AI-powered canine understanding platform grounded in bioacoustics and responsible animal behavior science.

---

## 🐾 Product Vision

Dog Translator bridges the gap between canine acoustic signals and human understanding without making exaggerated or misleading claims. The flagship interaction is:

$$\text{Dog Sound} + \text{Optional Context} + \text{Optional Observed Behavior} \xrightarrow{\text{AI Analysis}} \text{Probabilistic Behavioral Interpretation}$$

### Core Ethical Commitments
- **No literal translation claims:** We do not claim dogs speak human syntax or that an algorithm can translate word-for-word.
- **Qualitative confidence only:** Strictly qualitative indicators (`Possible`, `Likely`, `Strong`) — zero artificial precision percentages (e.g. "97.4% happy").
- **Veterinary-first safety:** Prominent advisories recommending a licensed veterinarian whenever potential pain, distress, or sudden behavioral changes are flagged.
- **Ephemeral audio privacy:** Audio is processed solely in volatile server memory and discarded immediately after interpretation. No permanent storage, databases, or speech tracking.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** Strict TypeScript
- **Styling:** Tailwind CSS (custom "premium pet-tech" tokens)
- **Audio Pipeline:** Web Audio API, MediaRecorder API with real-time canvas visualizer, server-side magic bytes validation (`lib/security/audio-validator.ts`)
- **Security:** In-memory sliding window rate limiter (`lib/security/rate-limiter.ts`) with multi-dimensional tracking and Redis adapter readiness.
- **AI Abstraction:** Provider pattern (`lib/ai/provider.ts`) isolating development mock simulation from future production multimodal providers (`GeminiDogAiProvider`).

---

## 🗺️ Route Architecture (Phase 1)

| Route | Purpose |
| :--- | :--- |
| `/` | **Homepage:** Hero, flagship tool preview, how it works, vocal library grid, context guide, safety manifesto, and FAQ. |
| `/dog-translator` | **Flagship Tool:** One-tap audio recording, drag-and-drop file upload, optional situational context selector, qualitative result card, and SEO guide. |
| `/dog-bark-analyzer` | **Bark Taxonomy:** Deep dive into bark pitch, cadence, and alert/alarm/play/demand classification. |
| `/dog-sounds` | **Vocalization Hub:** Canine bioacoustics overview and index of primary vocal categories. |
| `/dog-sounds/barking` | Guide to alarm, play, demand, and boredom barking. |
| `/dog-sounds/whining` | Guide to excitement, separation anxiety, and physical discomfort whines. |
| `/dog-sounds/growling` | Guide to play growls vs. distance-increasing warning signals & safety protocols. |
| `/dog-sounds/howling` | Guide to siren resonance, pack chorus, and isolation howling. |
| `/dog-sounds/whimpering` | Guide to appeasement, puppy petitioning, sleep twitches, and pain detection. |
| `/how-it-works` | Scientific methodology, acoustic triad, and ethical limits of canine AI. |
| `/about` | Founding story, research pillars, and future roadmap. |
| `/privacy` | Ephemeral audio privacy policy (zero retention, anonymous usage). |
| `/terms` | Terms of service and non-veterinary educational disclaimer. |

---

## 🧪 Verification & Automated Testing

Run the full verification suite:

```bash
# 1. Strict TypeScript check
npx tsc --noEmit

# 2. ESLint
npm run lint

# 3. Next.js production build
npm run build

# 4. Route integrity and export tests
node tests/test_routes.mjs

# 5. SEO, sitemap, robots, and schema tests
node tests/test_seo.mjs

# 6. Audio security, magic bytes, and rate limiter tests
node tests/test_security.mjs

# 7. AI provider contract and production guard tests
node tests/test_ai_mock.mjs
```
