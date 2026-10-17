// All draft copy for the page. Edit words here; layout lives in components/.

import type { ToolId } from "./lib/validation";

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
  title: ["Built for", "_the school_"],
  body: "Every tool starts from how SSC already works — teams, timetables, lessons and meetings — and takes a few small jobs off the list",
  cta: { label: "See the tools", href: "#tools" },
  items: [
    {
      title: "One portal",
      body: "Sign in once and reach Chimes, Transcriber, Skills library and API usage from a single place, with no separate logins for each tool.",
    },
    {
      title: "Heard clearly",
      body: "Lessons and meetings become clean text you can read back, search, and share with the people who missed them.",
    },
    {
      title: "Ready to reuse",
      body: "A good prompt or workflow only needs writing once. Save it as a skill and the whole team can use it.",
    },
    {
      title: "Usage in view",
      body: "Teams that use the API can see how much of their allowance is in use, so there are no surprises at the end of term.",
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
  id: ToolId;
  number: string;
  name: string;
  short: string;
}

export const tools: Tool[] = [
  {
    id: "chimes",
    number: "01",
    name: "Chimes",
    short: "A calm way to reach your team. Send a short signal when a room changes, a deadline moves or a hand is needed, and it arrives where people already look.",
  },
  {
    id: "transcriber",
    number: "02",
    name: "Transcriber",
    short: "Record a lesson, a department meeting or a parent briefing and get a readable transcript back — for revision notes, minutes, or students catching up.",
  },
  {
    id: "skills",
    number: "03",
    name: "Skills library",
    short: "When someone finds a prompt or workflow that works, they save it as a skill. Everyone on the team can find it, run it and improve it.",
  },
  {
    id: "usage",
    number: "04",
    name: "API usage",
    short: "See at a glance how much of your team's monthly API allowance has been used, so the service stays fair for every department.",
  },
];

export const toolsSection = {
  title: ["Four tools,", "_one portal_"],
  subtitle: "Chimes, Transcriber, Skills library _&_ API usage",
  cta: { label: "Open the portal", href: portalUrl },
};

export const carousel = {
  title: ["Useful in", "_every corner_"],
  body: "From the classroom to the general office, the portal fits into the work people already do.",
  cta: { label: "Request an API key", href: "#apply" },
  cards: [
    { title: "Teachers", body: "Turn lessons into notes, reuse marking prompts and send quick room-change chimes." },
    { title: "Students", body: "Read back what was said in class and catch up on lessons they missed." },
    { title: "Departments", body: "Share a library of skills so good workflows spread across the whole team." },
    { title: "General office", body: "Transcribe briefings and keep notices moving without another group chat." },
    { title: "IT team", body: "Issue API keys to teams and keep an eye on allowance across the school." },
    { title: "Clubs & events", body: "Coordinate rehearsals, fixtures and trips with simple signals to members." },
  ],
};

export const stack = {
  title: ["Simple stack", "_& open access_"],
  body: "Everyone at SSC can use the portal. Teams that build their own scripts can request a key.",
  steps: ["Open to every SSC account", "Four tools behind one sign-in", "Optional team API keys", "Usage visible to each team"],
  diagram: {
    top: { title: "AI.SSC Portal", meta: ["sign-in", "chimes", "transcriber", "skills", "usage"] },
    hub: { title: "Everyone at SSC", meta: "open access" },
    left: {
      label: "tools/",
      items: [
        { code: "chimes.send()", meta: "Signals for teams", icon: "bell" },
        { code: "transcribe(audio)", meta: "Speech to text", icon: "wave" },
      ],
    },
    right: {
      label: "library/",
      featured: { code: "skills.run()", meta: "(shared=true)", sub: "Skills library" },
      items: [
        { code: "skills.save()", icon: "save" },
        { code: "skills.search()", icon: "search" },
      ],
    },
    bottom: {
      label: "api/",
      items: [
        { code: "team.requestKey()", meta: "Optional · school email", icon: "key" },
        { code: "usage.check()", meta: "Allowance in view", icon: "chart" },
        { code: "limits.fair()", meta: "Shared across teams", icon: "shield" },
      ],
    },
  },
};

export const apply = {
  title: ["Need API access?", "Request a key for _your team_"],
  body: "The portal is open to everyone. Use this form only if your team needs an API key for scripts or apps. During early access we only check the request — no key is issued and nothing is stored.",
  fields: {
    firstName: "First name*",
    lastName: "Last name*",
    email: "School email*",
    emailPlaceholder: "name@ssc.edu.hk",
    team: "Team or department*",
    role: "Your role*",
    rolePlaceholder: "Choose one",
    tools: "Tools you'll call via API*",
    note: "What does the team need?",
    consent: "By submitting, I confirm I'm requesting on behalf of my team and will follow the school's acceptable-use rules.*",
  },
  submit: "Send request",
  submitting: "Checking…",
  successTitle: "Request checked.",
  successBody: "Everything looks right. Keys are not being issued yet, so nothing was saved. We'll open requests properly soon.",
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
