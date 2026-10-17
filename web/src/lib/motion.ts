import { useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

gsap.registerPlugin(ScrollTrigger);

/** Smooth scrolling + Magma-like section reveals. Call once from App. */
export function usePageMotion() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const heroTitle = document.querySelector<HTMLElement>(".hero__title");
    const intro = gsap.timeline({ delay: 0.9 });
    if (heroTitle) {
      intro.fromTo(
        heroTitle.querySelectorAll(".line__inner"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1.4, ease: "expo.out" },
      );
    }
    intro.fromTo(
      "[data-hero-in]",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
      "-=1.0",
    );

    gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((heading) => {
      if (heading === heroTitle) return;
      gsap.fromTo(
        heading.querySelectorAll(".line__inner"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".marquee__row").forEach((row) => {
      const dir = row.classList.contains("is-reverse") ? 1 : -1;
      gsap.fromTo(
        row,
        { xPercent: -12 * dir },
        {
          xPercent: 12 * dir,
          ease: "none",
          scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => {
      intro.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);
}
