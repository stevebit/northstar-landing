/** Standalone viral marketing content for Northstar Medical. */

export const APP_BASE = "https://app.northstarmed.ca";
export const REGISTER_URL = `${APP_BASE}/onboarding/get-started`;
export const LOGIN_URL = `${APP_BASE}/patient/login`;
export const PROVIDER_LOGIN_URL = `${APP_BASE}/doctor/login`;

export const SHARE = {
  title: "I stopped waiting months for a family doctor.",
  text: "Northstar Medical = unlimited nurse practitioner care for your whole Ontario family. Same-day virtual visits. I'm joining — you should too.",
  url: typeof window !== "undefined" ? window.location.href : "https://northstarmed.ca",
};

export const marqueeItems = [
  "Sore throat",
  "Ear infection",
  "Rash",
  "UTI",
  "Fever",
  "Sick note",
  "Rx renewal",
  "Anxiety check-in",
  "Kids cough",
  "Pink eye",
  "Sinus infection",
  "Migraine",
  "Birth control",
  "Lab requisition",
  "School note",
  "Allergy flare",
];

export const waitScenarios = [
  {
    id: "newborn",
    label: "New parent",
    waitDays: 214,
    pain: "Baby’s first fever hits at 2am. Walk-in is a 5-hour circus.",
  },
  {
    id: "no-fp",
    label: "No family doctor",
    waitDays: 312,
    pain: "You're on a waitlist measured in seasons, not days.",
  },
  {
    id: "busy-job",
    label: "9-to-5 worker",
    waitDays: 46,
    pain: "Clinic only open when you're… also at work.",
  },
  {
    id: "family",
    label: "Whole household",
    waitDays: 89,
    pain: "Four people, four calendars, zero spare hours.",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Tap join",
    body: "Two minutes. No referral. Ontario only.",
  },
  {
    n: "02",
    title: "Pick your crew",
    body: "Just you — or 2 adults + up to 4 kids.",
  },
  {
    n: "03",
    title: "Get seen",
    body: "Video, phone, or secure message. Often same day.",
  },
];

export const services = [
  {
    title: "Same-day sick care",
    body: "When something pops up, book a virtual visit instead of a waiting room.",
    tag: "Acute",
  },
  {
    title: "Ongoing conditions",
    body: "Follow-ups, meds, labs — continuity with a real care team.",
    tag: "Chronic",
  },
  {
    title: "Kids + school notes",
    body: "Fever, earaches, sports physicals energy — covered on Family.",
    tag: "Family",
  },
  {
    title: "Rx + docs fast",
    body: "Prescriptions to your pharmacy. Sick notes after the visit.",
    tag: "Paperwork",
  },
];

export const plans = [
  {
    id: "visit",
    name: "One visit",
    price: 39.95,
    unit: "visit",
    blurb: "Try it once. No subscription guilt.",
    features: ["Same-day slots often open", "NP consult", "Rx when appropriate"],
    cta: "Book a visit",
    highlight: false,
  },
  {
    id: "plus",
    name: "My Northstar+",
    price: 59.95,
    unit: "mo",
    blurb: "Unlimited care for one human.",
    features: [
      "Unlimited virtual visits",
      "Priority booking",
      "Rx renewals + labs",
      "Sick notes",
    ],
    cta: "Go unlimited",
    highlight: false,
  },
  {
    id: "family",
    name: "Northstar Family",
    price: 79.95,
    unit: "mo",
    blurb: "The plan people text their group chat about.",
    features: [
      "2 adults + 4 kids under 18",
      "Unlimited visits each",
      "One bill. One portal.",
      "Max 8 family bookings / mo",
    ],
    cta: "Cover the household",
    highlight: true,
  },
];

export const quotes = [
  {
    name: "Priya · Toronto",
    text: "I screenshot the Family plan and dropped it in our cousins chat. Three households signed up that week.",
  },
  {
    name: "Marcus · Ottawa",
    text: "Walk-in used to eat my whole lunch break. Now I do the visit from my car before a meeting.",
  },
  {
    name: "Aisha · Mississauga",
    text: "Sick notes for school without dragging a feverish kid across the city. That's the product.",
  },
];

export const faqItems = [
  {
    q: "Is this real primary care or a gimmick app?",
    a: "Real licensed Ontario nurse practitioners. Assessment, diagnosis for common issues, prescriptions when appropriate, labs, referrals, documentation — virtual primary care, not a chatbot toy.",
  },
  {
    q: "Do I need a family doctor first?",
    a: "No referral. Perfect if you're waitlisted, between providers, or just can't get in this week.",
  },
  {
    q: "OHIP?",
    a: "Visits aren't OHIP-billed today. Labs/imaging ordered are typically OHIP when done at an OHIP facility. Many people claim visits through extended benefits — check your plan.",
  },
  {
    q: "Who is on the Family plan?",
    a: "2 adults + up to 4 children under 18. Unlimited visits per covered member (fair-use: 1 consult per person per day). Max 8 family bookings/month.",
  },
  {
    q: "Emergencies?",
    a: "Not for emergencies. Call 911 or go to ER. We'll redirect you if virtual care isn't safe for your issue.",
  },
  {
    q: "Privacy?",
    a: "PHIPA-aligned, encrypted records, secure portal. Canadian privacy standards, not vibes.",
  },
];

export const navLinks = [
  { label: "The flip", href: "#flip" },
  { label: "How", href: "#how" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];
