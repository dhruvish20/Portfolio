import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AboutSection } from "../sections/AboutSection";
import { FeaturedSystemsSection } from "../sections/FeaturedSystemsSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { ArchitectureSection } from "../sections/ArchitectureSection";
import { NotebookSection } from "../sections/NotebookSection";
import { AcademicsSection } from "../sections/AcademicsSection";
import { ContactSection } from "../sections/ContactSection";
import { ProjectDrawer } from "../overlays/ProjectDrawer";
import { DiagramLightbox } from "../overlays/DiagramLightbox";
import { ArticlePage } from "../overlays/ArticlePage";
import type { Project } from "../../data/projects";
import type { Diagram } from "../../data/diagrams";
import type { NotebookPost } from "../../data/notebook";
import { notebookPosts } from "../../data/notebook";


type View = "home" | "article";

export function PortfolioLayout() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NotebookPost | null>(
    null
  );
  const [view, setView] = useState<View>("home");

  const handleOpenArticle = (post: NotebookPost) => {
    setSelectedArticle(post);
    setView("article");
  };

  const handleBackHome = () => {
    setView("home");
    setSelectedArticle(null);
  };

  const handleOpenNotebookById = (notebookId: string) => {
    const article = notebookPosts.find((p) => p.id === notebookId);
    if (article) {
        handleOpenArticle(article);
    }
};

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />

      <main>
        {view === "home" ? (
          <>
            <AboutSection />
            <FeaturedSystemsSection onOpenNotebook={handleOpenNotebookById} />
            <ProjectsSection onSelectProject={setSelectedProject} />
            <ExperienceSection />
            <ArchitectureSection onSelectDiagram={setSelectedDiagram} />
            <NotebookSection onSelectArticle={handleOpenArticle} />
            <AcademicsSection />
            <ContactSection />
          </>
        ) : (
          selectedArticle && (
            <ArticlePage article={selectedArticle} onBack={handleBackHome} />
          )
        )}
      </main>

       <Footer />


      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <DiagramLightbox
        diagram={selectedDiagram}
        onClose={() => setSelectedDiagram(null)}
      />
    </div>
  );
}
