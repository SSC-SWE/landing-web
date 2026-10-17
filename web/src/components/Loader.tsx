import { useEffect, useState } from "react";
import { site } from "../content";

const SEEN_KEY = "ssc-ai-intro-seen";
const HOLD_MS = 1100;
const FADE_MS = 700;

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function Loader() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">(() => (alreadySeen() ? "done" : "show"));

  useEffect(() => {
    if (phase === "done") return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeAt = window.setTimeout(() => setPhase("fade"), reduced ? 200 : HOLD_MS);
    const doneAt = window.setTimeout(() => setPhase("done"), (reduced ? 200 : HOLD_MS) + FADE_MS);
    return () => {
      window.clearTimeout(fadeAt);
      window.clearTimeout(doneAt);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`loader${phase === "fade" ? " is-fading" : ""}`} aria-hidden="true">
      <span className="loader__mark">{site.wordmark}</span>
    </div>
  );
}
