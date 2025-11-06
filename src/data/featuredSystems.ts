export interface FeaturedMetric {
  label: string;
  value: string;
}

export interface FeaturedLinks {
  demo?: string;
  repo?: string;
}


export interface FeaturedSystem {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  metrics?: FeaturedMetric[];
  relatedNotebookId?: string;
  relatedNotebookLabel?: string;
  links?: FeaturedLinks; 
}


export const featuredSystems: FeaturedSystem[] = [
  {
    id: "datasense",
    title: "DataSense AI",
    subtitle:
      "LangGraph agent that turns raw CSVs into plots, stats, and summaries.",
    bullets: [
      "• Handles 17,900+ CSV analysis requests in ~3 minutes on a single EC2 instance (p95 ≈ 22.8 ms).",
      "• 4 tools (trends, distributions, stats, summaries) orchestrated by a LangGraph agent against DuckDB.",
      "• Deep dive in notebook: “Why LangGraph for agents” – how the graph and tools are wired together.",
    ],
    tags: ["LangGraph", "FastAPI", "DuckDB", "Redis", "S3", "Celery"],
    metrics: [
      { label: "Requests", value: "17,900+" },
      { label: "p95 latency", value: "22.8 ms" },
    ],
    relatedNotebookId: "why-langgraph",
    relatedNotebookLabel: "Why LangGraph for agents",
    links: {
    //   demo: "https://datasense-ai.vercel.app/",
      repo: "https://github.com/dhruvish20/datasense-ai",
    },
  },
  {
    id: "market-data",
    title: "Market Data Service",
    subtitle: "Backend for polling, caching, and streaming market prices.",
    bullets: [
      "• 80% fewer direct Postgres reads by serving latest prices from a Redis cache layer.",
      "• 10,000+ Kafka events/day fan out raw ticks and aggregates to downstream consumers.",
      "• Deep dive in notebook: “How I cut Redis misses by 90%” – cache keys, hit rate, and observability.",
    ],
    tags: ["FastAPI", "Kafka", "Redis", "PostgreSQL"],
    metrics: [
      { label: "DB reads", value: "-80%" },
      { label: "Events/day", value: "10k+" },
    ],
    relatedNotebookId: "redis-misses",
    relatedNotebookLabel: "How I cut Redis misses by 90%",
    links: {
    //   demo: "https://marketdata.dhruvish.io/",
      repo: "https://github.com/dhruvish20/market-data-service",
    },
  },
  {
    id: "lobbybase",
    title: "LobbyBase",
    subtitle:
      "Real-time lobby template for multiplayer apps using WebSockets and Redis.",
    bullets: [
      "• Stable at 600+ concurrent users and ~40 messages/sec with 100% delivery in tests.",
      "• 70% payload reduction by emitting filtered events per room instead of global broadcasts.",
      "• Deep dive in notebook: “Scaling WebSockets to 600 users” – presence, backpressure, and room emits.",
    ],
    tags: ["Node", "WebSocket", "Redis", "React"],
    metrics: [
      { label: "Users", value: "600+" },
      { label: "Msgs/sec", value: "40" },
    ],
    relatedNotebookId: "scaling-ws",
    relatedNotebookLabel: "Scaling WebSockets to 600 users",
    links: {
      demo: "https://lobbybase.dhruvish.io/",
      repo: "https://github.com/dhruvish20/lobbybase",
    },
  },
];
