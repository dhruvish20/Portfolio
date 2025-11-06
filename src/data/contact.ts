// src/data/contact.ts

export interface ContactLink {
  id: "email" | "github" | "linkedin";
  label: string;
  href: string;
}

export interface ContactConfig {
  blurb: string;
  links: ContactLink[];
}

export const contactConfig: ContactConfig = {
  blurb:
    "I’m open to backend, infrastructure, and data/system engineering roles where I can ship reliable services and clear developer experiences.",
  links: [
    {
      id: "email",
      label: "Email",
      href: "mailto:parekhdhruvish7080@gmail.com",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/dhruvish20",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dhruvish-parekh-7913911b3/",
    },
  ],
};
