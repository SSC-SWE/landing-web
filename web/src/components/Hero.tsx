import { useEffect, useRef, useState } from "react";
import { hero } from "../content";
import { usePrefersReducedMotion } from "../lib/motion";
import { Arrow, TextLink } from "./Arrow";
import { rich } from "./Lines";

/** Bump `v` whenever public/hero.mp4 is replaced so browsers drop their cached copy. */
const HERO_VIDEO = `${import.meta.env.BASE_URL}hero.mp4?v=4`;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else video.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__media" aria-hidden="true">
        {!videoFailed && (
          <video
            ref={videoRef}
            className="hero__video"
            src={HERO_VIDEO}
            poster={`${import.meta.env.BASE_URL}hero-poster.svg`}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
        )}
        <div className="hero__warm" />
        <div className="hero__veil" />
      </div>

      <div className="hero__content">
        <span className="badge" data-hero-in>
          <Sparkle />
          {hero.badge}
        </span>
        <h1 className="hero__title" data-lines="">
          <span className="line">
            <span className="line__inner">{hero.headline}</span>
          </span>
        </h1>
      </div>

      <div className="hero__foot">
        <a className="hero__cue" href="#principles" data-hero-in>
          <span>{hero.scrollCue}</span>
          <span className="hero__cue-arrow">
            <Arrow direction="down" size={20} />
          </span>
        </a>
        <div className="hero__aside" data-hero-in>
          <p className="lead">{rich(hero.lead)}</p>
          <TextLink href={hero.cta.href}>{hero.cta.label}</TextLink>
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="badge__icon">
      <path d="M6 1.5 7.2 5 10.5 6 7.2 7 6 10.5 4.8 7 1.5 6 4.8 5Z" fill="#f4c66b" />
      <path d="M12 8.5l.7 1.8 1.8.7-1.8.7L12 13.5l-.7-1.8L9.5 11l1.8-.7Z" fill="#f4c66b" opacity=".8" />
    </svg>
  );
}
