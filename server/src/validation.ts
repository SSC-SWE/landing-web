// Keep in sync with web/src/lib/validation.ts.

export const ROLES = ["Teacher", "Staff", "Student leader"] as const;
export const TOOL_IDS = ["chimes", "transcriber", "skills", "usage"] as const;
export const SCHOOL_DOMAIN = "@ssc.edu.hk";

export type Role = (typeof ROLES)[number];
export type ToolId = (typeof TOOL_IDS)[number];

export interface Application {
  firstName: string;
  lastName: string;
  email: string;
  team: string;
  role: Role | "";
  tools: ToolId[];
  note: string;
  consent: boolean;
}

export type FieldErrors = Partial<Record<keyof Application, string>>;

const EMAIL_PATTERN = /^[a-z0-9._%+-]+@ssc\.edu\.hk$/i;

const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

export function normalise(input: unknown): Application {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const tools = Array.isArray(raw.tools) ? raw.tools.filter((t): t is string => typeof t === "string") : [];
  return {
    firstName: asString(raw.firstName),
    lastName: asString(raw.lastName),
    email: asString(raw.email),
    team: asString(raw.team),
    role: asString(raw.role) as Role | "",
    tools: tools as ToolId[],
    note: asString(raw.note),
    consent: raw.consent === true,
  };
}

export function validate(app: Application): FieldErrors {
  const errors: FieldErrors = {};

  if (!app.firstName) errors.firstName = "Enter your first name.";
  else if (app.firstName.length > 60) errors.firstName = "Keep it under 60 characters.";

  if (!app.lastName) errors.lastName = "Enter your last name.";
  else if (app.lastName.length > 60) errors.lastName = "Keep it under 60 characters.";

  if (!app.email) errors.email = "Enter your school email.";
  else if (!app.email.toLowerCase().endsWith(SCHOOL_DOMAIN)) errors.email = `Use an address ending in ${SCHOOL_DOMAIN}.`;
  else if (!EMAIL_PATTERN.test(app.email)) errors.email = "That email address doesn't look right.";

  if (!app.team) errors.team = "Name the team or department.";
  else if (app.team.length > 80) errors.team = "Keep it under 80 characters.";

  if (!ROLES.includes(app.role as Role)) errors.role = "Choose your role.";

  if (app.tools.length === 0) errors.tools = "Pick at least one tool.";
  else if (app.tools.some((t) => !TOOL_IDS.includes(t))) errors.tools = "Unknown tool selected.";

  if (app.note.length < 10) errors.note = "Tell us a little more (at least 10 characters).";
  else if (app.note.length > 500) errors.note = "Keep it under 500 characters.";

  if (!app.consent) errors.consent = "Please confirm before sending.";

  return errors;
}
