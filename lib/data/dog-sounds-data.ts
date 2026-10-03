export interface SoundGuide {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  heroBadge: string;
  acousticProfile: {
    pitch: string;
    tempo: string;
    frequencyRange: string;
    urgencyLevel: string;
  };
  overview: string[];
  commonContexts: Array<{
    scenario: string;
    description: string;
    associatedBodyLanguage: string;
  }>;
  whyContextMatters: string[];
  behavioralCaveats: string[];
  whenToConsultVet: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const DOG_SOUNDS_DATA: Record<string, SoundGuide> = {
  barking: {
    slug: "barking",
    title: "Understanding Dog Barking: Types, Triggers & Behavioral Meaning",
    shortDescription:
      "From sharp alert barks to rhythmic play bow barks, discover what different canine barking patterns communicate.",
    metaDescription:
      "Comprehensive guide to dog barking sounds. Learn how pitch, repetition rate, and body language reveal alert, play, demand, and territorial barking.",
    heroBadge: "Canine Vocalization Guide",
    acousticProfile: {
      pitch: "Variable (Low alert to high play)",
      tempo: "Fast / Rapid bursts or intermittent singles",
      frequencyRange: "160 Hz - 2,000 Hz",
      urgencyLevel: "Low to High depending on context",
    },
    overview: [
      "Barking is the most versatile and ubiquitous canine vocalization. While wolves rarely bark in adulthood, domestic dogs evolved frequent barking alongside humans as a flexible communicative tool.",
      "A bark's emotional valence cannot be judged in isolation. Bioacoustic research shows that pitch (fundamental frequency) indicates intent and perceived size, while repetition rate reflects the dog's internal arousal and urgency.",
    ],
    commonContexts: [
      {
        scenario: "Alert & Alarm Barking",
        description:
          "Sharp, staccato barks with 2 to 4 bursts, followed by brief pauses where the dog stands motionless listening.",
        associatedBodyLanguage:
          "Ears forward, weight centered or slightly forward, tail rigid or slow twitching, gaze locked on trigger.",
      },
      {
        scenario: "Play & Invitation Barking",
        description:
          "Higher-pitched, melodic barks occurring in casual rhythm, often accompanied by bouncy movements.",
        associatedBodyLanguage:
          "Play bow (front elbows down, hips up), loose wagging tail, open relaxed mouth, bouncy retreats.",
      },
      {
        scenario: "Demand & Frustration Barking",
        description:
          "Persistent, sharp single barks directed squarely at a human or an unreachable object.",
        associatedBodyLanguage:
          "Pawing at hands or doors, direct eye contact, pacing between human and desired resource.",
      },
      {
        scenario: "Boredom / Repetitive Barking",
        description:
          "Monotonous, flat cadence barks repeated over prolonged periods without immediate external stimulation.",
        associatedBodyLanguage:
          "Pacing along perimeter fences, lack of focused eye contact, lethargic or restless posture.",
      },
    ],
    whyContextMatters: [
      "A single low-pitched bark at a window signals territorial boundary awareness, whereas that same pitch during a play session can be an invitation to chase.",
      "High repetition rate signals urgent arousal regardless of pitch; a dog barking 8 times per second is in a much higher state of emotional activation than one barking once every 4 seconds.",
      "Environmental triggers such as sirens, unfamiliar visitors, or confinement radically alter the biological meaning.",
    ],
    behavioralCaveats: [
      "Never punish barking without identifying the trigger. Suppressing the vocalization without addressing the underlying emotion (fear, anxiety, boredom) can lead to silent escalation or reactive biting.",
      "Avoid yelling 'Quiet!'—dogs typically interpret loud vocal human responses as social joining in the alarm.",
    ],
    whenToConsultVet: [
      "Sudden onset of barking in an older dog who previously was quiet (may indicate Canine Cognitive Dysfunction or sensory decline).",
      "Barking accompanied by disorientation, excessive panting, pacing, or inability to settle.",
      "Vocalization paired with reluctance to move, sit, or bear weight on limbs.",
    ],
    faqs: [
      {
        question: "Can AI tell me exactly what my dog's bark means?",
        answer:
          "No tool can provide a literal word-for-word translation. Responsible AI provides probabilistic behavioral interpretations by correlating acoustic parameters (pitch, harmonic structure, repetition) with observed situational context.",
      },
      {
        question: "Why does my dog bark at night for no apparent reason?",
        answer:
          "Dogs possess hearing up to 45,000 Hz (far beyond human 20,000 Hz) and superior night olfaction. They often react to distant nocturnal wildlife, HVAC harmonics, or ambient neighborhood sounds undetectable by humans.",
      },
      {
        question: "Is demand barking the same as aggressive barking?",
        answer:
          "No. Demand barking is an operant behavior learned when vocalizing successfully yields attention, food, or access. Aggressive or distance-increasing barks typically feature lower pitch, tense body language, and hard stares.",
      },
    ],
  },
  whining: {
    slug: "whining",
    title: "Understanding Dog Whining: Anxiety, Excitement & Physical Cues",
    shortDescription:
      "Decode your dog's high-pitched whines, from eager anticipation to isolation distress or hidden discomfort.",
    metaDescription:
      "Explore the scientific reasons dogs whine. Differentiate between excitement, attention-seeking, separation anxiety, and physical discomfort.",
    heroBadge: "Canine Vocalization Guide",
    acousticProfile: {
      pitch: "High to Very High",
      tempo: "Sustained tonal sweeps or repetitive pulses",
      frequencyRange: "1,500 Hz - 4,500 Hz",
      urgencyLevel: "Moderate to Urgent",
    },
    overview: [
      "Whining is a neonatal distress vocalization that persists into domestic adulthood. In wild canids, whining is primary among puppies calling their mother for warmth or nursing.",
      "Adult domestic dogs retain this juvenile communicative repertoire to petition humans for proximity, relief, reassurance, or resources.",
    ],
    commonContexts: [
      {
        scenario: "Excitement & Anticipation",
        description:
          "Rapid, high-pitched whines accompanied by frantic tail wags, prancing, and leaping toward a leash or doorway.",
        associatedBodyLanguage:
          "Loose wiggling body, soft squinty eyes, eager orientation toward walking gear or greeting person.",
      },
      {
        scenario: "Separation & Confinement Anxiety",
        description:
          "Continuous, rhythmic ascending tonal whines when an owner leaves or behind closed barriers.",
        associatedBodyLanguage:
          "Pacing, lip licking, drooling, scratch marks at door thresholds, lowered tail posture.",
      },
      {
        scenario: "Physical Discomfort or Pain",
        description:
          "Subtle, intermittent whines occurring without obvious environmental triggers or when shifting positions.",
        associatedBodyLanguage:
          "Tense abdomen, reluctance to lie down, arched back, trembling, avoiding touch around joints.",
      },
    ],
    whyContextMatters: [
      "A whine at the front door 5 minutes before scheduled walk time is learned petitioning, whereas an identical whine while getting off a dog bed points to orthopedic discomfort.",
      "Persistent whining paired with panting in a quiet, temperature-controlled room is a classic red flag for internal distress.",
    ],
    behavioralCaveats: [
      "Do not reprimand a whining dog; anxiety-driven vocalizations worsen when met with owner frustration.",
      "Be conscious of accidental reinforcement: immediately petting or speaking to an attention-whining dog reinforces the habit.",
    ],
    whenToConsultVet: [
      "Unexplained whining that begins suddenly in a healthy dog.",
      "Whining when urinating, defecating, or attempting to lie down.",
      "Whining accompanied by lethargy, loss of appetite, vomiting, or limping.",
    ],
    faqs: [
      {
        question: "Why does my dog whine when carrying a toy?",
        answer:
          "Dogs frequently whine with high-value items due to an excitement-frustration conflict: they are thrilled to possess the treasure, but anxious about finding a safe spot to hide or bury it.",
      },
      {
        question: "How do I know if whining is pain versus begging?",
        answer:
          "Begging whining ceases once the resource is provided or removed from sight, and is accompanied by energetic, expectant body language. Pain whining persists across quiet periods and is accompanied by physical tension, altered gait, or withdrawal.",
      },
    ],
  },
  growling: {
    slug: "growling",
    title: "Understanding Dog Growling: Warning Signals, Play & Safety Protocols",
    shortDescription:
      "Why growling is a vital canine communication signal that should never be punished, and how to read its intent.",
    metaDescription:
      "The definitive behavioral guide to dog growling. Learn to distinguish playful play-growls from distance-increasing warning signals and how to respond safely.",
    heroBadge: "Safety & Behavioral Guide",
    acousticProfile: {
      pitch: "Low to Deep Guttural (Play growls may be higher and broken)",
      tempo: "Sustained resonance or rhythmic rumbling",
      frequencyRange: "80 Hz - 600 Hz",
      urgencyLevel: "Warning / Distance-Increasing",
    },
    overview: [
      "Growling is one of the most misunderstood canine vocalizations. In popular perception it is seen as pure aggression; in canine ethology, it is an invaluable warning mechanism that prevents physical conflict.",
      "A growl communicates: 'I am uncomfortable with this proximity or pressure. Please stop or step back.'",
    ],
    commonContexts: [
      {
        scenario: "Play Growling (Tug & Wrestling)",
        description:
          "Exaggerated, throaty rumblings during interactive tug-of-war or rough-and-tumble play.",
        associatedBodyLanguage:
          "Play bows, loose sideways head shaking, pausing to sneezes, soft body contours, immediate resumption when invited.",
      },
      {
        scenario: "Resource Guarding & Space Defense",
        description:
          "Low, continuous guttural growl when a human or animal approaches food, bones, resting spot, or favorite human.",
        associatedBodyLanguage:
          "Freezing stiff, hovering over object, whale eye (white of eye visible), lip curled or closed tight mouth.",
      },
      {
        scenario: "Fear & Handling Discomfort",
        description:
          "Soft, deep warning rumble when touched on paws, ears, or when cornered in an unfamiliar scenario.",
        associatedBodyLanguage:
          "Tucked tail, ears pinned back, leaning away, lip licking, yawning before the growl.",
      },
    ],
    whyContextMatters: [
      "Play growls occur in fluid, bouncy contexts with voluntary pauses. Warning growls occur in static, frozen contexts where the dog wants distance.",
      "Never judge the sound alone: a fierce-sounding tug growl accompanied by loose hips is joyful social engagement, whereas a silent freeze before a faint growl requires immediate space.",
    ],
    behavioralCaveats: [
      "NEVER punish a growl. A growl is a dog's smoke alarm. If you punish the growl, the dog learns that warning doesn't work—and next time they may escalate straight to snapping without vocal warning.",
      "When a dog growls: freeze, stop whatever you were doing, avoid eye contact, and calmly create space.",
    ],
    whenToConsultVet: [
      "Sudden growling when touched in specific body zones (spine, hips, ears, mouth) often indicates acute pain or arthritis.",
      "Escalating guarding behavior in home environments requires collaborative evaluation by a veterinarian and a fear-free certified behavior consultant (IAABC).",
    ],
    faqs: [
      {
        question: "Should I be worried if my dog growls while playing tug?",
        answer:
          "Usually no, as long as body language remains loose, wiggly, and the dog easily takes breaks. Play growls are often loud and theatrical, reflecting canine pretend-battle.",
      },
      {
        question: "What is the single most important rule when a dog growls at me?",
        answer:
          "Respect the request for space immediately. Do not scold, stare down, or force physical compliance. Slowly disengage and consult a professional behaviorist.",
      },
    ],
  },
  howling: {
    slug: "howling",
    title: "Understanding Dog Howling: Long-Distance Calling, Triggers & Meaning",
    shortDescription:
      "Explore the ancient evolutionary roots of howling, acoustic trigger synchronization, and isolation distress.",
    metaDescription:
      "Why do dogs howl? Discover the evolutionary reasons behind canine howling, siren mimicry, group bonding, and separation anxiety cues.",
    heroBadge: "Canine Vocalization Guide",
    acousticProfile: {
      pitch: "High, pure tonal resonance with shifting harmonics",
      tempo: "Long, sustained notes lasting 3 to 12 seconds",
      frequencyRange: "200 Hz - 1,800 Hz",
      urgencyLevel: "Moderate (Social / Environmental)",
    },
    overview: [
      "Howling is the oldest evolutionary canine vocalization, inherited directly from ancestral pack-living canids. It is designed to travel miles across open terrain.",
      "While domestic dogs bark far more than wolves, howling remains deeply wired into the neural circuitry of domestic dogs, triggered by acoustic harmonics and social bonding.",
    ],
    commonContexts: [
      {
        scenario: "Acoustic Resonance / Siren Synchronization",
        description:
          "Head raised toward ceiling, sustained operatic howl triggered by ambulances, fire engines, or musical instruments.",
        associatedBodyLanguage:
          "Alert posture, neck outstretched, chin angled upward, calm or curious demeanor once sound ceases.",
      },
      {
        scenario: "Separation Anxiety & Isolation Calling",
        description:
          "Plaintive, repetitive howl cycles occurring when family members leave home.",
        associatedBodyLanguage:
          "Pacing, watching windows/doors, drooling, restlessness, depressed posture.",
      },
      {
        scenario: "Group Pack Chorus",
        description:
          "Multiple dogs joining together into a cascading chorus upon hearing one dog initiate.",
        associatedBodyLanguage:
          "Social orientation toward group, tail wagging, communal reinforcement.",
      },
    ],
    whyContextMatters: [
      "Siren-triggered howling is acoustic contagion—it does not necessarily mean the dog is in pain or sad.",
      "Howling during owner absence, however, is a classic marker of attachment-related anxiety requiring structured behavioral intervention.",
    ],
    behavioralCaveats: [
      "High-pitched sirens can cause temporary acoustic discomfort for canine ears with acute hearing, though many dogs simply howl in resonance.",
      "Avoid encouraging nuisance howling in apartment settings without addressing root separation anxiety.",
    ],
    whenToConsultVet: [
      "Persistent howling accompanied by destructive chewing at exits or self-injury during owner absence.",
      "Sudden howling episodes accompanied by disorientation or circling in geriatric pets.",
    ],
    faqs: [
      {
        question: "Do sirens hurt my dog's ears when they howl?",
        answer:
          "Not necessarily. While dogs have sensitive hearing, siren frequencies often simply mimic the fundamental frequency of a distant howl, triggering an ancient, involuntary pack-resonance response.",
      },
      {
        question: "Which dog breeds howl the most?",
        answer:
          "Northern and primitive breeds (Siberian Huskies, Alaskan Malamutes) and scent hounds (Beagles, Basset Hounds, Bloodhounds) have the strongest genetic predisposition to howl.",
      },
    ],
  },
  whimpering: {
    slug: "whimpering",
    title: "Understanding Dog Whimpering: Submissive Cues, Comfort & Pain Detection",
    shortDescription:
      "Soft, broken whimpers can signal appeasement, puppy helplessness, dream states, or clinical discomfort.",
    metaDescription:
      "Learn how to interpret soft dog whimpering sounds. Differentiate between submissive appeasement, sleep twitches, and physical pain indicators.",
    heroBadge: "Canine Vocalization Guide",
    acousticProfile: {
      pitch: "High to Softly Muted",
      tempo: "Intermittent, broken, or low-amplitude pulses",
      frequencyRange: "1,200 Hz - 3,800 Hz",
      urgencyLevel: "Low Alert to High Medical Relevance",
    },
    overview: [
      "Whimpering is a quieter, less sustained relative of the whine. It carries an intimate, close-range acoustic radius intended only for immediate companions.",
      "Because of its low amplitude, whimpering is often an honest readout of internal physical sensation or deep appeasement.",
    ],
    commonContexts: [
      {
        scenario: "Appeasement & Social Deference",
        description:
          "Soft, brief whimpers offered during greeting or when approaching an assertive human or dog.",
        associatedBodyLanguage:
          "Lowered head, curved spine, gaze averted, lip licking, gentle low wag.",
      },
      {
        scenario: "REM Sleep & Dreaming",
        description:
          "Muffled 'chuffs' and whimpers during deep sleep accompanied by running paw twitches.",
        associatedBodyLanguage:
          "Eyes flickering behind lids, body relaxed on side, rhythmic soft twitches.",
      },
      {
        scenario: "Acute or Sub-Acute Pain",
        description:
          "Involuntary soft whimpers when shifting positions, climbing stairs, or being lifted.",
        associatedBodyLanguage:
          "Guarding body part, stiff gait, turning head toward painful area, hesitant mobility.",
      },
    ],
    whyContextMatters: [
      "A whimpering dog dreaming softly in their bed is processing daytime memories; the same dog whimpering while attempting to sit up needs a veterinary joint evaluation.",
      "Appeasement whimpering should never be corrected—it is a peace-seeking gesture showing respect and vulnerability.",
    ],
    behavioralCaveats: [
      "Never startle a dog awake who is whimpering in a nightmare; gentle soft voice from a distance is safest.",
      "Check senior dogs for subtle orthopedic conditions if whimpering increases during cold or damp weather.",
    ],
    whenToConsultVet: [
      "Any whimpering elicited by gentle palpation along the back, neck, or abdomen.",
      "Whimpering upon standing after rest or refusing to navigate ordinary stairs.",
    ],
    faqs: [
      {
        question: "Why does my dog whimper in their sleep?",
        answer:
          "During the REM (Rapid Eye Movement) stage of sleep, canine brainwave patterns closely mirror human dream states. Muscles twitch and the vocal cords produce soft whimpers as the dog relives play or exploration.",
      },
      {
        question: "Is whimpering always a sign of pain?",
        answer:
          "No. Whimpering is also an appeasement signal, an expression of tender affection, or an involuntary dream vocalization. However, if accompanied by changes in gait, appetite, or posture, pain must be ruled out by a veterinarian.",
      },
    ],
  },
};
