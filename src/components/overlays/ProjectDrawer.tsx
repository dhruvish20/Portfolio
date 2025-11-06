// src/components/projects/ProjectDrawer.tsx

import React from "react";
import { X, ExternalLink, Github } from "lucide-react";
import "../../styles/projectDrawer.css";
import type { Project } from "../../data/projects";
import { Tag } from "../ui/Tag";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  if (!project) return null;

  return (
    <div
      className="project-drawer-backdrop"
      onClick={onClose}
    >
      <aside
        className="project-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="project-drawer-header">
          <div>
            <div className="project-drawer-title">{project.title}</div>
            {project.subtitle && (
              <p className="project-drawer-subtitle">
                {project.subtitle}
              </p>
            )}
            <p className="text-sm text-neutral-600">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-neutral-100 transition-colors"
            aria-label="Close project details"
          >
            <X size={16} />
          </button>
        </header>

        <div className="project-drawer-body">
          <div className="project-drawer-body-inner">
            {/* Overview */}
            <div>
              <p className="project-drawer-section-label">Overview</p>
              <p className="project-drawer-description">
                {project.description}
              </p>
            </div>

            {/* What I built */}
            {project.features && project.features.length > 0 && (
              <div>
                <p className="project-drawer-section-label">What I built</p>
                <ul className="project-drawer-features">
                  {project.features.map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* My understanding / theory */}
            {project.conceptNote && (
              <div>
                <p className="project-drawer-section-label">
                  My understanding of the concept
                </p>
                <p className="project-drawer-concept">
                  {project.conceptNote}
                </p>
              </div>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <p className="project-drawer-section-label">Metrics</p>
                <div className="project-drawer-metrics">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="project-metric-card">
                      <div className="project-metric-label">{m.label}</div>
                      <div className="project-metric-value">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stack */}
            <div>
              <p className="project-drawer-section-label">Stack</p>
              <div className="project-drawer-tags">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Links – MOVED INSIDE BODY INNER */}
            {project.links && project.links.length > 0 && (
              <div>
                <p className="project-drawer-section-label">Links</p>
                <div className="project-drawer-links">
                  {project.links.map((link) => {
                    const Icon =
                      link.type === "repo"
                        ? Github
                        : link.type === "demo"
                        ? ExternalLink
                        : ExternalLink;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn"
                      >
                        <Icon size={14} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
