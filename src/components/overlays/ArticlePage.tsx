import React , { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "../../styles/articlePage.css";
import type { NotebookPost } from "../../data/notebook";
import { Tag } from "../ui/Tag";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticlePageProps {
  article: NotebookPost;
  onBack: () => void;
}

export function ArticlePage({ article, onBack }: ArticlePageProps) {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="article-page">
      <div className="article-inner">
        {/* Header */}
        <header className="article-header">
          <button
            type="button"
            onClick={onBack}
            className="article-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <span className="article-section-label">Engineering Notebook</span>
        </header>

        {/* Title / tags / metrics */}
        <div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-description">{article.description}</p>

          <div className="article-tags">
            {article.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {article.metrics && article.metrics.length > 0 && (
            <div className="article-metrics">
              {article.metrics.map((m) => (
                <div key={m.label} className="article-metric-card">
                  <div className="article-metric-label">{m.label}</div>
                  <div className="article-metric-value">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="article-body">
          {article.codeSnippet && (
            <pre className="article-code">
              <code>{article.codeSnippet}</code>
            </pre>
          )}

          {article.results && (
            <div className="article-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h3: (props) => (
                    <h3 className="article-heading" {...props} />
                  ),
                  p: (props) => (
                    <p className="article-paragraph" {...props} />
                  ),
                  table: (props) => (
                    <table className="article-table" {...props} />
                  ),
                  code: (props) => (
                    <code className="article-inline-code" {...props} />
                  ),
                }}
              >
                {article.results}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="article-footer-nav">
          <button
            type="button"
            onClick={onBack}
            className="article-link"
          >
            ← Back to home
          </button>
          <span className="text-neutral-400">{/* Next article later */}</span>
        </div>
      </div>
    </section>
  );
}
