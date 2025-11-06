// src/data/academics.ts

export interface AcademicItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  timeframe: string;
  gpa?: string;
  details: string;
  keyCourses?: string[];
}

export const academics: AcademicItem[] = [
  {
    id: "stevens",
    institution: "Stevens Institute of Technology",
    degree: "M.S. in Computer Science",
    location: "Hoboken, NJ",
    timeframe: "Expected 2026",
    gpa: "GPA: 3.8/4.0",
    details:
      "Graduate focus on distributed systems, data-intensive computing, and backend engineering.",
    keyCourses: [
      "Distributed Systems",
      "Advanced Algorithms",
      "Database Systems",
      "Cloud Computing",
    ],
  },
  {
    id: "ad-patel",
    institution: "A.D. Patel Institute of Technology",
    degree: "B.E. in Information Technology",
    location: "Gujarat, India",
    timeframe: "2020 – 2024",
    gpa: "GPA: 8.6/10",
    details:
      "Undergraduate work across core CS fundamentals, networks, and software engineering.",
    keyCourses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
    ],
  },
];
