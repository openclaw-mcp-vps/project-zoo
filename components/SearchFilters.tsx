"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useTemplateFilterStore } from "@/lib/template-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type SearchFiltersProps = {
  categories: string[];
  technologies: string[];
};

export function SearchFilters({ categories, technologies }: SearchFiltersProps) {
  const {
    query,
    category,
    technology,
    pricing,
    setQuery,
    setCategory,
    setTechnology,
    setPricing,
    reset
  } = useTemplateFilterStore();

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5">
      <div className="grid gap-3 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9"
            placeholder="Search by stack, feature, or use case"
          />
        </div>

        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          value={technology}
          onChange={(event) => setTechnology(event.target.value)}
          aria-label="Filter by technology"
        >
          {technologies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-700 p-1">
          {[
            { label: "All", value: "all" },
            { label: "Free", value: "free" },
            { label: "Premium", value: "premium" }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPricing(item.value as "all" | "free" | "premium")}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                pricing === item.value
                  ? "bg-teal-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={reset}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </section>
  );
}
