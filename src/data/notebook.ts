// src/data/notebook.ts

export interface NotebookMetric {
  label: string;
  value: string;
}

export interface NotebookPost {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  metrics?: NotebookMetric[];
  codeSnippet?: string;
  architectureNote?: string;
  results?: string;
}

export const notebookPosts: NotebookPost[] = [
  {
  id: "redis-misses",
  title: "How I Cut Redis Misses by 90%",
  subtitle: "From noisy caching to a predictable performance layer",
  description:
    "What started as a flaky cache layer turned into a stable performance multiplier after revisiting cache key design, TTLs, and observability. This is how I made Redis reliable instead of ‘best effort’.",
  tags: ["Redis", "Caching", "Performance", "Observability"],
  metrics: [
    { label: "Miss rate", value: "-90%" },
    { label: "p95 latency", value: "-35%" },
  ],
  architectureNote:
    "Used a single-flight pattern at the app layer to prevent thundering herds and a repository wrapper that logs hit/miss metrics per key. Cache keys standardized (`entity:type:id`) and eviction monitored via Redis INFO and custom metrics.",
  codeSnippet: `@router.get("/user/{user_id}")
async def get_user(user_id: str, repo: UserRepo = Depends()):
    cache_key = f"user:{user_id}"
    cached = await repo.cache_get(cache_key)
    if cached:
        return cached

    # single-flight prevents parallel DB hits
    user = await repo.fetch_user(user_id)
    await repo.cache_set(cache_key, user, ttl=300)
    return user`,
  results: `
### 🧩 The Real Problem: The Cache Wasn't Caching

At first, Redis was acting like a black box — hit rate looked decent overall, but latency graphs told a different story.  
In production traces, 60–70% of requests still went to the database, even for objects that *should* have been cached.  
This wasn’t a Redis problem — it was a key-design and observability problem.

---

### ⚙️ What Was Really Happening

1. **Inconsistent key naming** — same user data cached under slightly different keys across endpoints.  
   \`user:123\` vs. \`users:123\` vs. \`UserRepo:123\` → all treated as separate entries.

2. **No single-flight control** — when multiple requests for the same user arrived simultaneously,  
   all of them missed the cache and hit the DB before the first one wrote back.

3. **TTL churn** — short TTLs caused bursts of synchronized misses (“cache stampedes”),  
   especially under bursty load.

4. **No observability per key** — we could see global hit rate, but not *which* keys were noisy.

---

### 🧠 The Fix: Make Redis Deterministic

I rebuilt the caching layer around three ideas:

- **Canonical keys** — every entity uses a fixed prefix convention like \`{namespace}:{type}:{id}\`.  
  That alone cut 50% of the inconsistencies.

- **Single-flight pattern** — if one request is already populating the cache for a given key,  
  others wait instead of hammering the DB.

- **Per-key metrics** — every cache call logs a hit/miss tagged by key prefix, TTL, and reason.  
  Now we can see which patterns degrade first under load.

- **Smart TTLs** — frequent reads get longer TTLs, rare objects stay short.  
  Eviction policy tuned with \`volatile-lru\` to prioritize freshness.

---

### 🔍 Observability That Actually Helped

We added lightweight Prometheus counters:
- \`cache_hit_total{key_prefix="user"}\`
- \`cache_miss_total{key_prefix="user"}\`
- \`cache_miss_reason="expired" | "not_found" | "race"\`

Those three labels gave full visibility.  
When hit ratio dipped, we could instantly see *why*.

---

### ⚡ Results

- **Miss rate down 90%**, with DB queries dropping proportionally.  
- **p95 latency improved by ~35%**, since most reads now resolve in microseconds.  
- Redis eviction churn stabilized — no more “cache storms” on TTL boundaries.

The difference wasn’t infrastructure — it was **discipline in cache design**.

---

### 📈 Resume Summary

Re-engineered Redis caching for a data service: standardized key naming, added single-flight request guards, and instrumented per-key hit/miss metrics.  
Reduced cache misses by 90% and p95 latency by 35%, turning Redis into a consistent performance layer instead of a best-effort one.
  `,
}, 

  {
  id: "scaling-ws",
  title: "Simulating 600-User WebSocket Scale",
  subtitle: "Session-aware rooms, Redis presence, and controlled backpressure",
  description:
    "Built a simulated multiplayer environment to stress-test WebSocket concurrency. Focused on realistic bottlenecks—message routing, broadcast scope, and connection stability under load.",
  tags: ["WebSocket", "Scaling", "Node.js", "Redis"],
  metrics: [
    { label: "Simulated users", value: "600+" },
    { label: "Messages/sec", value: "~40" },
  ],
  architectureNote:
    "Each simulated client connects with a session (userId + lobbyId). Presence and lobby membership stored in Redis. The server publishes to per-lobby channels and emits only to sockets in that room, using backpressure guards and a rolling-restart mode for reliability.",
  codeSnippet: `wss.on("connection", (socket) => {
  const session = decodeSession(socket);
  joinLobby(session, socket);

  socket.on("message", (msg) => {
    const parsed = JSON.parse(msg.toString());
    handleEvent(session, parsed);
  });
});`,
  results: `
### 🧩 What I Set Out to Test

I wanted to see how far a simple Node.js WebSocket server could go before hitting its natural limits.  
So I simulated 600 connected clients, each sending about 40 messages per second across different "lobbies" (rooms).

---

### ⚙️ Key Design Choices

- **Session-Scoped Rooms** — Every connection carries a \`lobbyId\`; messages are emitted only within that room.  
  This cut global broadcast cost from O(n) to O(k) per lobby.
- **Redis Presence + Pub/Sub** — Tracks which users belong to which lobby and lets multiple WS nodes stay in sync.  
  Redis channels fan out events only to the right room.
- **Per-Socket Backpressure Check** — Before sending, we check \`socket.bufferedAmount\`.  
  Slow clients are paused or dropped before they block the loop.
- **Delta Updates** — Instead of full state dumps, clients receive only incremental updates.  
  Reduced JSON serialization overhead significantly.
- **Rolling Restart Mode** — During deploys, mark a node as draining and let connections fade out gradually.  
  Prevented reconnection storms during simulation resets.

---

### 🧠 What I Learned

Simulated load is brutal in the best way: it forces you to think in **message scope**, **throughput**, and **fairness** instead of raw “it works” logic.  
Real scaling is less about adding threads, more about **not sending what you don’t need** and **not blocking the loop for slow clients**.

---

### 📈 Resume Summary

Simulated and optimized a 600-user WebSocket environment with 40+ msgs/sec throughput.  
Implemented Redis-based room routing, per-connection backpressure handling, and delta updates to stabilize performance under heavy concurrency.
  `,
}, 

{
  id: "why-langgraph",
  title: "Structuring Multi-Tool Agents with LangGraph",
  subtitle: "Shared context, typed parsers, and predictable reasoning",
  description:
    "Refined DataSense AI’s agent flow using LangGraph to replace fragile prompt chains with a typed, stateful DAG. Focused on context safety, input/output schemas, and modular orchestration.",
  tags: ["LangGraph", "Agents", "FastAPI", "DuckDB", "Redis", "S3"],
  metrics: [
    { label: "Graph nodes", value: "5+" },
    { label: "Context reuse", value: "Shared state" },
    { label: "I/O validation", value: "100%" },
  ],
  architectureNote:
    "Each node (query, plot, summarize) reads/writes through a shared AgentState. Typed Pydantic models validate every node boundary to keep data flow consistent and cacheable.",
  codeSnippet: `class TrendPlotNode(ToolNode):
    def run(self, state):
        df = state["data"]
        x, y = state["inputs"]["x"], state["inputs"]["y"]
        fig = plot_trend(df, x, y)
        url = upload_to_s3(fig)
        return {"trend_plot_url": url}`,
  results: `
### 🧩 The Problem

Chaining prompts across multiple tools quickly led to silent type mismatches and state drift.  
Each tool expected a different format—SQL queries, DataFrames, or text—and context became unreliable.

---

### ⚙️ Design

- **LangGraph DAG** — Nodes represent tools; edges define reasoning flow.  
- **Shared AgentState** — Stores user input, in-memory data, and intermediate results.  
- **Typed Parsers** — Pydantic models validate inputs/outputs, replacing ad-hoc JSON blobs.  
- **Single Responsibility** — Each node performs one task and returns a structured result.  
- **Caching by Input Model** — Reuses outputs via Redis using hashed input schemas.

---

### 🧠 Outcome

The agent now executes 5+ tools with deterministic context and no schema drift.  
Adding a new tool means defining its input/output models and connecting it in the graph—no prompt rewiring.

---

### 📈 Summary

Built a multi-node LangGraph pipeline for DataSense AI with shared state and typed interfaces.  
Eliminated brittle prompt chaining, improved reliability, and enabled reusable, cache-friendly reasoning flows.
  `,
}
];