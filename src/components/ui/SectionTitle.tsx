import React from "react";
import "../../styles/sectionTitle.css";

interface SectionTitleProps {
  label: string;
  kicker?: string;
}

export function SectionTitle({ label, kicker }: SectionTitleProps) {
  return (
    <header className="mb-6 flex flex-col gap-1">
      {kicker && (
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
          {kicker}
        </p>
      )}
      <h2 className="section-title">{label}</h2>
    </header>
  );
}
