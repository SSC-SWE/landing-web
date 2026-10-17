import { createElement, type ReactNode } from "react";

/** Renders `_italic_` and `**bold**` markers from content strings. */
export function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.length > 1 && part.startsWith("_") && part.endsWith("_")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

interface LinesProps {
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
  lines: string[];
  /** Colours italic words with the accent. */
  accent?: boolean;
}

/** Heading whose lines rise out of a mask on scroll (see lib/motion.ts). */
export function Lines({ as = "h2", id, className, lines, accent }: LinesProps) {
  return createElement(
    as,
    { id, className: [className, accent && "has-accent"].filter(Boolean).join(" "), "data-lines": "" },
    lines.map((line, i) => (
      <span key={i} className="line">
        <span className="line__inner">{rich(line)}</span>
      </span>
    )),
  );
}
