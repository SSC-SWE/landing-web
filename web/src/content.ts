// All draft copy for the page. Edit words here; layout lives in components/.

/** Replace with the real portal URL when ready. */
export const portalUrl = "#";

/** Transcriber is not live yet — placeholder target for its section button. */
export const transcriberUrl = "https://ai.ssc.edu.hk/transcriber";

export const site = {
  wordmark: "AI.SSC",
  domain: "ai.ssc.edu.hk",
  nav: [
    { label: "Request an API key", href: "#apply" },
    { label: "Portal", href: portalUrl, tag: "Open" },
  ],
};

export const hero = {
  badge: "St Stephen's College, Stanley",
  headline: "Intelligence, on campus",
  scrollCue: "Scroll to dig",
  lead: "**Chimes, Transcriber, Skills library and Usage, side by side.** Every teacher, student and staff member at SSC can open them, and the AI tools all run on one OpenRouter key.",
  cta: { label: "Open the portal", href: portalUrl },
};

export const principles = {
  title: ["Why this", "_portal_"],
  body: "Good AI models are scattered across dozens of paid sites, each with its own sign-up and its own bill. The portal gathers them behind the school, so getting started takes a single request.",
  cta: { label: "See the tools", href: "#tools" },
  items: [
    {
      title: "Every model, one key",
      body: "OpenRouter opens the leading models from many providers. One key handles coding, writing, research and everyday questions, so nobody juggles subscriptions.",
    },
    {
      title: "Built for how SSC speaks",
      body: "Classes and meetings here move between English, Cantonese and Mandarin. The tools are set up to follow all three instead of assuming one.",
    },
    {
      title: "Checked before it is shared",
      body: "Anything added to the Skills library is reviewed for prompt injection first. A skill you pick up from a colleague does only what it says it does.",
    },
    {
      title: "No surprise empty keys",
      body: "Every key has a balance anyone can check. Credit is topped up through a request, not discovered missing halfway through a lesson.",
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
      "The College's official magazine, published since 1909, records each chapter of school life, from competition results and team honours to the people who made them happen. Read past and current issues here, and see every team that earned a place in its pages.",
  },
  {
    id: "skills",
    number: "02",
    name: "Skills library",
    short:
      "Skills are ready-made instructions that teach an AI to do one job well, such as Taste for sharper design or Superhuman for faster, more thorough work. Each skill is checked for prompt injection before it is listed, then runs on your own OpenRouter key.",
  },
  {
    id: "usage",
    number: "03",
    name: "Usage",
    short:
      "Enter a key to see how much credit is left and how quickly it has been going. Because every AI tool on campus draws from that same key, this is where you find out whether to request a top-up.",
  },
];

export const toolsSection = {
  title: ["Chimes, skills", "_and usage_"],
  subtitle: "Chimes, Skills library _&_ Usage",
  cta: { label: "Open the portal", href: portalUrl },
};

export const carousel = {
  title: ["Useful in", "_every corner_"],
  body: "The same key behaves differently in every room. Here is what it looks like across campus, from the classroom to the server room.",
  cta: { label: "Request an API key", href: "#apply" },
  cards: [
    {
      title: "Teachers",
      body: "Turn a topic into lesson ideas, a full lesson plan or a set of practice questions. Shape the draft with your own judgement instead of starting from a blank page.",
    },
    {
      title: "Students",
      body: "Debug a coding project, sketch a poster for a club, or have a hard idea explained another way. AI becomes a study partner rather than a shortcut.",
    },
    {
      title: "Departments",
      body: "Agree on one approach to marking feedback or unit planning and keep it as a shared skill. New colleagues can pick up the department's way of working on day one.",
    },
    {
      title: "General office",
      body: "Draft notices, sort replies and reformat the same forms every term. Repetitive admin is handed off, and staff have time for work that needs a person.",
    },
    {
      title: "IT team",
      body: "Write scripts, review code and work through tickets faster. The team also handles key requests and keeps an eye on what each key has left.",
    },
    {
      title: "Clubs & teams",
      body: "STEM and technical teams such as robotics, ROV and iGEM can share a key across members. Projects can go further than one student's access would allow.",
    },
  ],
};

export const stack = {
  title: ["Speech into", "_text_"],
  body: "Record a lesson or a meeting in English, Cantonese or Mandarin, and Transcriber returns a full transcript, a short summary and ready-to-send meeting minutes. Anyone at SSC can use it, so the student who was off sick and the colleague who couldn't attend both get the same record.",
  label: "Live transcript",
  sentence: "So for Saint Stephen's let us strive,\nto fight, to win with steadfast pride.",
  cta: { label: "Open Transcriber", href: transcriberUrl },
};

export const apply = {
  title: ["Need a key?", "Apply, or add _credit_"],
  body: "Ask for an OpenRouter key for yourself or your team, or add usage to a key that is running low. During early access this form only checks your request, so no key is created, no credit is added and nothing is stored.",
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
    note: "What will you or your team use the key for?*",
    amount: "How much credit?*",
    amountPlaceholder: "For example, 50",
    keyRef: "Which key?*",
    keyPlaceholder: "Team name or key label",
    consent: "By submitting, I confirm this request is for me or my team and that I will follow the school's acceptable-use rules.*",
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
