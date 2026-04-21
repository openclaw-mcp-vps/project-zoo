import { Template } from "@/types/template";

export const TEMPLATE_CATALOG: Template[] = [
  {
    id: "tpl_01",
    slug: "next15-saas-auth-kit",
    name: "Next 15 SaaS Auth Kit",
    tagline: "Multi-tenant SaaS starter with auth, billing hooks, and team roles.",
    description:
      "A production-ready SaaS starter for Next.js 15 that includes organization-aware routing, Supabase auth, role-based permissions, and billing event adapters.",
    category: "SaaS",
    pricing: "premium",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    features: [
      "Email and OAuth sign in",
      "Organization switcher",
      "Role-based route guards",
      "Billing event listener skeleton",
      "Audit log table schema"
    ],
    repositoryUrl: "https://github.com/makerkit/next-supabase-saas-starter",
    previewUrl: "https://next.new",
    stars: 1840,
    updatedAt: "2026-03-17",
    setupTimeMinutes: 20,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_02",
    slug: "t3-turbo-monorepo",
    name: "T3 Turbo Monorepo",
    tagline: "Type-safe monorepo starter with web, native, and API packages.",
    description:
      "A pnpm workspace with Next.js, Expo, and shared packages. Great for teams building one backend with multiple clients.",
    category: "Fullstack",
    pricing: "free",
    technologies: ["Next.js", "React Native", "tRPC", "TurboRepo"],
    features: [
      "Shared API contracts",
      "End-to-end type safety",
      "Reusable UI package",
      "Monorepo CI defaults"
    ],
    repositoryUrl: "https://github.com/t3-oss/create-t3-turbo",
    previewUrl: "https://create.t3.gg/en/turbo",
    stars: 13100,
    updatedAt: "2026-02-06",
    setupTimeMinutes: 25,
    difficulty: "Advanced"
  },
  {
    id: "tpl_03",
    slug: "next-commerce-storefront",
    name: "Next Commerce Storefront",
    tagline: "Headless ecommerce starter with optimized product and checkout flows.",
    description:
      "A storefront template tuned for conversion: product filters, dynamic cart, and deployment-friendly data fetching.",
    category: "Ecommerce",
    pricing: "premium",
    technologies: ["Next.js", "React", "Vercel", "Tailwind"],
    features: [
      "Faceted category filters",
      "Fast product detail pages",
      "Cart persistence",
      "Checkout handoff"
    ],
    repositoryUrl: "https://github.com/vercel/commerce",
    previewUrl: "https://vercel.com/templates/next.js/nextjs-commerce",
    stars: 12500,
    updatedAt: "2026-01-21",
    setupTimeMinutes: 18,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_04",
    slug: "ai-chatbot-rag",
    name: "AI Chatbot RAG Starter",
    tagline: "Ship an AI support assistant with retrieval and source citations.",
    description:
      "A practical RAG starter with document ingestion, chunking, embeddings, and chat UI patterns for product teams.",
    category: "AI",
    pricing: "premium",
    technologies: ["Next.js", "TypeScript", "Postgres", "OpenAI"],
    features: [
      "Ingestion pipeline",
      "Semantic search",
      "Conversation memory",
      "Citation rendering"
    ],
    repositoryUrl: "https://github.com/vercel/ai-chatbot",
    previewUrl: "https://vercel.com/templates/next.js/nextjs-ai-chatbot",
    stars: 9800,
    updatedAt: "2026-03-03",
    setupTimeMinutes: 30,
    difficulty: "Advanced"
  },
  {
    id: "tpl_05",
    slug: "rails-hotwire-saas",
    name: "Rails Hotwire SaaS",
    tagline: "Opinionated Rails SaaS base with accounts, invites, and billing.",
    description:
      "A Ruby on Rails starter focused on shipping quickly, with account scopes, subscription states, and email workflows.",
    category: "SaaS",
    pricing: "free",
    technologies: ["Rails", "Hotwire", "Postgres", "Redis"],
    features: [
      "Team invitations",
      "Account-scoped data",
      "Subscription lifecycle hooks",
      "Background job setup"
    ],
    repositoryUrl: "https://github.com/jumpstart-pro/jumpstart",
    previewUrl: "https://jumpstartrails.com",
    stars: 4200,
    updatedAt: "2026-02-11",
    setupTimeMinutes: 35,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_06",
    slug: "laravel-inertia-dashboard",
    name: "Laravel Inertia Dashboard",
    tagline: "Admin-grade CRUD foundation with auth, policies, and metrics.",
    description:
      "A backend-focused starter for dashboards and internal tools, using Laravel policies and Inertia views.",
    category: "DevTools",
    pricing: "free",
    technologies: ["Laravel", "Inertia", "Vue", "MySQL"],
    features: [
      "Policy-based access control",
      "CRUD scaffolding",
      "Queue-backed notifications",
      "Usage metrics widgets"
    ],
    repositoryUrl: "https://github.com/laravel/breeze",
    previewUrl: "https://laravel.com/starter-kits",
    stars: 2600,
    updatedAt: "2026-01-30",
    setupTimeMinutes: 22,
    difficulty: "Beginner"
  },
  {
    id: "tpl_07",
    slug: "expo-mobile-marketplace",
    name: "Expo Mobile Marketplace",
    tagline: "React Native starter for catalog, cart, and mobile checkout flows.",
    description:
      "A mobile-first template for teams launching marketplace apps with offline caching and transaction-ready navigation.",
    category: "Mobile",
    pricing: "premium",
    technologies: ["Expo", "React Native", "TypeScript", "Supabase"],
    features: [
      "Offline catalog cache",
      "Secure auth session",
      "Native navigation patterns",
      "Push notification hooks"
    ],
    repositoryUrl: "https://github.com/expo/examples/tree/master/with-router",
    previewUrl: "https://docs.expo.dev/router/introduction/",
    stars: 3100,
    updatedAt: "2026-03-22",
    setupTimeMinutes: 26,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_08",
    slug: "django-api-react-admin",
    name: "Django API + React Admin",
    tagline: "Backend-heavy stack for secure APIs with a modern admin client.",
    description:
      "A practical split-stack starter pairing Django REST APIs with a React admin frontend and JWT auth.",
    category: "Fullstack",
    pricing: "free",
    technologies: ["Django", "React", "Postgres", "Redis"],
    features: [
      "JWT auth flow",
      "Pagination and filtering",
      "Role-scoped endpoints",
      "Admin analytics views"
    ],
    repositoryUrl: "https://github.com/encode/django-rest-framework",
    previewUrl: "https://www.django-rest-framework.org/",
    stars: 29000,
    updatedAt: "2025-12-19",
    setupTimeMinutes: 28,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_09",
    slug: "sveltekit-edge-saas",
    name: "SvelteKit Edge SaaS",
    tagline: "Minimal, fast SaaS starter optimized for edge deployments.",
    description:
      "A lightweight foundation for subscription products that need fast SSR and a small runtime footprint.",
    category: "SaaS",
    pricing: "premium",
    technologies: ["SvelteKit", "TypeScript", "Postgres", "Tailwind"],
    features: [
      "Edge-ready rendering",
      "Auth gate middleware",
      "Subscription status checks",
      "Background worker hooks"
    ],
    repositoryUrl: "https://github.com/sveltejs/kit/tree/master/packages/create-svelte",
    previewUrl: "https://kit.svelte.dev/docs",
    stars: 1900,
    updatedAt: "2026-02-28",
    setupTimeMinutes: 16,
    difficulty: "Intermediate"
  },
  {
    id: "tpl_10",
    slug: "nuxt-content-blog-starter",
    name: "Nuxt Content Publishing Starter",
    tagline: "SEO-first publishing template with editorial workflows.",
    description:
      "Ideal for content teams shipping docs and blogs with markdown, dynamic routes, and search indexing.",
    category: "DevTools",
    pricing: "free",
    technologies: ["Nuxt", "Vue", "TypeScript", "Content"],
    features: [
      "Markdown content pipeline",
      "Taxonomy and tags",
      "RSS and sitemap",
      "Search index generation"
    ],
    repositoryUrl: "https://github.com/nuxt/content",
    previewUrl: "https://content.nuxt.com",
    stars: 5400,
    updatedAt: "2026-01-10",
    setupTimeMinutes: 14,
    difficulty: "Beginner"
  }
];
