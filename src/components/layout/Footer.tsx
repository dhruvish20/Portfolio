import React from "react";
import "../../styles/footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-left">
          <span>© {year}</span>
          <span>Dhruvish Parekh</span>
        </div>

        <div className="site-footer-right">
          <span>Built with React</span>
          <span className="site-footer-dot">•</span>
          <span>Minimal systems UI</span>
        </div>
      </div>
    </footer>
  );
}
