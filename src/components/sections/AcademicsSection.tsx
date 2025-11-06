import React from "react";
import "../../styles/academics.css";
import { academics } from "../../data/academics";
import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";

export function AcademicsSection() {
  return (
    <section id="academics" className="academics-section">
      <div className="academics-inner">
        <SectionTitle label="Academics" />

        <div className="academics-list">
          {academics.map((item) => (
            <Card key={item.id} className="academic-card">
              <div className="academic-header">
                <div>
                  <div className="academic-degree">{item.degree}</div>
                  <div className="academic-institution">{item.institution}</div>
                </div>
                <div className="text-right">
                  <div className="academic-meta">{item.location}</div>
                  <div className="academic-meta">
                    {item.timeframe}
                    {item.gpa ? ` • ${item.gpa}` : ""}
                  </div>
                </div>
              </div>

              <p className="academic-details">{item.details}</p>

              {item.keyCourses && item.keyCourses.length > 0 && (
                <>
                  <div className="academic-courses-label">Key courses</div>
                  <p className="academic-courses">
                    {item.keyCourses.join(" • ")}
                  </p>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
