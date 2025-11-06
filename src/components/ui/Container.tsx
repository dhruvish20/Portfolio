import React from "react";
import type { PropsWithChildren } from "react";
import "../../styles/container.css";

type ContainerProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function Container({ id, className = "", children }: ContainerProps) {
  return (
    <section id={id} className={`container ${className}`}>
      {children}
    </section>
  );
}
