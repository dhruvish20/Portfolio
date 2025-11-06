// src/components/sections/ProjectsSection.tsx

import React from "react";
import "../../styles/projects.css";
import { projects, type Project } from "../../data/projects";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionTitle } from "../ui/SectionTitle";
import { ArrowUpRight } from "lucide-react";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <SectionTitle label="Projects" />

        <div className="projects-grid">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card"
              onClick={() => onSelectProject(project)}
            >
              {/* overlay indicator */}
              <span className="project-overlay-icon">
                <ArrowUpRight size={14} />
              </span>

              <div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>

                <ul className="project-features">
                  {project.features.slice(0, 2).map((f, idx) => (
                    <li key={idx}>• {f}</li>
                  ))}
                  {project.features.length > 2 && (
                    <li className="project-features-more">
                      + {project.features.length - 2} more in details
                    </li>
                  )}
                </ul>
              </div>

              <div className="project-tags">
                {project.tags.map((tag) => (
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
