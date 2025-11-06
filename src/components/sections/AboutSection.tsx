import React from "react";
import { Github, Linkedin, Mail , FileDown} from "lucide-react";
import { aboutProfile , type SocialLink } from "../../data/about";
import "../../styles/about.css";

const ICONS: Record<SocialLink["type"], React.ReactNode> = {
  github: <Github size={14} />,
  linkedin: <Linkedin size={14} />,
  email: <Mail size={14} />,
  resume: <FileDown size={14} />,
};


export function AboutSection() {
  const { name, avatar, tagline, blurb, links } = aboutProfile;

  return (
    <section id="about" className="about-hero">
      <div className="about-inner">
        <div className="about-row">
          <img src={avatar} alt="headshot" className="about-avatar" />

          <div>
            <h1 className="about-name">{name}</h1>
            <p className="about-tagline">{tagline}</p>
            <p className="about-blurb">{blurb}</p>

            <div className="about-links">
            {links.map((link) => {
                const isExternal =
                link.type === "github" || link.type === "linkedin";
                const isResume = link.type === "resume";

                return (
                <a
                    key={link.type}
                    href={link.href}
                    className="about-link-btn"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    download={isResume}
                    >
                    {ICONS[link.type]}
                    <span>{link.label}</span>
                    </a>
                );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
