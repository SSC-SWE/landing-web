import { useEffect, useState } from "react";
import { site } from "../content";

export function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${hidden ? " is-hidden" : ""}`}>
      <a className="wordmark" href="#top" aria-label={`${site.wordmark} home`}>
        {site.wordmark}
      </a>
      <nav className="header__nav" aria-label="Primary">
        {site.nav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
            {item.tag && <span className="header__tag">{item.tag}</span>}
          </a>
        ))}
      </nav>
    </header>
  );
}
