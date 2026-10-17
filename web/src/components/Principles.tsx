import { principles } from "../content";
import { TextLink } from "./Arrow";
import { Lines } from "./Lines";

export function Principles() {
  return (
    <section className="section principles" id="principles" aria-labelledby="principles-title">
      <div className="split">
        <Lines id="principles-title" className="display" lines={principles.title} />
        <div className="split__aside" data-reveal>
          <p className="lead">{principles.body}</p>
          <TextLink href={principles.cta.href}>{principles.cta.label}</TextLink>
        </div>
      </div>

      <ul className="principles__grid">
        {principles.items.map((item) => (
          <li key={item.title} data-reveal>
            <h3 className="serif-sm">{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
