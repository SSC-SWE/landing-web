import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { carousel } from "../content";
import { Arrow, TextLink } from "./Arrow";
import { Lines } from "./Lines";

const SWIPE_PX = 50;

export function Carousel() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const { cards } = carousel;
  const last = cards.length - 1;
  const go = (next: number) => setIndex(Math.max(0, Math.min(last, next)));

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="section carousel" aria-labelledby="carousel-title">
      <div className="split">
        <Lines id="carousel-title" className="display" lines={carousel.title} accent />
        <div className="split__aside" data-reveal>
          <p className="lead">{carousel.body}</p>
          <TextLink href={carousel.cta.href}>{carousel.cta.label}</TextLink>
        </div>
      </div>

      <div className="carousel__body" data-reveal>
        <div className="carousel__controls">
          <span className="carousel__count" aria-live="polite">
            {index + 1} / {cards.length}
          </span>
          <div className="carousel__buttons">
            <button type="button" className="round-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous">
              <Arrow direction="left" size={16} />
            </button>
            <button type="button" className="round-btn" onClick={() => go(index + 1)} disabled={index === last} aria-label="Next">
              <Arrow size={16} />
            </button>
          </div>
        </div>

        <div
          className="carousel__viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (startX.current = null)}
        >
          <ul className="carousel__track" style={{ "--i": index } as CSSProperties}>
            {cards.map((card, i) => (
              <li key={card.title} className={`card${i < index ? " is-past" : ""}`}>
                <h3 className="serif-sm">{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
