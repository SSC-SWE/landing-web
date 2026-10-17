import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ArrowProps {
  direction?: "right" | "left" | "down";
  size?: number;
}

const ROTATION = { right: 0, down: 90, left: 180 };

export function Arrow({ direction = "right", size = 24 }: ArrowProps) {
  return (
    <svg
      className="arrow"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ transform: `rotate(${ROTATION[direction]}deg)` }}
    >
      <path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type TextLinkProps = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;

export function TextLink({ href, children, ...rest }: TextLinkProps) {
  const external = href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a className="text-link" href={href} {...external} {...rest}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
