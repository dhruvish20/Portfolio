import React from "react";
import "../../styles/header.css";

interface NavItem {
  label: string;
  href: string; // e.g. "#projects"
}

const NAV_ITEMS: NavItem[] = [
    {label: "Featured Systems", href: "#featured-section"},
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Architecture", href: "#architecture" },
    { label: "Notebook", href: "#notebook" },
    { label: "Academics", href: "#academics" },
    { label: "Contact", href: "#contact" },
];

export function Header() {
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Keep normal behavior for middle-click / new-tab etc.
    if (
      event.button !== 0 || // not left click
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-brand">Dhruvish Parekh</div>

        <nav className="site-header-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-header-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
