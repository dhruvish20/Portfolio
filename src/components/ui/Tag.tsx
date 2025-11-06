import React from "react";
import "../../styles/tag.css";

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className = "" }: TagProps) {
  return <span className={`tag ${className}`}>{label}</span>;
}
