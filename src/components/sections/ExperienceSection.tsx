// src/components/sections/ExperienceSection.tsx
import React from "react";
import "../../styles/experience.css";
import { experienceItems } from "../../data/experience";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionTitle } from "../ui/SectionTitle";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <SectionTitle label="Experience" />

        <div className="experience-list">
          {experienceItems.map((exp) => (
            <Card key={exp.id} className="experience-card">
              <div className="experience-header">
                <div>
                  <div className="experience-role">{exp.role}</div>
                  <div className="experience-company">{exp.company}</div>
                </div>
                <div className="text-right">
                  <div className="experience-meta">{exp.location}</div>
                  <div className="experience-meta">{exp.timeframe}</div>
                </div>
              </div>

              <ul className="experience-bullets">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>

              <div className="experience-tags">
                {exp.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
