import { Fragment, useEffect, useRef, useState } from "react";
import { stack } from "../content";
import { usePrefersReducedMotion } from "../lib/motion";
import { Lines } from "./Lines";
import { TextLink } from "./Arrow";

const LINES = stack.sentence.split("\n");
const WORDS = LINES.flatMap((line, li) =>
  line
    .trim()
    .split(" ")
    .map((word, wi, arr) => ({ word, br: wi === arr.length - 1 && li < LINES.length - 1 })),
);

export function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), Math.max(travel, 1));
      const progress = travel <= 0 ? 1 : passed / travel;
      setActive(Math.min(WORDS.length - 1, Math.floor(progress * WORDS.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={`section stack stack--caption${reduced ? " is-still" : ""}`}
      id="stack"
      aria-labelledby="stack-title"
    >
      <div className="glow glow--stack" aria-hidden="true" />
      <div className="stack__pin">
        <div className="stack__text">
          <Lines id="stack-title" className="display" lines={stack.title} accent />
          <p className="lead" data-reveal>
            {stack.body}
          </p>
          <TextLink href={stack.cta.href} data-reveal>
            {stack.cta.label}
          </TextLink>
        </div>

        <figure className="caption" data-reveal>
          <figcaption className="caption__label">{stack.label}</figcaption>
          <p className="caption__line">
            {WORDS.map(({ word, br }, i) => {
              const state = reduced ? "is-said" : i < active ? "is-said" : i === active ? "is-now" : "is-ahead";
              return (
                <Fragment key={i}>
                  <span className={`caption__word ${state}`}>{word}</span>
                  {br && <span className="caption__break" aria-hidden="true" />}
                </Fragment>
              );
            })}
          </p>
        </figure>
      </div>
    </section>
  );
}
