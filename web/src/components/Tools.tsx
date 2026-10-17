import { tools, toolsSection } from "../content";
import { TextLink } from "./Arrow";
import { Lines, rich } from "./Lines";

export function Tools() {
  return (
    <section className="section tools" id="tools" aria-labelledby="tools-title">
      <div className="glow glow--tools" aria-hidden="true" />
      <div className="tools__head">
        <Lines id="tools-title" className="display" lines={toolsSection.title} />
      </div>

      <div className="tools__sticky" data-reveal>
        <h3 className="serif-sm">{rich(toolsSection.subtitle)}</h3>
        <TextLink href={toolsSection.cta.href}>{toolsSection.cta.label}</TextLink>
      </div>

      <ol className="tools__list">
        {tools.map((tool) => (
          <li key={tool.id} className="tools__item" data-reveal>
            <span className="tools__num" aria-hidden="true">
              {tool.number}
            </span>
            <h3 className="serif-sm">{tool.name}</h3>
            <p>{tool.short}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
