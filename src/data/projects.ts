// src/data/projects.ts

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type?: "demo" | "repo" | "doc";
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  conceptNote?: string;
}

export const projects: Project[] = [
  {
  id: "dht-broadcast",
  title: "Distributed Hash Table over gRPC (Chord)",
  subtitle: "Event-based broadcasting over a consistent-hash overlay",
  tagline: "Chord-based Java DHT tested across multiple AWS EC2 nodes.",
  description:
    "Implemented a minimal distributed hash table using the Chord protocol over gRPC in Java. Each node runs as a gRPC service on a Chord ring, maintains successor/predecessor pointers, and replicates keys to multiple successors. Deployed nodes across AWS EC2 instances to exercise real network joins/leaves, key redistribution, and event-based broadcasting over the overlay.",
  features: [
    "Chord-style consistent hashing ring with finger tables for O(log N) lookups",
    "gRPC APIs for lookup, insert, and stabilization between DHT nodes",
    "Key replication across successors for soft-fail recovery when nodes leave or crash",
  ],
  tags: [
    "Distributed Systems",
    "Chord Protocol",
    "gRPC",
    "Java",
    "AWS EC2",
  ],
  metrics: [
    { label: "Nodes simulated", value: "32" },
    { label: "Replication factor", value: "3" },
  ],
  conceptNote: 
    "A Distributed Hash Table (DHT) is like a phonebook that’s spread across many computers instead of sitting in one place. Each node owns a range of keys in a logical ring, and Chord’s main trick is using **consistent hashing** to decide who stores what — so when a node joins or leaves, only a small portion of keys need to move. \n\nEach node keeps a **finger table**, which is basically a shortcut map to other nodes at exponentially increasing distances. That’s what lets any node find the owner of a key in only O(log N) hops instead of asking everyone. \n\nThe network is fully decentralized — no master node — so nodes talk to each other via gRPC for operations like `findSuccessor`, `stabilize`, and `notify`. Replication ensures that even if a node fails, its neighbors still hold copies of its keys. On top of this routing layer, I added **event-based broadcasting**, so nodes can publish updates (like cache invalidations or membership changes) without flooding the entire network. \n\nWhen you put all this together, you get a self-healing, scalable, peer-to-peer system where data lookup, storage, and message propagation all happen cooperatively across a dynamic ring of nodes.",
  links: [{ label: "Repo", href: "#", type: "repo" }],
},


  // keep your other projects as they are:
  {
  id: "3d-body-measure",
  title: "3D Body Measurement Pipeline",
  subtitle: "From 2D photos to accurate 3D surface estimations",
  tagline: "Computer vision pipeline for generating 3D body metrics using OpenCV and geometry reasoning.",
  description:
    "Designed a computer vision pipeline that converts two standard 2D images (front and side) into a 3D body mesh using an open-source reconstruction tool. Implemented post-processing to segment the model into anatomical regions, measure circumferences, and estimate body metrics. The backend was built using FastAPI with asynchronous job handling and Redis caching for scalable processing.",
  features: [
    "3D mesh generation from dual 2D photos using open-source reconstruction model",
    "Normal-plane slicing to create cross-sections along body axes",
    "Area ratio and contour analysis for automatic region segmentation",
    "Circumference computation from 3D slices to estimate measurement metrics",
  ],
  tags: ["Computer Vision", "FastAPI", "OpenCV", "3D Reconstruction", "Redis"],
  metrics: [
    { label: "Avg job time", value: "4.2 s" },
    { label: "Re-run consistency", value: "±1.8%" },
  ],
  conceptNote:
    "To estimate human body measurements digitally, the system first turns 2D photos into a 3D mesh — imagine inflating two photos into a volumetric shape that preserves proportions. Once we have this mesh, we slice it with a series of **normal planes**, each acting like a digital CT scanner cut. By measuring the **cross-section area** and tracking how it changes between slices, we can detect where major body regions (waist, chest, thigh, etc.) begin and end.  \n\nFor each detected region, we project the 3D contour onto a plane and compute its **circumference** to approximate tape-measure readings. The area ratios between slices help normalize scale differences, while mesh smoothing ensures geometric continuity.  \n\nThis method combines geometric reasoning with computer vision — not just predicting keypoints, but actually **understanding body structure** in 3D space, making it useful for virtual fitting, posture analytics, or personalized sizing systems.",
  links: [{ label: "Repo", href: "#", type: "repo" }],
},

  {
  id: "bankruptcy-predictor",
  title: "Bankruptcy Prediction System",
  subtitle: "Financial distress detection using clustering and stacked ensembles",
  tagline: "Predicting company bankruptcy through hybrid unsupervised + supervised learning.",
  description:
    "Developed a hybrid machine learning pipeline that predicts corporate bankruptcy using financial statement data. The system combines unsupervised clustering for company segmentation with a stacked ensemble of classifiers (logistic regression, random forest, and gradient boosting) for final predictions. The approach improves both interpretability and generalization across company profiles.",
  features: [
    "Feature extraction from financial ratios (liquidity, leverage, profitability)",
    "K-Means and hierarchical clustering to group firms by financial behavior",
    "Stacked ensemble classifier with meta-learner on top of base models",
    "SMOTE and stratified sampling to handle severe class imbalance",
    "Model explainability through feature importance and SHAP analysis",
  ],
  tags: ["Machine Learning", "Finance", "Clustering", "Stacking", "Python"],
  metrics: [
    { label: "F1-score", value: "0.91" },
    { label: "AUC-ROC", value: "0.95" },
  ],
  conceptNote:
    "In bankruptcy prediction, the hardest part isn’t building a classifier — it’s recognizing that not all firms fail for the same reason. To capture these structural differences, the pipeline first uses **clustering** to group companies with similar financial signatures (e.g., liquidity-driven vs. leverage-driven). Within each cluster, we train models that learn how specific ratios behave as distress signals.  \n\nThe predictive core is a **stacked ensemble**, where logistic regression, random forest, and gradient boosting act as base learners, and a meta-model integrates their outputs for higher stability. This design reduces overfitting from any single model while still preserving interpretability through feature weights and SHAP values.  \n\nBy combining unsupervised segmentation with supervised stacking, the system moves beyond a one-size-fits-all model and provides **data-driven early warnings** for different financial archetypes of firms.",
  links: [{ label: "Repo", href: "#", type: "repo" }],
},
  {
  id: "photo-spot-finder",
  title: "Photograph Spot Finder & Competition Tracker",
  subtitle: "Real-time location-based photography challenges",
  tagline: "Discover photo-worthy spots and compete live through a WebSocket-powered leaderboard.",
  description:
    "Built a location-based web app where users discover, submit, and rate photography spots in real time. Designed a backend to manage competitions, track submissions, and broadcast live leaderboards using WebSockets. The system combines spatial search, event-driven updates, and persistent scoring to make photography competitions engaging and dynamic.",
  features: [
    "Interactive map for discovering photo spots using Leaflet + OpenStreetMap",
    "Spot submission with photo uploads and geotag validation",
    "Live leaderboard and scoring system powered by WebSocket events",
    "Competition room model for managing real-time events and participants",
    "Redis pub/sub for low-latency message propagation across connected clients",
  ],
  tags: ["WebSockets", "Node.js", "Redis", "React", "Geolocation"],
  metrics: [
    { label: "Simulated users", value: "500+" },
    { label: "Leaderboard latency", value: "<100 ms" },
  ],
  conceptNote:
    "The core idea was to merge **geolocation data** with **real-time competition mechanics**. Each user’s submission includes GPS metadata that’s validated and stored alongside their photo. Competitions run as **rooms** — isolated channels where participants receive updates instantly when someone uploads a new image or scores a point.  \n\nA **Redis pub/sub layer** ensures that leaderboard changes propagate to all connected clients within milliseconds, while the frontend uses WebSocket subscriptions to update the UI live without reloads.  \n\nArchitecturally, this project taught how to synchronize distributed state — multiple clients viewing and interacting with the same event feed — and how to balance load by emitting only relevant updates per room rather than global broadcasts.  \n\nThe result is a smooth, multiplayer-like web experience that blends event-driven programming, geospatial data, and real-time engagement.",
  links: [{ label: "Repo", href: "#", type: "repo" }],
},
];
