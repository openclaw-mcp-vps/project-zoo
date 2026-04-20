"use client";

import { Search, X } from "lucide-react";
import { useTemplateFilters } from "@/lib/template-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TemplateDifficulty, TemplateLicense } from "@/types/template";

interface SearchFiltersProps {
  availableStacks: string[];
  availableLicenses: TemplateLicense[];
}

const difficultyOptions: Array<"all" | TemplateDifficulty> = ["all", "Beginner", "Intermediate", "Advanced"];

export function SearchFilters({ availableStacks, availableLicenses }: SearchFiltersProps) {
  const { search, stack, difficulty, license, setSearch, setStack, setDifficulty, setLicense, resetFilters } =
    useTemplateFilters();

  return (
    <div className="surface-card rounded-xl p-4 md:p-5">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by stack, use case, feature, or workflow"
            className="pl-9"
          />
        </div>

        <select
          value={stack}
          onChange={(event) => setStack(event.target.value)}
          className="h-10 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm"
          aria-label="Filter by stack"
        >
          <option value="all">All stacks</option>
          {availableStacks.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as "all" | TemplateDifficulty)}
            className="h-10 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm"
            aria-label="Filter by difficulty"
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Any level" : option}
              </option>
            ))}
          </select>

          <select
            value={license}
            onChange={(event) => setLicense(event.target.value as "all" | TemplateLicense)}
            className="h-10 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm"
            aria-label="Filter by license"
          >
            <option value="all">Any license</option>
            {availableLicenses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-[var(--muted)]">
          Filter templates by stack fit, complexity, and legal constraints before cloning.
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
