import { footer, site } from "../content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__giant" aria-hidden="true">
        {footer.headline}
      </p>
      <div className="footer__bar">
        <a className="wordmark" href="#top">
          {site.wordmark}
        </a>
        <nav className="footer__links" aria-label="Footer">
          {footer.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <span className="footer__meta">
          © {year} {site.domain}
        </span>
      </div>
    </footer>
  );
}
