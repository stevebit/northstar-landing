/** Locked visitor-guide copy for Nova. Do not invent prices or clinical advice. */

export const NOVA_FALLBACK =
  "I can help with booking, plans, what to expect, and emergencies — tap a topic below.";

export const NOVA_WELCOME =
  "Hey — I'm Nova, your site guide robot. I can walk you through booking, plans, what's included, and what to do in an emergency. Tap a topic below. No health details needed.";

export const NOVA_CLINICAL_REFUSAL =
  "I'm just a site guide — I can't diagnose, prescribe, triage you as a clinician, or read labs or photos. If it feels severe or life-threatening, call 911 or go to the nearest emergency department. For everyday primary care when you're stable enough to join from home, book a visit and a licensed provider can help.";

export type NovaTopicId =
  "book" | "cost" | "included" | "ohip" | "emergency" | "after";

export type NovaTopic = {
  id: NovaTopicId;
  question: string;
  chip: string;
  answer: string;
  showSignup: boolean;
  phrases: string[];
};

export const NOVA_TOPICS: readonly NovaTopic[] = [
  {
    id: "book",
    question: "How do I book?",
    chip: "How do I book?",
    answer:
      "Head to northstarmed.ca, create your account, pick a time, and finish the short intake. At visit time, join the video from your patient portal on your phone, tablet, or computer. No special app needed.",
    showSignup: true,
    phrases: [
      "how do i book",
      "book a visit",
      "book a time",
      "booking",
      "appointment",
      "schedule",
      "sign up",
      "signup",
      "create an account",
      "create your account",
      "get started",
      "join now",
      "how do i join",
      "how to join",
      "register",
      "onboarding",
      "intake",
      "patient portal",
      "no app",
      "video visit",
    ],
  },
  {
    id: "cost",
    question: "What does a visit cost?",
    chip: "What does a visit cost?",
    answer:
      "A One Time Visit is $39.95. If you want ongoing care, Northstar primary care is $59.95 a month, or Northstar family primary care is $79.95 a month for two adults and up to four kids under 18. Annual billing saves 20%, and you can cancel anytime.",
    showSignup: true,
    phrases: [
      "what does a visit cost",
      "how much",
      "cost",
      "price",
      "pricing",
      "fee",
      "pay",
      "payment",
      "39.95",
      "59.95",
      "79.95",
      "one time visit",
      "one-time visit",
      "primary care plan",
      "family primary care",
      "family plan",
      "monthly",
      "subscription",
      "membership",
      "annual billing",
      "cancel anytime",
      "plans",
    ],
  },
  {
    id: "included",
    question: "What's included in primary care?",
    chip: "What's included?",
    answer:
      "You get a dedicated provider who knows you, a Welcome Visit to start, care as often as you need, and continuity through an Annual Visit. Prescriptions, labs, referrals, and sick notes when they're clinically appropriate — all through your secure portal afterward.",
    showSignup: true,
    phrases: [
      "what's included",
      "whats included",
      "what is included",
      "included in primary care",
      "primary care",
      "welcome visit",
      "annual visit",
      "dedicated provider",
      "continuity",
      "sick notes",
      "referrals",
      "what's in the plan",
      "whats in the plan",
      "what do i get",
      "what does it include",
    ],
  },
  {
    id: "ohip",
    question: "Is this covered by OHIP?",
    chip: "Covered by OHIP?",
    answer:
      "Northstar isn't a Ministry-rostered primary-care practice, and this isn't payment for medically necessary insured care. Many people use workplace benefits for private virtual care — check your plan if you're unsure.",
    showSignup: false,
    phrases: [
      "ohip",
      "covered by ohip",
      "ministry",
      "rostered",
      "insured care",
      "medically necessary",
      "workplace benefits",
      "extended benefits",
      "insurance",
      "covered",
      "does ohip pay",
    ],
  },
  {
    id: "emergency",
    question: "I feel really sick — is this an emergency?",
    chip: "Is this an emergency?",
    answer:
      "If it's severe or life-threatening, call 911 or go to the nearest emergency department. Virtual visits are for everyday primary care when you're stable enough to join from home.",
    showSignup: false,
    phrases: [
      "emergency",
      "really sick",
      "life-threatening",
      "life threatening",
      "call 911",
      "911",
      "go to er",
      "emergency department",
      "urgent",
      "severe",
      "stable enough",
    ],
  },
  {
    id: "after",
    question: "What happens after?",
    chip: "What happens after?",
    answer:
      "Your summary, prescriptions, lab requisitions, and any documents show up in your portal. Need another visit? Book again without starting from scratch.",
    showSignup: true,
    phrases: [
      "what happens after",
      "after the visit",
      "afterward",
      "afterwards",
      "then what",
      "visit summary",
      "lab requisition",
      "requisitions",
      "documents",
      "portal after",
      "book again",
      "follow up",
      "follow-up",
    ],
  },
] as const;

