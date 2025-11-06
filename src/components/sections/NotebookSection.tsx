import React from "react";
import "../../styles/notebook.css";
import { notebookPosts, type NotebookPost } from "../../data/notebook";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionTitle } from "../ui/SectionTitle";
import { ArrowUpRight } from "lucide-react";

interface NotebookSectionProps {
  onSelectArticle: (post: NotebookPost) => void;
}

export function NotebookSection({ onSelectArticle }: NotebookSectionProps) {
  return (
    <section id="notebook" className="notebook-section">
      <div className="notebook-inner">
        <SectionTitle label="Engineering Notebook" />

        <div className="notebook-grid">
          {notebookPosts.map((post) => (
            <Card
              key={post.id}
              className="notebook-card"
              onClick={() => onSelectArticle(post)}
            >
              <span className="notebook-overlay-icon">
                <ArrowUpRight size={14} />
              </span>

              <div>
                <h3 className="notebook-title">{post.title}</h3>
                <p className="notebook-description">{post.description}</p>

                <div className="notebook-tags">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>

              <div className="notebook-footer">
                Click to open full notes →
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
