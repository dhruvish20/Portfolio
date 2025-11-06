import React from "react";
import { Cpu, Database, Network, ExternalLink, Github, BookOpen } from "lucide-react";
import { featuredSystems } from "../../data/featuredSystems";
import { Tag } from "../ui/Tag";
import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import "../../styles/featuredSystems.css";

const ICONS: Record<string, React.ReactNode> = {
  datasense: <Cpu size={16} />,
  "market-data": <Database size={16} />,
  lobbybase: <Network size={16} />,
};


interface FeaturedSystemsSectionProps {
  onOpenNotebook?: (notebookId: string) => void;
}

export function FeaturedSystemsSection({ onOpenNotebook }: FeaturedSystemsSectionProps) {
  return (
    <section id="featured-section" className="featured-section">
      <div className="featured-inner">
        <SectionTitle label="Featured Systems" />

        <div className="featured-grid">
          {featuredSystems.map((system) => (
            <Card key={system.id} className="featured-card">
              <div className="featured-header">
                {ICONS[system.id]}
                <div>
                  <div className="featured-badge">Featured system</div>
                  <h3 className="featured-title">{system.title}</h3>
                </div>
              </div>

              <p className="featured-subtitle">{system.subtitle}</p>

              <ul className="featured-list">
                {system.bullets.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>

              {system.metrics && system.metrics.length > 0 && (
                <div className="featured-metrics">
                  {system.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="featured-metric-card"
                    >
                      <div className="featured-metric-label">{m.label}</div>
                      <div className="featured-metric-value">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="featured-tags">
                {system.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              {system.relatedNotebookId && system.relatedNotebookLabel && (
                <button
                    type="button"
                    className="featured-notebook-link"
                    onClick={() => onOpenNotebook && onOpenNotebook(system.relatedNotebookId!)}
                >
                    <BookOpen size={12} />
                    <span>Notebook: {system.relatedNotebookLabel}</span>
                    <span>→</span>
                </button>
                )}

              {system.links && (system.links.demo || system.links.repo) && (
            <div className="featured-actions">
                {system.links.demo && (
                <a
                    href={system.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-pill-btn"
                >
                    <ExternalLink size={14} /> Demo
                </a>
                )}
                            {system.links.repo && (
                                <a
                                    href={system.links.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="featured-pill-btn"
                                >
                                    <Github size={14} /> Repo
                                </a>
                )}
            </div>
            )}

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
