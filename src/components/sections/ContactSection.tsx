import React from "react";
import "../../styles/contact.css";
import { contactConfig } from "../../data/contact";
import { SectionTitle } from "../ui/SectionTitle";
import { Mail, Github, Linkedin } from "lucide-react";

const ICONS = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
} as const;

export function ContactSection() {
  const { blurb, links } = contactConfig;

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <SectionTitle label="Contact" />

        <p className="contact-blurb">{blurb}</p>

        <div className="contact-actions">
          {links.map((link) => {
            const Icon = ICONS[link.id];
            const isEmail = link.id === "email";

            return (
              <a
                key={link.id}
                href={link.href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noreferrer"}
                className="contact-btn"
              >
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
