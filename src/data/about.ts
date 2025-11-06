// src/data/about.ts
export interface SocialLink {
  type: "github" | "linkedin" | "email" | "resume";
  label: string;
  href: string;
}

export interface AboutProfile {
  name: string;
  avatar: string;
  tagline: string;
  blurb: string;
  links: SocialLink[];
}

export const aboutProfile: AboutProfile = {
  name: "Dhruvish Parekh",
  avatar: "https://avatars.githubusercontent.com/u/00000000?v=4",
  tagline: "Distributed systems, data pipelines, and the art of making things work",
  blurb:
    "I like building things that actually work — mostly backend systems, data tools, and agentic experiments. Clean, reliable, and a little over-engineered on purpose.",
  links: [
    {
      type: "github",
      label: "GitHub",
      href: "https://github.com/dhruvish20",
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dhruvish-parekh-7913911b3/",
    },
    {
      type: "email",
      label: "Email",
      href: "mailto:parekhdhruvish7080@gmail.com",
    },
    {
      type: "resume",
      label: "Resume",
      href: "/Dhruvish-Parekh-Resume.pdf",
    },
  ],
};
