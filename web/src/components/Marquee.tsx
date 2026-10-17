import { Fragment } from "react";
import { marquee } from "../content";

function Row({ words, reverse }: { words: string[]; reverse?: boolean }) {
  const run = (
    <span className="marquee__run">
      {words.map((word) => (
        <Fragment key={word}>
          <span>{word}</span>
          <span className="marquee__dash" />
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className={`marquee__row${reverse ? " is-reverse" : ""}`}>
      <div className="marquee__track">
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}

export function Marquee() {
  const [top, bottom] = marquee.rows;
  return (
    <section className="marquee" aria-label={[...top, ...bottom].join(", ")}>
      <div className="glow glow--marquee" aria-hidden="true" />
      <div aria-hidden="true">
        <Row words={top} />
        <Row words={bottom} reverse />
      </div>
    </section>
  );
}
