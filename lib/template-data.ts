import type { Template } from "@/types/template";

export const CURATED_TEMPLATES: Template[] = [
  {
    id: "nextjs-subscription-payments",
    slug: "nextjs-subscription-payments",
    name: "Next.js Subscription Payments",
    summary: "Production SaaS starter with auth, billing, and account management.",
    description:
      "Vercel's subscription starter combines Next.js App Router, Supabase auth, and Stripe billing in a battle-tested foundation for SaaS products.",
    category: "Full-Stack",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    difficulty: "Intermediate",
    setupTime: "20-30 minutes",
    repoUrl: "https://github.com/vercel/nextjs-subscription-payments",
    demoUrl: "https://nextjs-subscription-payments.vercel.app",
    stars: 6900,
    license: "MIT",
    lastUpdated: "2026-03-12",
    tags: ["saas", "subscriptions", "auth", "payments"],
    previewImages: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Auth and user profile flows included",
      "Handles recurring plans and webhooks",
      "Comes with account, billing, and dashboard scaffolding"
    ],
    featured: true
  },
  {
    id: "create-t3-turbo",
    slug: "create-t3-turbo",
    name: "create-t3-turbo",
    summary: "Monorepo starter for full-stack TypeScript apps across web and native.",
    description:
      "A modern Turborepo setup with Next.js, Expo, tRPC, and shared packages. Ideal for teams shipping web + mobile with a single TypeScript stack.",
    category: "Full-Stack",
    stack: ["Next.js", "Expo", "Turborepo", "tRPC", "TypeScript"],
    difficulty: "Advanced",
    setupTime: "35-45 minutes",
    repoUrl: "https://github.com/t3-oss/create-t3-turbo",
    stars: 11000,
    license: "MIT",
    lastUpdated: "2026-02-27",
    tags: ["monorepo", "mobile", "trpc", "fullstack"],
    previewImages: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Shared API and UI packages",
      "Ready for web and native builds",
      "Type-safe API layer end-to-end"
    ],
    featured: true
  },
  {
    id: "bulletproof-react",
    slug: "bulletproof-react",
    name: "Bulletproof React",
    summary: "Opinionated React architecture with scalable folder structure and patterns.",
    description:
      "A practical frontend template focused on long-term maintainability, with conventions for state, testing, and feature-based modules.",
    category: "Frontend",
    stack: ["React", "TypeScript", "Vite", "React Query"],
    difficulty: "Intermediate",
    setupTime: "15-25 minutes",
    repoUrl: "https://github.com/alan2207/bulletproof-react",
    stars: 31000,
    license: "MIT",
    lastUpdated: "2026-01-19",
    tags: ["react", "architecture", "frontend", "scalable"],
    previewImages: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Feature-sliced architecture",
      "Linting and test patterns pre-wired",
      "Designed for team collaboration"
    ],
    featured: true
  },
  {
    id: "fastapi-full-stack-template",
    slug: "fastapi-full-stack-template",
    name: "FastAPI Full Stack",
    summary: "Backend-first template with FastAPI, PostgreSQL, and modern frontend integration.",
    description:
      "An API-first starter that includes authentication, Docker setup, database migrations, and frontend coupling for full-stack Python teams.",
    category: "Backend",
    stack: ["FastAPI", "PostgreSQL", "Docker", "Alembic", "React"],
    difficulty: "Intermediate",
    setupTime: "25-40 minutes",
    repoUrl: "https://github.com/fastapi/full-stack-fastapi-template",
    stars: 34000,
    license: "MIT",
    lastUpdated: "2026-02-11",
    tags: ["python", "api", "docker", "postgres"],
    previewImages: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Auth, roles, and user management included",
      "Dockerized local and production setup",
      "Predictable project structure for Python teams"
    ]
  },
  {
    id: "cookiecutter-django",
    slug: "cookiecutter-django",
    name: "Cookiecutter Django",
    summary: "Mature Django starter with secure defaults and deployment options.",
    description:
      "A long-running template used by production Django teams with support for PostgreSQL, Redis, Celery, and hardened settings.",
    category: "Backend",
    stack: ["Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    difficulty: "Advanced",
    setupTime: "40-60 minutes",
    repoUrl: "https://github.com/cookiecutter/cookiecutter-django",
    stars: 24000,
    license: "BSD-3-Clause",
    lastUpdated: "2026-03-02",
    tags: ["django", "backend", "worker", "secure-defaults"],
    previewImages: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Environment-aware settings",
      "Background task support",
      "Detailed documentation and setup scripts"
    ]
  },
  {
    id: "nestjs-typescript-starter",
    slug: "nestjs-typescript-starter",
    name: "NestJS TypeScript Starter",
    summary: "Structured Node backend starter with modules, testing, and CI defaults.",
    description:
      "NestJS official TypeScript starter tuned for service-style APIs with clean architecture and extensible modules.",
    category: "Backend",
    stack: ["NestJS", "TypeScript", "Jest", "Node.js"],
    difficulty: "Beginner",
    setupTime: "10-20 minutes",
    repoUrl: "https://github.com/nestjs/typescript-starter",
    stars: 6600,
    license: "MIT",
    lastUpdated: "2025-12-18",
    tags: ["nestjs", "api", "node", "testing"],
    previewImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Modular architecture by default",
      "Unit and e2e test setup",
      "Easy path to microservices"
    ]
  },
  {
    id: "remix-indie-stack",
    slug: "remix-indie-stack",
    name: "Remix Indie Stack",
    summary: "Full-stack Remix starter with auth, deployment, and robust defaults.",
    description:
      "A lean template from the Remix team including auth, sessions, data storage, and conventions for rapidly shipping production apps.",
    category: "Full-Stack",
    stack: ["Remix", "TypeScript", "Fly.io", "SQLite", "Tailwind CSS"],
    difficulty: "Intermediate",
    setupTime: "20-30 minutes",
    repoUrl: "https://github.com/remix-run/indie-stack",
    stars: 2200,
    license: "MIT",
    lastUpdated: "2026-01-31",
    tags: ["remix", "fullstack", "sessions", "deployment"],
    previewImages: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Session auth already wired",
      "Deployment-oriented configuration",
      "Minimal but production-focused baseline"
    ]
  },
  {
    id: "expo-router-starter",
    slug: "expo-router-starter",
    name: "Expo Router Starter",
    summary: "React Native starter with file-based routing and modern DX.",
    description:
      "Starter template for mobile-first products using Expo Router, TypeScript, and fast iterative development.",
    category: "Mobile",
    stack: ["Expo", "React Native", "TypeScript", "Expo Router"],
    difficulty: "Beginner",
    setupTime: "15-20 minutes",
    repoUrl: "https://github.com/expo/router/tree/main/examples",
    stars: 4900,
    license: "MIT",
    lastUpdated: "2025-11-08",
    tags: ["mobile", "expo", "react-native", "routing"],
    previewImages: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "File-based routing for native apps",
      "Fast simulator setup",
      "Built-in OTA and release workflows"
    ]
  },
  {
    id: "dbt-project-template",
    slug: "dbt-project-template",
    name: "dbt Project Template",
    summary: "Analytics engineering starter for warehouse modeling and testing.",
    description:
      "A practical dbt skeleton with source definitions, staging models, CI checks, and conventions for fast analytics project onboarding.",
    category: "Data",
    stack: ["dbt", "SQL", "GitHub Actions", "Snowflake"],
    difficulty: "Intermediate",
    setupTime: "20-35 minutes",
    repoUrl: "https://github.com/dbt-labs/jaffle-shop",
    stars: 7600,
    license: "Apache-2.0",
    lastUpdated: "2025-10-25",
    tags: ["analytics", "warehouse", "sql", "testing"],
    previewImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
    ],
    highlights: [
      "Model and test conventions included",
      "Excellent for analytics onboarding",
      "Clear CI integration patterns"
    ]
  }
];