const GREETING_PHRASES = [
  "hi",
  "hello",
  "hey",
  "hey nova",
  "hi nova",
  "hello nova",
  "thanks",
  "thank you",
  "good morning",
  "good afternoon",
  "good evening",
];

const CLINICAL_PHRASES = [
  "diagnose",
  "diagnosis",
  "what is wrong",
  "what's wrong",
  "whats wrong",
  "do i have",
  "is this cancer",
  "is this infected",
  "prescribe",
  "prescription for me",
  "what should i take",
  "which medication",
  "what medication",
  "what antibiotic",
  "dosage",
  "dose of",
  "interpret my",
  "read my lab",
  "lab result",
  "lab results",
  "blood work result",
  "look at this photo",
  "look at my photo",
  "look at this picture",
  "look at this image",
  "look at this rash",
  "is this rash",
  "triage me",
  "triage my",
  "should i go to the hospital",
  "is it safe for me",
];

const EMERGENCY_SAFETY_PHRASES = [
  "911",
  "emergency",
  "er",
  "emergency room",
  "emergency department",
  "life-threatening",
  "life threatening",
  "chest pain",
  "can't breathe",
  "cannot breathe",
  "cant breathe",
  "difficulty breathing",
  "stroke",
  "unconscious",
  "overdose",
  "suicidal",
  "suicide",
  "dying",
  "passed out",
  "severe bleeding",
  "really sick",
];

export type NovaMatchKind = "topic" | "fallback" | "refusal" | "welcome";

export type NovaMatch = {
  kind: NovaMatchKind;
  topic?: NovaTopic;
  text: string;
  showSignup: boolean;
};

function fold(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^a-z0-9$+.'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasPhrase(haystack: string, phrase: string): boolean {
  const needle = fold(phrase);
  if (!needle) return false;
  if (needle.includes(" ")) return haystack.includes(needle);
  if (needle.length <= 2) {
    return new RegExp(`(?:^|\\s)${escapeReg(needle)}(?:\\s|$)`).test(haystack);
  }
  return (
    haystack.includes(needle) &&
    new RegExp(`(?:^|\\s)${escapeReg(needle)}(?:\\s|$)`).test(haystack)
  );
}

function escapeReg(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countHits(haystack: string, phrases: readonly string[]): number {
  let n = 0;
  for (const phrase of phrases) {
    if (hasPhrase(haystack, phrase)) n += phrase.includes(" ") ? 2 : 1;
  }
  return n;
}

export function matchNovaIntent(raw: string): NovaMatch {
  const text = fold(raw);
  if (!text) {
    return { kind: "fallback", text: NOVA_FALLBACK, showSignup: false };
  }

  if (GREETING_PHRASES.some((p) => text === p || text === `${p}!`)) {
    return { kind: "welcome", text: NOVA_WELCOME, showSignup: false };
  }

  const emergencyHits = countHits(text, EMERGENCY_SAFETY_PHRASES);
  if (emergencyHits > 0) {
    const topic = topicById("emergency");
    return {
      kind: "topic",
      topic,
      text: topic.answer,
      showSignup: topic.showSignup,
    };
  }

  if (CLINICAL_PHRASES.some((p) => hasPhrase(text, p))) {
    return {
      kind: "refusal",
      text: NOVA_CLINICAL_REFUSAL,
      showSignup: true,
    };
  }

  let best: { topic: NovaTopic; score: number } | null = null;
  for (const topic of NOVA_TOPICS) {
    const score = countHits(text, topic.phrases);
    if (score > 0 && (!best || score > best.score)) {
      best = { topic, score };
    }
  }

  if (best) {
    return {
      kind: "topic",
      topic: best.topic,
      text: best.topic.answer,
      showSignup: best.topic.showSignup,
    };
  }

  if (GREETING_PHRASES.some((p) => text.startsWith(p))) {
    return { kind: "welcome", text: NOVA_WELCOME, showSignup: false };
  }

  return { kind: "fallback", text: NOVA_FALLBACK, showSignup: false };
}

export function topicById(id: NovaTopicId): NovaTopic {
  const topic = NOVA_TOPICS.find((t) => t.id === id);
  if (!topic) throw new Error(`Unknown Nova topic: ${id}`);
  return topic;
}

export const NOVA_STAGE_OPEN_EVENT = "northstar:nova-stage-open";
/** @deprecated Use NOVA_STAGE_OPEN_EVENT — kept so older listeners still open the avatar. */
export const NOVA_CHAT_OPEN_EVENT = NOVA_STAGE_OPEN_EVENT;

export function openNovaStage() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NOVA_STAGE_OPEN_EVENT));
}

export function openNovaChat() {
  openNovaStage();
}
