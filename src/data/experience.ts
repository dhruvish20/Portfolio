// src/data/experience.ts

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  timeframe: string;
  bullets: string[];
  tags: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    id: "neuvo",
    role: "Software Developer",
    company: "Neuvo Daksha Technologies",
    location: "Remote",
    timeframe: "2023 – 2024",
    bullets: [
      "Designed and shipped backend services for data-heavy workflows in a fully remote team.",
      "Improved reliability of core jobs by adding monitoring, alerts, and better failure handling.",
      "Optimized API endpoints and database queries to cut p95 latency on key paths.",
    ],
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
  },
  {
    id: "tatvasoft",
    role: "Software Developer Intern",
    company: "Tatvasoft",
    location: "Remote",
    timeframe: "2022 – 2023",
    bullets: [
      "Implemented backend and frontend features under guidance of senior engineers.",
      "Refactored queries and endpoints to reduce slow responses in legacy modules.",
      "Participated in code reviews and learned team-wide patterns and best practices.",
    ],
    tags: ["C#", ".NET", "SQL Server", "React"],
  },
];
