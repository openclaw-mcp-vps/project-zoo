"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { SearchFilters } from "@/components/SearchFilters";
import { TemplateCard } from "@/components/TemplateCard";
import { useTemplateFilterStore } from "@/lib/template-store";
import { Template } from "@/types/template";

type TemplatesResponse = {
  templates: Template[];
  categories: string[];
  technologies: string[];
  hasAccess: boolean;
};

type CloneResponse = {
  cloneCommand: string;
  error?: string;
};

export function BrowseClient() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [technologies, setTechnologies] = useState<string[]>(["All"]);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const { query, category, technology, pricing } = useTemplateFilterStore();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (category !== "All") params.set("category", category);
    if (technology !== "All") params.set("technology", technology);
    if (pricing !== "all") params.set("pricing", pricing);

    return params.toString();
  }, [query, category, technology, pricing]);

  useEffect(() => {
    let isActive = true;

    async function fetchTemplates() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/templates?${queryParams}`, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Unable to load templates.");
        }

        const result = (await response.json()) as TemplatesResponse;

        if (!isActive) {
          return;
        }

        setTemplates(result.templates);
        setCategories(result.categories);
        setTechnologies(result.technologies);
        setHasAccess(result.hasAccess);
      } catch (reason) {
        if (!isActive) {
          return;
        }

        setError(
          reason instanceof Error
            ? reason.message
            : "Unable to load templates right now."
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void fetchTemplates();

    return () => {
      isActive = false;
    };
  }, [queryParams]);

  async function handleClone(slug: string) {
    try {
      const response = await fetch("/api/clone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug })
      });

      const result = (await response.json()) as CloneResponse;

      if (response.status === 402) {
        toast.error("Premium access is required to clone this template.");
        router.push("/#pricing");
        return;
      }

      if (!response.ok || !result.cloneCommand) {
        throw new Error(result.error ?? "Unable to generate clone command.");
      }

      await navigator.clipboard.writeText(result.cloneCommand);
      toast.success("Clone command copied to clipboard.");
    } catch (reason) {
      toast.error(
        reason instanceof Error
          ? reason.message
          : "Unable to clone this template right now."
      );
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Template Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Find a starter that matches your stack, copy the clone command, and ship
          features instead of rebuilding boilerplate.
        </p>
      </section>

      <SearchFilters categories={categories} technologies={technologies} />

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : templates.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-300">
          No templates match these filters. Try a broader stack or category.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => {
            const isLocked = template.pricing === "premium" && !hasAccess;

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                <TemplateCard
                  template={template}
                  isLocked={isLocked}
                  onClone={handleClone}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
