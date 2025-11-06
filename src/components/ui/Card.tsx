import React from "react";
import type { PropsWithChildren } from "react";
import "../../styles/card.css";

type CardProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export function Card({ className = "", onClick, children }: CardProps) {
  const interactive = !!onClick;
  const modeClass = interactive ? "card-interactive" : "card-hover";

  return (
    <div
      className={`card group ${modeClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
