// src/data/diagrams.ts

export interface Diagram {
  id: string;
  label: string;
  description: string;
  imageSrc: string;
}

export const diagrams: Diagram[] = [
  {
    id: "s3-multi-tenant",
    label: "DataSense Multi-tenant S3",
    description: "S3 layout for user_id/upload_id with DuckDB + LangGraph tools on top.",
    imageSrc: "/diagrams/datasense-wbg.svg",
  },
  {
    id: "redis-celery",
    label: "Redis + Celery Pipeline",
    description: "Task queue for CSV processing, fan-out jobs, and result caching.",
    imageSrc: "/diagrams/market_data_microservice.svg",
  },
  {
    id: "ws-lobby",
    label: "WebSocket Lobby Topology",
    description: "Session-based rooms with Redis presence and horizontal scaling.",
    imageSrc: "/diagrams/lobby_base.svg",
  },
];
