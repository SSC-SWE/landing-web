// All draft copy for the page. Edit words here; layout lives in components/.

/** Replace with the real portal URL when ready. */
export const portalUrl = "#";

export const site = {
  wordmark: "AI.SSC",
  domain: "ai.ssc.edu.hk",
  nav: [
    { label: "Request an API key", href: "#apply" },
    { label: "Portal", href: portalUrl, tag: "Open" },
  ],
};

export const hero = {
  badge: "One portal for four school tools",
  headline: "Intelligence, on campus",
  scrollCue: "Scroll to dig",
  lead: "**One open portal for Chimes, Transcriber, Skills library & API usage** — available to everyone at SSC",
  cta: { label: "Open the portal", href: portalUrl },
};

export const principles = {
  title: ["Why this", "_portal_"],
  body: "A single place for the school's tools, and for AI access that SSC can hand to a team.",
  cta: { label: "See the tools", href: "#tools" },
  items: [
    {
      title: "One place",
      body: "School tools open from the same portal.",
    },
    {
      title: "AI for SSC",
      body: "People reach AI with a school OpenRouter key, rather than setting up access alone.",
    },
    {
      title: "Shared practice",
      body: "A workflow that works can be saved and reused by the next person.",
    },
    {
      title: "A balance you can see",
      body: "What is left on a key is visible, so a team is not caught out when it runs low.",
    },
  ],
};

export const marquee = {
  rows: [
    ["Chimes", "Transcriber", "Skills library"],
    ["API usage", "One portal", "Open to all"],
  ],
};

export interface Tool {
  id: string;
  number: string;
  name: string;
  short: string;
}

export const tools: Tool[] = [
  {
    id: "chimes",
    number: "01",
    name: "Chimes",
    short:
      "A calm way to reach a team. Send a short signal when a room changes, a time moves, or a hand is needed, and it shows up where people already look.",
  },
  {
    id: "skills",
    number: "02",
    name: "Skills library",
    short:
      "Skills are AI workflows saved for a team. They run with that team's OpenRouter key, so someone can start from a skill instead of a blank prompt.",
  },
  {
    id: "usage",
    number: "03",
    name: "Usage",
    short: "Look up a key and see what is left on it.",
  },
];

export const toolsSection = {
  title: ["Chimes, skills", "_and usage_"],
  subtitle: "Chimes, Skills library _&_ Usage",
  cta: { label: "Open the portal", href: portalUrl },
};

export const carousel = {
  title: ["Useful in", "_every corner_"],
  body: "From the classroom to the general office, the portal fits into the work people already do.",
  cta: { label: "Request an API key", href: "#apply" },
  cards: [
    { title: "Teachers", body: "Transcribe a lesson, start from a shared skill, and see what the key has left." },
    { title: "Students", body: "Read back a class and catch up on one they missed." },
    { title: "Departments", body: "Share skills so a workflow is there for the whole team." },
    { title: "General office", body: "Transcribe a briefing and keep the text." },
    { title: "IT team", body: "Take requests for keys and credit, and watch what each key has left." },
    { title: "Clubs & events", body: "Reach members with a Chimes signal." },
  ],
};

export const stack = {
  title: ["Speech into", "_text_"],
  body: "Transcriber turns speech into text you can read back.",
  label: "Sample caption",
  sentence: "Please move this afternoon's meeting to the library, and send the notes to anyone who cannot attend.",
};

export const apply = {
  title: ["Need a key?", "Apply, or add _credit_"],
  body: "The portal is open to everyone. Use this form to ask for an OpenRouter API key, or to add credit to a key your team already has. During early access we only check the request — no key is created, no credit is added, and nothing is stored.",
  fields: {
    kind: "What do you need?*",
    apply: "Apply for a key",
    credit: "Add credit",
    firstName: "First name*",
    lastName: "Last name*",
    email: "School email*",
    emailPlaceholder: "name@ssc.edu.hk",
    team: "Team or department*",
    role: "Your role*",
    rolePlaceholder: "Choose one",
    note: "What will the team use the key for?*",
    amount: "How much credit?*",
    amountPlaceholder: "For example, 50",
    keyRef: "Which key?*",
    keyPlaceholder: "Team name or key label",
    consent: "By submitting, I confirm I'm requesting on behalf of my team and will follow the school's acceptable-use rules.*",
  },
  submit: "Send request",
  submitting: "Checking…",
  successTitle: "Request checked.",
  successBody: "Everything looks right. No key was created and no credit was added, and nothing was saved.",
  again: "Start another request",
  networkError: "We couldn't reach the server. Please try again in a moment.",
};

export const footer = {
  headline: "Intelligence, on campus",
  links: [
    { label: "Tools", href: "#tools" },
    { label: "How it works", href: "#stack" },
    { label: "Request an API key", href: "#apply" },
  ],
};
