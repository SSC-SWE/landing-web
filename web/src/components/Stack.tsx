import { stack } from "../content";
import { Lines } from "./Lines";

const ICONS: Record<string, string> = {
  bell: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15ZM10 20a2 2 0 0 0 4 0",
  wave: "M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2",
  save: "M5 4h11l3 3v13H5ZM8 4v5h7V4M8 20v-6h8v6",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14ZM16 16l4 4",
  key: "M14 10a4 4 0 1 0-3.5 4L11 14h2v2h2v2h3v-3l-4.6-4.6",
  chart: "M4 20h16M7 16v-5M12 16V6M17 16v-8",
  shield: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6Z",
  user: "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 19c0-3 3-5 6-5s6 2 6 5",
};

function Icon({ name }: { name: string }) {
  return (
    <svg className="dg__icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Code({ text }: { text: string }) {
  const dot = text.indexOf(".");
  if (dot < 0) return <>{text}</>;
  return (
    <>
      <span className="accent">{text.slice(0, dot)}</span>
      {text.slice(dot)}
    </>
  );
}

export function Stack() {
  const { diagram: d } = stack;
  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="glow glow--stack" aria-hidden="true" />
      <div className="stack__text">
        <Lines id="stack-title" className="display" lines={stack.title} />
        <p className="lead" data-reveal>
          {stack.body}
        </p>
        <ul className="dash-list" data-reveal>
          {stack.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <figure className="dg" data-reveal aria-label="How the portal fits together: everyone opens the portal, which reaches the tools, the skills library and optional team API keys">
        <div className="dg__inner" aria-hidden="true">
          <div className="dg__top">
            <strong>{d.top.title}</strong>
            <span>{d.top.meta.join(" · ")}</span>
          </div>

          <div className="dg__mid">
            <div className="dg__group">
              <span className="dg__label">{d.left.label}</span>
              {d.left.items.map((item) => (
                <div key={item.code} className="dg__chip">
                  <Icon name={item.icon} />
                  <span>
                    {item.code}
                    <small>{item.meta}</small>
                  </span>
                </div>
              ))}
            </div>

            <div className="dg__hub">
              <span className="dg__wire dg__wire--in" />
              <div className="dg__circle">
                <Icon name="user" />
                <strong>{d.hub.title}</strong>
                <span>{d.hub.meta}</span>
              </div>
              <span className="dg__wire dg__wire--out" />
            </div>

            <div className="dg__group">
              <span className="dg__label">{d.right.label}</span>
              <div className="dg__chip dg__chip--featured">
                <Icon name="save" />
                <span>
                  <Code text={d.right.featured.code} />
                  <small>{d.right.featured.meta}</small>
                  <small>{d.right.featured.sub}</small>
                </span>
              </div>
              {d.right.items.map((item) => (
                <div key={item.code} className="dg__chip dg__chip--sm">
                  <Icon name={item.icon} />
                  <span>
                    <Code text={item.code} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="dg__group dg__group--row">
            <span className="dg__label">{d.bottom.label}</span>
            {d.bottom.items.map((item) => (
              <div key={item.code} className="dg__chip">
                <Icon name={item.icon} />
                <span>
                  <Code text={item.code} />
                  <small>{item.meta}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </figure>
    </section>
  );
}
