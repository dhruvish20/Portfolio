import React from "react";
import "../../styles/architecture.css";
import { diagrams, type Diagram } from "../../data/diagrams";
import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { ArrowUpRight } from "lucide-react";

interface ArchitectureSectionProps {
  onSelectDiagram: (diagram: Diagram) => void;
}

export function ArchitectureSection({ onSelectDiagram }: ArchitectureSectionProps) {
  return (
    <section id="architecture" className="arch-section">
      <div className="arch-inner">
        <SectionTitle label="Architecture Gallery" />

        <div className="arch-grid">
          {diagrams.map((diagram) => (
            <Card
              key={diagram.id}
              className="arch-card group"
              onClick={() => onSelectDiagram(diagram)}
            >
              <span className="arch-overlay-icon">
                <ArrowUpRight size={14} />
              </span>

              <div className="arch-label">{diagram.label}</div>
              <p className="arch-description">{diagram.description}</p>

              <div className="arch-preview-container">
                <img
                  src={diagram.imageSrc}
                  alt={diagram.label}
                  className="arch-preview"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
